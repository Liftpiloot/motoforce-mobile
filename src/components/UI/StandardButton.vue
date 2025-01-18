<script setup lang="ts">

const props = defineProps(
    {
      content: {
        type: String,
        required: false
      },
      action: {
        type: Function,
        required: false,
        default: () => {}
      },
      type: {
        type: String as () => 'positive' | 'negative' | 'neutral',
        required: false,
        default: "positive",
      }
    })

</script>

<template>
  <button @click="action" :class="type">
    {{content}}
  </button>
</template>

<style scoped lang="scss">

button {
  all: unset;
  margin-top: 1rem;
  display: flex;
  width: 9.6875rem;
  padding: 0.25rem 0;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  transition: 0.1s;
}

button:active {
  transform: translateY(2px);
}

.positive {
  background: var(--Positive-solid, #4F15B4);
  color: var(--Text-color, #FFFFFF);
}

.positive:hover {
  background: var(--Positive-hover, #6A1CB4);
}

.negative {
  background: var(--Background-color, #272727FF );
  color: var(--Text-color, #FFFFFF);
  border: 1px solid var(--Primary-solid, #4F15B4);
}

.negative:hover {
  background: var(--Negative-hover, #6A1CB4);
}

.neutral {
  background: var(--Primary-solid, #4F15B4);
  color: var(--Text-color, #FFFFFF);
}

.neutral:hover {
  background: var(--Neutral-hover, #6A1CB4);
}

</style>