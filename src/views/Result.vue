<script setup lang="ts">
import ScoreCircle from "@/components/UI/ScoreCircle.vue";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {ComposableRoute, Route} from "@/scripts/composableRoute";
import Popup from "@/components/UI/Popup.vue";

const webRoute = useRoute();

let routeId: number = parseInt(webRoute.params.routeId as string);
let route = ref<Route>();
let maxLean = ref(0);
let maxG = ref(0);
let maxSpeed = ref(0);

onMounted(async () => {
  const composableRoute = ComposableRoute();
  maxSpeed.value = Math.round(await composableRoute.getMaxSpeed(routeId));
  maxLean.value = Math.round(await composableRoute.getMaxLean(routeId));
  maxG.value = Math.round(await composableRoute.getMaxG(routeId));
  const response = await composableRoute.get(routeId);
  route.value = response.route;
});
</script>

<template>
  <div class="stats">
    <ScoreCircle :score="maxLean" :maxScore="45" :isHighScore="true" name="Max lean"></ScoreCircle>
    <ScoreCircle :score="maxG" :maxScore="1" :isHighScore="false" name="Max G"></ScoreCircle>
    <ScoreCircle :score="maxSpeed" :maxScore="300" :isHighScore="false" name="Max speed"></ScoreCircle>
  </div>

</template>

<style scoped lang="scss">

.stats{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1.5625rem;
  align-self: stretch;
}

</style>