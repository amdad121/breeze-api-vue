<script setup>
import GuestLayout from '../../layouts/GuestLayout.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
import { useAuthStore } from '../../stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { user, resendEmailVerification, logout } = useAuthStore()

const router = useRouter()

if (user?.email_verified_at) {
  router.push('/dashboard')
}

const processing = ref(false)
const status = ref(null)

const handleResendEmailVerification = async () => await resendEmailVerification(processing, status)
</script>

<template>
  <GuestLayout>
    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
      Thanks for signing up! Before getting started, could you verify your email address by clicking
      on the link we just emailed to you? If you didn't receive the email, we will gladly send you
      another.
    </div>

    <div
      class="mb-4 font-medium text-sm text-green-700 bg-green-100 px-4 py-2 rounded dark:text-green-400"
      v-if="status"
    >
      A new verification link has been sent to the email address you provided during registration.
    </div>

    <form @submit.prevent="handleResendEmailVerification()">
      <div class="mt-4 flex items-center justify-between">
        <PrimaryButton :class="{ 'opacity-25': processing }" :disabled="processing">
          Resend Verification Email
        </PrimaryButton>

        <button
          @click="logout()"
          class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        >
          Log Out
        </button>
      </div>
    </form>
  </GuestLayout>
</template>

<style scoped></style>
