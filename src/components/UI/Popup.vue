<script setup lang="ts">

import StandardButton from "@/components/UI/StandardButton.vue";

let props = defineProps(
    {
        type: {
            type: String as () => 'positive' | 'negative' | 'neutral',
            required: false,
            default: "positive",
        }
    })
</script>

<template>

  <div class="popup">
    <div class="popup-header">
      <slot name="header"></slot>
    </div>
    <div class="popup-content">
      <slot></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>

</template>

<style scoped lang="scss">

.popup {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 1.25rem;
  border-radius: 1rem;
  background: var(--Background-color, #FFFFFF);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 20rem;
}

.popup-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  font-size: 1.25rem;
  font-weight: 800;
}

.popup-content {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
}

</style>