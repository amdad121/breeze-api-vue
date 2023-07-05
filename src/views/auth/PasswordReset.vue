<script setup>
import GuestLayout from '../../layouts/GuestLayout.vue'
import InputError from '../../components/InputError.vue'
import InputLabel from '../../components/InputLabel.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
import TextInput from '../../components/TextInput.vue'
import { useAuthStore } from '../../stores/auth'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()

if (!route.query.email) {
  router.push('/')
}

const form = ref({
  token: route.params?.token,
  email: route.query?.email,
  password: '',
  password_confirmation: '',
})

const processing = ref(false)
const errors = ref({})
const status = ref(null)

const { resetPassword } = useAuthStore()

const handleResetPassword = async () => await resetPassword(processing, errors, status, form.value)
</script>

<template>
  <GuestLayout>
    <form @submit.prevent="handleResetPassword()">
      <div>
        <InputLabel for="email" value="Email" />

        <TextInput
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          required
          readonly
        />

        <InputError class="mt-2" :message="errors?.email?.[0]" />
      </div>

      <div class="mt-4">
        <InputLabel for="password" value="Password" />

        <TextInput
          id="password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          required
          autocomplete="new-password"
        />

        <InputError class="mt-2" :message="errors?.password?.[0]" />
      </div>

      <div class="mt-4">
        <InputLabel for="password_confirmation" value="Confirm Password" />

        <TextInput
          id="password_confirmation"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password_confirmation"
          required
          autocomplete="new-password"
        />

        <InputError class="mt-2" :message="errors?.password_confirmation?.[0]" />
      </div>

      <div class="flex items-center justify-end mt-4">
        <PrimaryButton :class="{ 'opacity-25': processing }" :disabled="processing">
          Reset Password
        </PrimaryButton>
      </div>
    </form>
  </GuestLayout>
</template>

<style scoped></style>
