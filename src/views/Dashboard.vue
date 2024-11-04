<script setup lang="ts">
import StandardButton from "@/components/UI/StandardButton.vue";
import {ref} from "vue";
import {calculateAcceleration} from "@/scripts/calculateAcceleration";
import {postRoute} from "@/scripts/postRoute";
import {clearWatch, watchGpsData} from "@/scripts/getGpsData";
import {calculateSpeed} from "@/scripts/calculateSpeed";
import {postDataPoints} from "@/scripts/postDataPoints";
import {calculateLateralG} from "@/scripts/calculateLateralG";
import {calculateLean} from "@/scripts/calculateLean";

const route = ref<dataPoint[]>([]);
const isTracking = ref(false);
const watchId = ref<number | null>(null);

const startTracking = async () => {
  let user = JSON.parse(localStorage.getItem('user') || '{}');
  // get user from session storage if user is not in local storage
  if (user.id === undefined) {
    user = JSON.parse(sessionStorage.getItem('user') || '{}');
  }
  console.log("Userid = : " + user.id);
  const routeId = await postRoute(user.id);
  console.log('Start tracking');
  watchId.value = watchGpsData(
      (location) => {
        const dataPoint: dataPoint = {
          routeId: routeId,
          lat: location.lat,
          lon: location.lng,
          lean: 0,
          lateralG: 0,
          acceleration: 0,
          timestamp: new Date().toISOString(),
          speed: 0
        }

        dataPoint.speed = calculateSpeed(route.value, dataPoint);
        dataPoint.acceleration = calculateAcceleration(route.value, dataPoint);
        dataPoint.lateralG = calculateLateralG(route.value, dataPoint);
        dataPoint.lean = calculateLean(route.value, dataPoint);

        route.value.push(dataPoint);
        // if route length > 10 then postDataPoints
        if (route.value.length > 10) {
          // post all except the last 3 data points
          postDataPoints(route.value.slice(0, route.value.length - 3));
          // remove all except the last 3 data points
          route.value = route.value.slice(route.value.length - 3);
        }

      },
      (error) => {
        const errorElement = document.getElementById('error');
        if (errorElement !== null) {
          errorElement.innerText = error.message;
        }
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("Permission denied");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Position unavailable");
            break;
          case error.TIMEOUT:
            console.error("Request timed out");
            break;
          default:
            console.error("Unknown error occurred");
            break;
        }
      }
  );
  isTracking.value = true;
}

const stopTracking = () => {
  console.log('Stop tracking');
  if (watchId.value !== null){
    clearWatch(watchId.value);
    watchId.value = null;
  }
  if (route.value.length > 0) {
    postDataPoints(route.value);
    route.value = [];
  }
  isTracking.value = false;
}

const toggleTracking = async () => {
  if (isTracking.value) {
    stopTracking();
  } else {
    await startTracking();
  }
}
</script>

<template>
  <div class="window">
    <StandardButton :type="'positive'" :content="isTracking ? 'Stop tracking' : 'Start new lap'" :action="toggleTracking"></StandardButton>
    <div>
      <p>Tracking: {{isTracking}}</p>
      <p>Route: {{route.length}}</p>
      <P>LastPoint: {{route[route.length - 1]}}</P>
      <P id="error">Error: </P>
    </div>
  </div>
</template>

<style scoped lang="scss">
.window {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  color: var(--Text-color);
  font-weight: 800;
  height: 100vh;
}
</style>