<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useSystemStore } from '@/stores/system'
import { MenuOption } from '@/typings/System'

const client = useSupabaseAuthClient() //useSupabaseClient()
const user = await useSupabaseUser()
const theme = useTheme()
const systemStore = useSystemStore();

const supabaseJWT = useCookie('sb-access-token')

const { data, pending, error, refresh } = await useAsyncData(
  'menuOptions',
  () => $fetch('/api/system', { headers: { Cookie: `sb-access-token=${supabaseJWT.value}` }})
)
const menuOptions = (data as unknown as MenuOption[]);
systemStore.setMenuOptions(menuOptions)
const rootMenuOptions = computed(() => {
  return systemStore.menuOptions?.filter(x => x.parent === null);
}) 

const userLogout = async () => {
  await client.auth.signOut()
}

const drawer = ref(true)
const isDarkEnabled = ref(theme.global.current.value.dark);
const darkBgColor = computed(() => {
  return isDarkEnabled.value ? 'bg-grey-darken-3' : 'bg-blue-grey-lighten-5'
}) 
const changeTheme = () => {
  isDarkEnabled.value = !isDarkEnabled.value
  theme.global.name.value = theme.global.current.value.dark ? 'themeLight' : 'themeDark'
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
  <v-card>
    <v-layout>
      <v-navigation-drawer
        permanent
        floating
        v-model="drawer">

        <v-card
          flat
          class="mx-auto"
          width="400">
          <template v-slot:title>
            <div class="d-flex flex-row align-center">
              <v-menu :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                  <v-btn
                    size="small"
                    flat
                    :color="isDarkEnabled ? 'grey-darken-3' : 'grey-darken-1'"
                    icon="fas fa-user"
                    v-bind="props"></v-btn>
                </template>
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

              </v-menu>
              <div
                class="pl-2 text-h6 font-weight-black"
                :class="!isDarkEnabled ? 'text-grey-darken-3' : ''">Framework</div>
            </div>
          </template>
          
        </v-card>

        <v-text-field
          class="ma-2"
          density="compact"
          variant="solo"
          label="Buscar..."
          append-inner-icon="fas fa-search"
          single-line
          hide-details>
        </v-text-field>

        <v-list
          class="overflow-y-auto"
          height="calc(100vh - 168px)">

          <div
            v-for="item, index in rootMenuOptions">
            <v-list-subheader>{{ item.name_es }}</v-list-subheader>
              <v-list-item
                v-for="(subItem, i) in systemStore.menuOptions?.filter(x => x.parent === item.id)"
                :key="`${subItem}-${i}`"
                :value="`${subItem}-${i}`"
                active-color="primary"
                :to="subItem.link"
                variant="plain">
                <template v-slot:prepend>
                  <v-icon class="mr-3" size="small" :icon="subItem.icon"></v-icon>
                </template>
                <v-list-item-title class="text-subtitle-2"  v-text="`${subItem.name_es}`"></v-list-item-title>
                <v-tooltip
                  activator="parent"
                  location="end">
                  {{ item.name_es }} - {{ subItem.name_es }}
                </v-tooltip>
              </v-list-item>
              <v-divider v-if="rootMenuOptions && (index + 1) < rootMenuOptions?.length" class="my-5"></v-divider>
          </div>
          <br/>
        </v-list>

        <v-btn
          block
          color="primary"
          rounded="0"
          size="x-large"
          prepend-icon="fas fa-door-open"
          @click="userLogout">
          Cerrar Sesión
        </v-btn>
      </v-navigation-drawer>

      <v-main
        class="p-5"
        :class="darkBgColor"
        style="height: calc(100vh); overflow-y: scroll;">
        <div class="pa-10">
          <slot></slot>
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
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped>
</style>