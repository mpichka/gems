<template>
  <br />
  <!-- <Builder>
    <input type="text" />
  </Builder> -->
  <Builder />

  <br />
  <div style="width: 300px">
    <SelectInput placeholder="Select item" :options="['Item 1', 'Item 2', 'Item 3']" />
    <TextInput v-model:value="foo" />
    <NumberInput v-model:value="bar" suffix="$" />
  </div>
</template>

<script setup lang="ts">
import Builder from "@components/Builder.vue"
import NumberInput from "@components/NumberInput.vue"
import SelectInput from "@components/SelectInput.vue"
import TextInput from "@components/TextInput.vue"
import { ref } from "vue"

const foo = ref("Test")
const bar = ref(345)
</script>
