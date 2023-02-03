<script setup lang="ts">
// import 'vfonts/Inter.css'
import { darkTheme, NConfigProvider } from 'naive-ui'

// const client = useSupabaseClient()
const client = useSupabaseAuthClient()
const user = useSupabaseUser()
const drawer = ref(false)

const selectedItem = ref(1);

const toogleDrawer = () => {
  drawer.value = !drawer.value
}

const renderIcon = (iconName: string) => {
  return () => h('i', { class: iconName })
}

const drawerWidth = 264;
const collapsedDrawerWidth = 64;
const isDarkEnabled = ref(false);
const menuOptions = computed(() => {
  let result = [];
  for (var index = 0; index < 30; index++) {
    result.push({
      label: `Menu number ${index}`,
      key: `key_${index}`,
      icon: renderIcon('fas fa-home')
    })
  }
  return result;
});

const changeTheme = () => {
  isDarkEnabled.value = !isDarkEnabled.value;
}

const theme = computed(() => {
  return isDarkEnabled.value ? darkTheme : null;
})

const userLogout = async () => {
  await client.auth.signOut()
}

watchEffect(() => {
  if (!user.value) {
    return navigateTo('/login')
  }
})

definePageMeta({
  middleware: 'auth'
})
</script>

<template>
<NConfigProvider
  :theme="theme"
  >
  <NGlobalStyle />
  <n-layout has-sider style="overflow-y: hidden;">
    <n-layout-sider
      show-trigger
      :collapsed="drawer"
      collapse-mode="width"
      :collapsed-width="collapsedDrawerWidth"
      :width="drawerWidth"
      :native-scrollbar="false"
      style="height: calc(100vh);"
      @collapse="toogleDrawer"
      @expand="toogleDrawer">

      <div 
        v-if="!drawer"
        style="display: flex; align-self: center; justify-content: space-between; height: 35px;">
        <div>
          <n-h3 strong style="padding-top: 5px; padding-left: 5px;">
            Framework
          </n-h3>
        </div>
        <div style="padding-top: 5px; padding-right: 15px;">
          <n-avatar
            size="small"
            src="img/BittIcon.png"
            :style="{ backgroundColor: 'transparent' }" />
        </div>
      </div>
      <n-text v-if="!drawer" depth="3" style="padding-left: 5px;">
        {{ user?.email }}
      </n-text>
      <hr v-if="!drawer" style="border: 1px solid #f4f5fa;"/>

      <div
        :style="`overflow-y: auto; height: calc(100vh - ${!drawer ? 117 : 40}px)`">
        <n-menu
          :options="menuOptions"
        />
      </div>

      <hr v-if="!drawer" style="border: 1px solid #f4f5fa; margin: 1px;"/>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button
            type="primary"
            text-color="white"
            size="large"
            block
            @click="userLogout">
            <span v-if="!drawer">Logout</span>
            <i class="fa-solid fa-door-open" style="padding-left: 10px;"></i>
          </n-button>
        </template>
        Cerrar sesión
      </n-tooltip>
    </n-layout-sider>
    
    <n-layout 
      content-style="padding: 24px;"
      :style="`height: calc(100vh); ${isDarkEnabled?undefined:'background-color: #f4f5fa;'}`">
      <n-layout-header
      bordered
      style="height: 64px">
      <n-page-header >
        <div 
          :style="`height: 64px; padding-left: 1rem; display: flex; align-items: center; ${isDarkEnabled?undefined:'background-color: #f4f5fa;'}`"
          >
          <n-space justify="space-between" style="width: 100%;">
            <div>
              
            </div>
            <div>
              <n-switch
                v-model:value="isDarkEnabled"
                size="large"
                @change="changeTheme"
                @update:value="changeTheme" />
            </div>
          </n-space>
          
          
          <n-space horizontal></n-space>
          
          
        </div>
      </n-page-header>
    </n-layout-header>
      contenido
      <n-h2
        v-for="n in 30" :key="n">
        Handian Bridge
      </n-h2>
    </n-layout>
  </n-layout>
</NConfigProvider>
</template>

<style scoped>
.n-card > .n-card__content, .n-card > .n-card__footer {
  padding: 0px !important;
}
</style>