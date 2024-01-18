<template>
  <div class="container">
    <!-- <div>card1</div>
    <div>card1</div> -->
    <ul>
      <li v-for="(_, index) in cardList" :key="index">
        <div class="card">
          <div class="drag">
            <i class="icon"><Grip height="16" width="16" /></i>
          </div>
          <div>
            <SelectInput :options="cardOptionsList" />
          </div>
          <div><TextInput /><NumberInput /></div>
          <button class="close" @click="closeCard(index)">
            <i class="icon"><Xmark height="16" width="16" /></i>
          </button>
        </div>
      </li>
    </ul>
    <button class="add-card" @click="addCard">
      <i class="add-card-icon"><CirclePlus height="16" width="16" /></i>Add item
    </button>
  </div>
  <button @click="reset">reset</button>
</template>

<script setup lang="ts">
import CirclePlus from "@icons/circle-plus.svg"
import Grip from "@icons/grip-vertical.svg"
import Xmark from "@icons/xmark.svg"
import { ref } from "vue"
import NumberInput from "./NumberInput.vue"
import SelectInput from "./SelectInput.vue"
import TextInput from "./TextInput.vue"

console.log(window.api)

const cardOptionsList = ["card1", "card2"]

const cardList = ref<string[]>([])

const addCard = () => {
  cardList.value.push("card")
}

const closeCard = (index: number) => {
  cardList.value = cardList.value.filter((_, i) => i !== index)
}

const reset = () => {
  cardList.value = []
}
</script>

<style scoped>
.container {
  width: 300px;
}

.add-card-icon {
  fill: #888;
  margin: 8px;
}

.icon {
  fill: #bbb;
}

.add-card {
  border: 1px dashed #bbb;
  border-radius: 12px;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  background-color: #fff;
  cursor: pointer;
}

.add-card:hover {
  border-color: #1677ff;
  color: #1677ff;
}

.add-card:hover .icon {
  fill: #1677ff;
}

.card {
  position: relative;
  border-radius: 12px;
  color: #333;
  background-color: #f5f6f9;
  margin-bottom: 16px;
  padding: 16px 48px 0 32px;
}

.drag {
  height: 60px;
  position: absolute;
  left: 0px;
  top: calc(50% - 60px / 2);
  cursor: grab;
  display: flex;
  align-items: center;
}

.drag .icon {
  margin: 6px;
}

.drag:active {
  cursor: grabbing;
}

.close {
  position: absolute;
  top: calc(18px + 1rem / 2);
  right: 8px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>
