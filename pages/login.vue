<script setup lang="ts">
const { auth } = useSupabaseAuthClient() // useSupabaseClient() should not be used
const user = useSupabaseUser()
const router = useRouter()

const email = ref('luismiguelgilbert@gmail.com')
const password = ref('mypassword.2020')
const isErrorVisible = ref(false)
const errorMessage = ref('')
const isPwdVisible = ref(false)
const isPwdVisibleIcon = computed(() => {
  return isPwdVisible.value ? 'fas fa-eye-slash' : 'fas fa-eye'
}) 
const isPwdVisibleType = computed(() => {
  return isPwdVisible.value ? 'text' : 'password'
}) 
const togglePwdVisibility = () => {
  isPwdVisible.value = !isPwdVisible.value
}

const errorMsg = ref<unknown>(null)

const userLogin = async () => {
  try {
    const { error } = await auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    email.value = ''
    password.value = ''
    if (error) {
      isErrorVisible.value = true;
      errorMessage.value = error.message;
      throw error
    }
  } catch (error: any) {
    errorMessage.value = error;
    isErrorVisible.value = true;
    setTimeout(() => {
      errorMsg.value = ''
    }, 3000)
  }
}

watchEffect(() => {
  if (user.value) {
    router.push('/')
  }
})

definePageMeta({
  layout: 'login'
})
</script>
<template>
  <v-card
    class="mx-auto my-5 p-5 rounded-lg elevation-10"
    width="350px">
    <v-form class="pa-5">
      <v-text-field
        variant="outlined"
        clear-icon="fas fa-circle-xmark"
        clearable
        prepend-inner-icon="fas fa-user"
        v-model="email"
        color="primary"
        label="Usuario"
        placeholder="Ingrese su correo">
      </v-text-field>
      <v-text-field
        v-model="password"
        variant="outlined"
        :append-inner-icon="isPwdVisibleIcon"
        color="primary"
        :type="isPwdVisibleType"
        label="Contraseña"
        placeholder="Ingrese su contraseña"
        @click:append-inner="togglePwdVisibility">
      </v-text-field>
      <v-btn
        class="mt-2"
        block
        color="primary"
        size="x-large"
        @click="userLogin">
        Login
      </v-btn>
    </v-form>

    <v-snackbar
      v-model="isErrorVisible"
      color="red">
      {{ errorMessage }}
      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          icon="fas fa-circle-xmark"
          @click="isErrorVisible = false" />
      </template>
    </v-snackbar>
  </v-card>
</template>