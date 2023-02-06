<script setup lang="ts">
import { emit } from 'process';
const user = await useSupabaseUser()

const emit = defineEmits(['changetheme'])

const changeTheme = () => {
  console.log('changeTheme in user.vue');
  emit('changetheme');
}

definePageMeta({
  layout: 'default'
})
</script>
<template>
  <div>
    <v-card
      min-width="300"
      :title="user?.email"
      :subtitle="user?.id">
      <template v-slot:text>
        {{ user?.last_sign_in_at }}
        <v-btn
          block
          color="primary"
          rounded="0"
          size="x-large"
          prepend-icon="fas fa-door-open"
          @click="changeTheme">
          Cambiar Tema
        </v-btn>
      </template>
    </v-card>
  </div>
</template>