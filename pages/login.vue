<script setup lang="ts">
const { auth } = useSupabaseAuthClient() // useSupabaseClient() should not be used
const user = useSupabaseUser()
const router = useRouter()

const email = ref('luismiguelgilbert@gmail.com')
const password = ref('mypassword.2020')
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
      throw error
    }
  } catch (error) {
    errorMsg.value = error
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
</script>
<template>
  <!--<div style="display: flex; align-self: center; justify-content: center; max-width: 400px; margin: 10px;">-->
  <n-grid :x-gap="12" :cols="3">
    <n-grid-item>
    </n-grid-item>

    <n-grid-item>
      <n-card bordered>
        <n-tabs
          type="line"
          default-value="signin"
          size="large"
          justify-content="space-evenly">
          <n-tab-pane name="signin" tab="Sign in">
            <n-form>
              <n-form-item-row label="Dirección de correo">
                <n-input
                  size="large"
                  placeholder="Ingrese su correo" />
              </n-form-item-row>
              <n-form-item-row label="Contraseña">
                <n-input
                  size="large"
                  type="password"
                  placeholder="Ingrese su contraseña" />
              </n-form-item-row>
              <n-button
                type="primary" 
                text-color="white"
                block
                size="large"
                @click="userLogin">
                Login
                <i class="fa-solid fa-door-open" style="padding-left: 10px;"></i>
              </n-button>
            </n-form>
          </n-tab-pane>

          <n-tab-pane name="signup" tab="Sign up">
            <n-form>
              <n-form-item-row label="Username">
                <n-input size="large" />
              </n-form-item-row>
              <n-form-item-row label="Password">
                <n-input size="large" type="password" />
              </n-form-item-row>
              <n-form-item-row label="Reenter Password">
                <n-input size="large" type="password" />
              </n-form-item-row>
              <n-button
                type="primary" 
                text-color="white"
                block
                size="large"
                @click="userLogin">
                Sign Up
                <i class="fa-solid fa-edit" style="padding-left: 10px;"></i>
              </n-button>
            </n-form>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </n-grid-item>

    <n-grid-item>
    </n-grid-item>
  </n-grid>
</template>