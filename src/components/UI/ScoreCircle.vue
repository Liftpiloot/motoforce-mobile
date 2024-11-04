<script setup lang="ts">
const props = defineProps({
  score: Number,
  maxScore: Number,
  isHighScore: Boolean,
  name: String
});

</script>

<template>
  <div class="circle-container">
    <div :class="['circle-wrap', { isHighScore: isHighScore }]">
    <div class="circle">
      <p class="score">{{score}}</p>
    </div>
    </div>
    <p class="name">{{name}}</p>
  </div>
</template>

<style scoped lang="scss">
.circle-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
}

.circle{
  display: flex;
  width: 5rem;
  height: 5rem;
  justify-content: center;
  align-items: center;
  background: var(--Background-color, #FFFFFF);
  border-radius: 3.125rem;
}

.circle-wrap{
  padding: 1rem;
  position: relative;
  padding: 2px;
  border-radius: 3.125rem;
  background: white;
}

.isHighScore{
  background: var(--Primary-gradient)
}

.score{
  color: var(--Text-color, #E5E5E5);
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
}

.name{
  color: var(--Text-color, #E5E5E5);
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
}
</style>