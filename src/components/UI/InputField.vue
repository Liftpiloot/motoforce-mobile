<script setup lang="ts">

const props = defineProps({
  placeholder: String,
  modelValue: String,
  type: {
    type: String,
    default: 'text'
  },
  required: {
    type: Boolean,
    default: true
  },
  label: {
    type: Boolean,
    default: false,
  },
  labelText: {
    type: String,
    default: '',
  }
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="input-container">
  <label for="id" v-if="label">{{labelText}}</label>
  <input id="id" :placeholder="placeholder" :type="type" :value="modelValue" @input="updateValue" :required="required">
  </div>
</template>

<style scoped lang="scss">

input{
  height: 1.5625rem;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 1rem;
  border: 1px solid var(--Text-color, #E5E5E5);
  padding: 0.625rem;
  background: var(--Background-color, #FFFFFF);
  color: var(--Text-color);
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  width: 100%;
}
</style>