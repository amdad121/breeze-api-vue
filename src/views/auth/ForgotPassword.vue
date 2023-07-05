<script setup>
import GuestLayout from '../../layouts/GuestLayout.vue'
import InputError from '../../components/InputError.vue'
import InputLabel from '../../components/InputLabel.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
import TextInput from '../../components/TextInput.vue'
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

const email = ref('')

const processing = ref(false)
const errors = ref({})
const status = ref(null)

const { forgotPassword } = useAuthStore()

const handleForgotPassword = async () =>
  await forgotPassword(processing, errors, status, email.value)
</script>

<template>
  <GuestLayout>
    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
      Forgot your password? No problem. Just let us know your email address and we will email you a
      password reset link that will allow you to choose a new one.
    </div>

    <div v-if="status" class="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
      {{ status }}
    </div>

    <form @submit.prevent="handleForgotPassword()">
      <div>
        <InputLabel for="email" value="Email" />

        <TextInput
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="email"
          required
          autofocus
          autocomplete="username"
        />

        <InputError class="mt-2" :message="errors.email?.[0]" />
      </div>

      <div class="flex items-center justify-end mt-4">
        <PrimaryButton :class="{ 'opacity-25': processing }" :disabled="processing">
          Email Password Reset Link
        </PrimaryButton>
      </div>
    </form>
  </GuestLayout>
</template>

<style scoped></style>
