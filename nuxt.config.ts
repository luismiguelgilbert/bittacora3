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
    'vuetify/lib/styles/main.sass',
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false
    },
  },
  runtimeConfig: {
    version: '0.0.1'
  },
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt'
  ],
  googleFonts: {
    prefetch: true,
    download: true,
    display: 'swap',
    inject: true,
    families: {
      //Inter: true
      Inter: [500, 600, 700, 800, 900]
    }
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY
  },
  typescript: {
    shim: false
  },
  /* naiveUI: {
    themeOverrides: {
      common: {
        primaryColor: "#4f45e4FF",
        primaryColorHover: "#6466f1FF",
        primaryColorPressed: "#6466F1FF",
        successColor: "#55c900FF",
        fontFamily: "Inter",
        fontWeight: '500',
        fontWeightStrong: '800',
        railColor: '#4f45e4FF',
      },
      Switch: {
        railColorActive: '#4f45e4FF',
      }
    }
  } */
})
