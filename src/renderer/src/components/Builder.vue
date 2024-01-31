<template>
  <div class="container" @dragover.prevent @dragenter.prevent @dragleave.prevent>
    <ul :ref="drag.listRef">
      <li v-for="item in orderedList" :key="item.id" class="list-item">
        <div :id="item.id" class="card">
          <div class="drag" @pointerdown="(e) => drag.handleDrag(e, item.id)">
            <i class="icon">
              <Grip height="16" width="16" />
            </i>
          </div>
          <div>
            <SelectInput placeholder="Категорія" :options="cardOptionsList" />
          </div>
          <div>
            <TextInput />
            <NumberInput />
          </div>
          <button class="close" @click="closeCard(item.id)">
            <i class="icon">
              <Xmark height="16" width="16" />
            </i>
          </button>
        </div>
      </li>
    </ul>
    <button id="test" class="add-card" @click="addCard">
      <i class="add-card-icon">
        <CirclePlus height="16" width="16" />
      </i>
      <p>Add item</p>
    </button>
  </div>
  <div v-show="drag.isDragged.value" :ref="drag.draggableContainer" class="drag-container"></div>
  <button @click="reset">reset</button>
</template>

<script setup lang="ts">
import { useDrag } from "@hooks/useDrag"
import CirclePlus from "@icons/circle-plus.svg"
import Grip from "@icons/grip-vertical.svg"
import Xmark from "@icons/xmark.svg"
import { computed, ref } from "vue"
import NumberInput from "./NumberInput.vue"
import SelectInput from "./SelectInput.vue"
import TextInput from "./TextInput.vue"

const cardOptionsList = ["card1", "card2"]

const list = ref<{ id: string; order: number }[]>([])
const orderedList = computed(() => list.value.toSorted((a, b) => a.order - b.order))

const drag = useDrag(list)

const addCard = () => {
  list.value.push({
    id: window.api.getRandomId(),
    order: list.value.length
  })
}

const closeCard = (id: string) => {
  list.value.splice(
    list.value.findIndex((card) => card.id === id),
    1
  )
}

const reset = () => {
  list.value = []
}
</script>

<style scoped lang="scss">
.container {
  margin: 20vh;
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

  &:hover {
    border-color: #1677ff;
    color: #1677ff;

    .add-card-icon {
      fill: #1677ff;
    }
  }
}

.card {
  position: relative;
  border-radius: 12px;
  color: #333;
  background-color: #f5f6f9;
  padding: 16px 48px 16px 32px;
}

.list-item {
  margin-bottom: 16px;
}

.drag {
  height: 60px;
  position: absolute;
  left: 0px;
  top: calc(50% - 60px / 2);
  cursor: grab;
  display: flex;
  align-items: center;

  .icon {
    margin: 6px;
  }

  &:hover .icon {
    fill: #888;
  }

  &:active {
    cursor: grabbing;
  }
}

.drag-blur::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
  border-radius: 12px;
}

.close {
  position: absolute;
  top: calc(18px + 1rem / 2);
  right: 8px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover .icon {
    fill: #888;
  }
}

.drag-container {
  opacity: 0.7;
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 8px;
  box-shadow: 6px 3px 12px rgba(0, 0, 0, 0.2);
}
</style>
