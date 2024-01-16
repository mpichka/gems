<template>
  <div class="select" :class="focused ? 'select-focus' : null">
    <input v-model="value" type="text" class="input" @focus="focusInput" @blur="blurInput" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const value = defineModel("value")

const focused = ref(false)

const focusInput = () => {
  focused.value = true
}
const blurInput = () => {
  focused.value = false
}
</script>

<style scoped>
.select {
  display: inline-block;
  border-radius: 8px;
  border: 1px solid #bbb;
  background-color: #fff;
  width: 240px;
  margin: 4px;
  padding: 3px 0.5rem;
}

.select-focus {
  outline: 1px solid #bbb;
}

.input {
  height: 1.5rem;
  width: 100%;
  border: none;
  color: #333;
}

.input:focus {
  outline: none;
}
</style>
