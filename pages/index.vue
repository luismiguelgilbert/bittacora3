<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
<template>
  <div>
    <h1>WELCOME</h1>
    <v-card
      title="Card title"
      subtitle="Subtitle"
      color="primary"
      text="...">
    </v-card>
    <!--<v-btn @click="loadMenuData">Cargar Datos</v-btn>-->
    <div class="d-flex flex-row mb-6">
      <v-card color="secondary" class="ma-2 pa-2" title="Cart title 1" subtitle="subtitle">Flex item 1</v-card>
      <v-card color="success" class="ma-2 pa-2 text-white" title="Cart title 2" subtitle="subtitle">Flex item 2</v-card>
      <v-card color="warning" class="ma-2 pa-2 text-white" loading title="Cart title 3" subtitle="subtitle">Flex item 3</v-card>
      <v-card color="secondary" class="ma-2 pa-2" title="Cart title 4" subtitle="subtitle">Flex item 4</v-card>
      <v-card color="error" class="ma-2 pa-2" title="Cart title 5" subtitle="subtitle">Flex item 5</v-card>
    </div>
    <div
      v-for="n in 50">
      {{ n }}
    </div>
  </div>
</template>