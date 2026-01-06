<template>
  <v-container fluid class="fill-height login-container pa-0">
    <v-row no-gutters class="fill-height">
      <!-- Left Side: Visual/Brand -->
      <v-col cols="12" md="6" lg="7"
        class="d-none d-md-flex align-center justify-center position-relative bg-primary overflow-hidden">
        <div class="absolute-background"></div>
        <div class="z-index-1 text-center pa-10 text-white">
          <div class="mb-6 fade-in-up">
            <v-icon size="80" color="white" class="mb-4">mdi-rocket-launch</v-icon>
            <h1 class="text-h3 font-weight-bold mb-2">Welcome Back!</h1>
            <p class="text-h6  text-white opacity-80">
              Manage your projects efficiently and collaborate with your team seamlessly.
            </p>
          </div>
          <v-img
            src="https://cdn.dribbble.com/users/1202722/screenshots/11189445/media/3494b8e3427af714881ae94916a04870.png"
            max-width="600" class="mx-auto rounded-xl elevation-10 fade-in-up delay-200" cover></v-img>
        </div>
      </v-col>

      <!-- Right Side: Login Form -->
      <v-col cols="12" md="6" lg="5" class="d-flex align-center justify-center bg-surface">
        <div class="w-100 pa-8 pa-md-12" style="max-width: 480px">
          <div class="mb-8">
            <h2 class="text-h4 font-weight-bold text-primary mb-2">Sign In</h2>
            <p class="text-subtitle-1 text-medium-emphasis">
              Enter your credentials to access your account.
            </p>
          </div>

          <v-form @submit.prevent="handleLogin" v-model="isValid">
            <v-text-field v-model="email" label="Email Address" prepend-inner-icon="mdi-email-outline"
              variant="outlined" color="primary" :rules="[rules.required, rules.email]" class="mb-2 input-tall"
              rounded="lg"></v-text-field>

            <v-text-field v-model="password" label="Password" prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword" :type="showPassword ? 'text' : 'password'"
              variant="outlined" color="primary" :rules="[rules.required]" class="mb-4 input-tall"
              rounded="lg"></v-text-field>

            <div class="d-flex align-center justify-space-between mb-6">
              <v-checkbox v-model="rememberMe" label="Remember me" color="primary" hide-details
                density="compact"></v-checkbox>
              <a href="#" class="text-primary text-decoration-none text-subtitle-2 font-weight-bold hover-underline">
                Forgot Password?
              </a>
            </div>

            <v-btn block color="primary" size="large" type="submit" :loading="loading"
              class="text-uppercase font-weight-bold letter-spacing-1 mb-6" rounded="lg" elevation="4" height="50">
              Log In
            </v-btn>
          </v-form>

          <div class="d-flex align-center mb-6">
            <v-divider class="border-opacity-25"></v-divider>
            <span class="px-3 text-caption text-medium-emphasis text-uppercase">OR</span>
            <v-divider class="border-opacity-25"></v-divider>
          </div>

          <div class="d-flex gap-4 justify-center">
            <v-btn variant="outlined" color="grey-lighten-1" class="flex-grow-1 text-none" rounded="lg" height="44">
              <v-icon icon="mdi-google" color="red" class="mr-2"></v-icon>
              Google
            </v-btn>
            <v-btn variant="outlined" color="grey-lighten-1" class="flex-grow-1 text-none ml-2" rounded="lg"
              height="44">
              <v-icon icon="mdi-github" color="black" class="mr-2"></v-icon>
              GitHub
            </v-btn>
          </div>

          <p class="text-center mt-8 text-body-2 text-medium-emphasis">
            Don't have an account?
            <a href="#" class="text-primary text-decoration-none font-weight-bold hover-underline">Sign up
              now</a>
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const isValid = ref(false)

const rules = {
  required: (v: string) => !!v || 'Field is required',
  email: (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
}

const handleLogin = async () => {
  if (!isValid.value) return

  loading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  loading.value = false
  router.push('/board')
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
}

.absolute-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--v-theme-primary) 0%, #1a237e 100%);
  opacity: 0.9;
  z-index: 0;
}

.absolute-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.1;
}

.z-index-1 {
  z-index: 1;
}

.hover-underline:hover {
  text-decoration: underline !important;
}

/* Animations */
.fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.delay-200 {
  animation-delay: 0.2s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.letter-spacing-1 {
  letter-spacing: 1px;
}
</style>
