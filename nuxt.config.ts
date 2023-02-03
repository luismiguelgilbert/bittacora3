/*
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
*/
export default defineNuxtConfig({
  css: [
    '@fortawesome/fontawesome-free/css/fontawesome.css',
    '@fortawesome/fontawesome-free/css/solid.css',
    '@fortawesome/fontawesome-free/css/regular.css',
    '@fortawesome/fontawesome-free/css/brands.css',
  ],
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer'
          ]
        : ['@juggle/resize-observer']
  },
  vite: {
    define: {
      'process.env.DEBUG': false
    },
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : []
    }
  },
  runtimeConfig: {
    version: '0.0.1'
  },
  modules: [
    '@nuxtjs/supabase',
    '@huntersofbook/naive-ui-nuxt',
    '@nuxtjs/google-fonts',
  ],
  googleFonts: {
    prefetch: true,
    download: true,
    display: 'swap',
    inject: true,
    families: {
      Inter: true
    }
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY
  },
  typescript: {
    shim: false
  },
  naiveUI: {
    themeOverrides: {
      common: {
        primaryColor: "#4f45e4FF",
        primaryColorHover: "#6466f1FF",
        primaryColorPressed: "#6466F1FF",
        successColor: "#55c900FF",
        fontFamily: "Inter",
        fontWeight: '500',
        fontWeightStrong: '600',
        railColor: '#4f45e4FF',
      },
      Switch: {
        railColorActive: '#4f45e4FF',
      }
    }
  }
})
