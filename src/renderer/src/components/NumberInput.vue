<template>
  <div class="select" :class="focused ? 'select-focus' : null">
    <div class="input-container">
      <input
        v-model.number="value"
        type="text"
        class="input"
        @focus="focusInput"
        @blur="blurInput"
        @input="validateNumber"
      />
      <span v-if="suffix" class="suffix">{{ suffix }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

type Props = {
  suffix: string
}
defineProps<Props>()

const value = defineModel("value")

const focused = ref(false)

const focusInput = () => {
  focused.value = true
}
const blurInput = () => {
  focused.value = false
}
const validateNumber = (e) => {
  const NumberRegex = /^\d*([.,]\d*)?$/
  if (!NumberRegex.test(e.target.value)) {
    e.target.value = e.target.value.slice(0, -1)
  }
  const CommaRegex = /,/
  if (CommaRegex.test(e.target.value)) {
    e.target.value = e.target.value.replace(/,/g, ".")
  }
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

.input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.suffix {
  color: #888;
  margin: 0 0 0 0.5rem;
}
</style>
