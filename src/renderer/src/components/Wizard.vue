<template>
  <div>
    <ol>
      <li v-for="(item, index) in steps" :key="index">
        {{ item }}
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentStep: string
  steps: string[]
}>()
</script>

<style scoped></style>
