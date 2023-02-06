import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'assets/main.scss'

const themeLight: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#6100ee",
    secondary: "#4d4d4d",
    success: "#25c760",
    warning: "#ffc82e",
    error: "#ff4c29",
  },
};

const themeDark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: "#6100ee",
    secondary: "#4d4d4d",
    success: "#25c760",
    warning: "#ffc82e",
    error: "#ff4c29",
  },
};

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      themes: {
        themeLight, themeDark
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})