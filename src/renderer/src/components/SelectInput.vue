<template>
  <div class="select" :class="focused ? 'select-focus' : null">
    <div class="input-container">
      <input
        v-model="text"
        class="input"
        type="text"
        :placeholder="placeholder"
        @focus="focusInput"
        @input="search"
      />
      <i
        :class="focused && filteredOptions.length ? 'icon-focus' : 'icon-blur'"
        class="icon"
        @click="focusInput"
      >
        <Chevron height="12" width="12" />
      </i>
    </div>
    <div v-if="focused" class="dialog-bg" @click="closeDialog"></div>
    <div v-if="focused && filteredOptions.length" ref="dialog" class="dropdown">
      <ul>
        <li
          v-for="(option, index) in filteredOptions"
          :key="index"
          :class="select.index === index ? 'item-active' : null"
          class="dropdown-item"
          @click="selectItem(index)"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import Chevron from "@icons/chevron.svg"
import { ref } from "vue"

type Props = {
  placeholder?: string
  options?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Select an option",
  options: () => []
})

const focused = ref(false)
const text = ref("")
const select = ref({ index: -1, value: "" })
const dialog = ref(null)
const filteredOptions = ref<string[]>(props.options)

const search = () => {
  if (text.value.length > 3) {
    filteredOptions.value = props.options.filter((option) =>
      option.toLowerCase().includes(text.value.toLowerCase())
    )
  }
  if (text.value.length === 0) {
    filteredOptions.value = props.options
  }
}
const focusInput = () => {
  focused.value = true
}
const closeDialog = () => {
  focused.value = false
  text.value = select.value.index !== -1 ? select.value.value : ""
  filteredOptions.value = props.options
}
const selectItem = (index: number) => {
  text.value = filteredOptions.value[index]
  select.value = { index, value: filteredOptions.value[index] }
  focused.value = false
  filteredOptions.value = props.options
}
</script>

<style scoped>
.icon {
  fill: #bbb;
  cursor: pointer;
}
.icon-focus {
  rotate: 180deg;
  transition: rotate 0.2s ease-in-out;
}

.icon-blur {
  transition: rotate 0.2s ease-in-out;
}

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

.input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.dropdown {
  position: absolute;
  margin: 8px 0 0 -0.5rem;
  background-color: #fff;
  width: 240px;
  border: 1px solid #bbb;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: #000;
}

.dropdown-item {
  border-radius: 6px;
  padding: 8px 6px;
  margin: 4px;
}
.dropdown-item:hover {
  background-color: #eee;
}
.dropdown-item:active {
  background-color: #bbb;
}
.item-active {
  background-color: #eee;
}

.dialog-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
