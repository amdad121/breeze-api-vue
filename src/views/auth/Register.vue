<script setup>
import GuestLayout from '../../layouts/GuestLayout.vue'
import InputError from '../../components/InputError.vue'
import InputLabel from '../../components/InputLabel.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
import TextInput from '../../components/TextInput.vue'
import { useAuthStore } from '../../stores/auth'
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const processing = ref(false)
const errors = ref({})

const { register } = useAuthStore()

const handleRegister = async () => await register(processing, errors, form.value)
</script>

<template>
  <GuestLayout>
    <form @submit.prevent="handleRegister()">
      <div>
        <InputLabel for="name" value="Name" />

        <TextInput
          id="name"
          type="text"
          class="mt-1 block w-full"
          v-model="form.name"
          required
          autofocus
          autocomplete="username"
        />

        <InputError class="mt-2" :message="errors.name?.[0]" />
      </div>

      <div class="mt-4">
        <InputLabel for="email" value="Email" />

        <TextInput
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          required
          autocomplete="username"
        />

        <InputError class="mt-2" :message="errors.email?.[0]" />
      </div>

      <div class="mt-4">
        <InputLabel for="password" value="Password" />

        <TextInput
          id="password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          required
          autocomplete="current-password"
        />

        <InputError class="mt-2" :message="errors.password?.[0]" />
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
        <RouterLink
          :to="{ name: 'login' }"
          class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        >
          Already registered?
        </RouterLink>

        <PrimaryButton class="ml-4" :class="{ 'opacity-25': processing }" :disabled="processing">
          Register
        </PrimaryButton>
      </div>
    </form>
  </GuestLayout>
</template>

<style scoped></style>
