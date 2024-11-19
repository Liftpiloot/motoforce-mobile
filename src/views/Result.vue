<script setup lang="ts">
import ScoreCircle from "@/components/UI/ScoreCircle.vue";
import {h, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {ComposableRoute, Route} from "@/scripts/composableRoute";
import Popup from "@/components/UI/Popup.vue";
import Logo from "@/components/UI/Logo.vue";
import StandardButton from "@/components/UI/StandardButton.vue";
import router from "@/router";

const webRoute = useRoute();
const loading = ref(false);
let routeId: number = parseInt(webRoute.params.routeId as string);
let route = ref<Route>();
let maxLean = ref(0);
let maxG = ref(0);
let maxSpeed = ref(0);

let highscoreSpeed = ref<{score:number, isHighScore:boolean}>({score: 0, isHighScore: false});
let highscoreLean = ref<{score:number, isHighScore:boolean}>({score: 0, isHighScore: false});
let highscoreG = ref<{score:number, isHighScore:boolean}>({score: 0, isHighScore: false});

const errorMessage = ref<string | null>(null);
const emptyRoute = ref(false);

const clearError = () => {
  errorMessage.value = null;
};

async function getMaxSpeed() {
  const composableRoute = ComposableRoute();
  const {maxSpeed: speed, highScore: highScore} = await composableRoute.getMaxSpeed(routeId);
  if (speed >= highScore) {
    highscoreSpeed.value = {score: speed, isHighScore: true};
  } else {
    highscoreSpeed.value = {score: highScore, isHighScore: false};
  }
  maxSpeed.value = Math.round(speed);
}

async function getMaxLean() {
  const composableRoute = ComposableRoute();
  const {maxLean: lean, highScore: highScore} = await composableRoute.getMaxLean(routeId);
  if (lean >= highScore) {
    highscoreLean.value = {score: lean, isHighScore: true};
  } else {
    highscoreLean.value = {score: highScore, isHighScore: false};
  }
  maxLean.value = Math.round(lean);
}

async function getMaxG() {
  const composableRoute = ComposableRoute();
  const {maxG: g, highScore: highScore} = await composableRoute.getMaxG(routeId);
  if (g >= highScore) {
    highscoreG.value = {score: g, isHighScore: true};
  } else {
    highscoreG.value = {score: highScore, isHighScore: false};
  }
  maxG.value = Math.round(g);
}



onMounted(async () => {
  loading.value = true;
  try {
    const composableRoute = ComposableRoute();
    const response = await composableRoute.get(routeId);
    route.value = response.route;
    if (route.value.dataPoints.length === 0) {
      emptyRoute.value = true;
      errorMessage.value = 'No data in route';
      return;
    }
    await getMaxSpeed();
    await getMaxLean();
    await getMaxG();

  }
  catch (error) {
    errorMessage.value = 'An error occurred. Please try again';
  }
  finally {
    loading.value = false;
  }
});

const deleteRoute = async () => {
  loading.value = true;
  try {
    const composableRoute = ComposableRoute();
    await composableRoute.deleteRoute(routeId);
    router.push({name: 'Dashboard'});
  }
  catch (error) {
    console.log(error.message);
    errorMessage.value = 'An error occurred. Please try again';
  }
  finally {
    loading.value = false;
  }
};

</script>

<template>
  <div class="window">
    <logo :loading="loading"/>
    <div class="stats">
      <ScoreCircle :score="maxLean" :maxScore="highscoreLean.score" :isHighScore="highscoreLean.isHighScore" name="Max lean"></ScoreCircle>
      <ScoreCircle :score="maxG" :maxScore="highscoreG.score" :isHighScore="highscoreG.isHighScore" name="Max G"></ScoreCircle>
      <ScoreCircle :score="maxSpeed" :maxScore="highscoreSpeed.score" :isHighScore="highscoreSpeed.isHighScore" name="Max speed"></ScoreCircle>
    </div>


    <popup v-if="errorMessage" :type="'negative'">
      <template #header>Error</template>
      <template #default>{{errorMessage}}</template>
      <template #footer>
        <standard-button :type="'neutral'" :content="'Ok'" :action="clearError"></standard-button>
        <standard-button :type="'positive'" :content="'Retry'" :action="() => this.$router.go(this.$router.currentRoute)"></standard-button>
        <standard-button v-if="emptyRoute" :type="'negative'" :content="'Delete route'" :action="deleteRoute"></standard-button>
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
}

.stats {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1.5625rem;
  align-self: stretch;
}

</style>