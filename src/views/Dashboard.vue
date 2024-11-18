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
import ScoreCircle from "@/components/UI/ScoreCircle.vue";
import router from "@/router";
import { errorMessages } from "vue/compiler-sfc";
import Popup from "@/components/UI/Popup.vue";


const route = ref<dataPoint[]>([]);
let routeId = 0;
const isTracking = ref(false);
const watchId = ref<number | null>(null);
const errorMessage = ref<string | null>(null);


const startTracking = async () => {
  let user = JSON.parse(localStorage.getItem('user') || '{}');
  // get user from session storage if user is not in local storage
  if (user.id === undefined) {
    user = JSON.parse(sessionStorage.getItem('user') || '{}');
  }
  routeId = await postRoute(user.id);
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
        console.error('Error:', error);
        errorMessage.value = error.message;
        stopTracking();
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
  if (errorMessage.value === null) {
    router.push({name: 'Result', params: {routeId: routeId}});
  }
}

const toggleTracking = async () => {
  if (isTracking.value) {
    stopTracking();
  } else {
    await startTracking();
  }
}

const clearError = () => {
  errorMessage.value = null;
  router.push({name: 'Result', params: {routeId: routeId}});
}

</script>

<template>
  <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
  <div class="window">

    <div class="trackingButton">
      <StandardButton :type="'positive'" :content="isTracking ? 'Stop tracking' : 'Start new lap'" :action="toggleTracking"></StandardButton>
    </div>

    <popup v-if="errorMessage" :type="'negative'">
      <template #header>Error</template>
      <template #default>{{errorMessage}}</template>
      <template #footer>
        <StandardButton :type="'negative'" :content="'Ok'" :action="clearError"></StandardButton>
      </template>
    </popup>
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
  font-family: Inter;
}

</style>