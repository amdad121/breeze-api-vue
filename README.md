# Laravel API Breeze - Vite + Vue 3 Edition 🏝️

## Introduction

This repository is an implementation of the [Laravel API Breeze](https://laravel.com/docs/starter-kits) application / authentication starter kit frontend in [Vue](https://vuejs.org). All of the authentication boilerplate is already written for you - powered by [Laravel Sanctum](https://laravel.com/docs/sanctum), allowing you to quickly begin pairing your beautiful Vue frontend with a powerful Laravel backend.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Official Documentation

### Installation

First, create a Laravel backend by installing Laravel API Breeze into a [fresh Laravel application](https://laravel.com/docs/installation) and installing Breeze's API scaffolding:

```bash
# Create the Laravel application...
laravel new vue-backend

cd vue-backend

# Install Breeze and dependencies...
composer require laravel/breeze --dev

php artisan breeze:install api

# Run database migrations...
php artisan migrate
```

Next, ensure that your application's `APP_URL` and `FRONTEND_URL` environment variables are set to `http://localhost:8000` and `http://localhost:3000`, respectively.

After defining the appropriate environment variables, you may serve the Laravel application using the `serve` Artisan command:

```bash
# Serve the application...
php artisan serve
```

Next, clone this repository and install its dependencies with `yarn install` or `npm install`. Then, copy the `.env.example` file to `.env` and supply the URL of your backend:

```
VITE_APP_BACKEND_URL=http://localhost:8000
```

Finally, run the application via `npm run dev`. The application will be available at `http://localhost:3000`:

```
npm run dev
```

> Note: Currently, we recommend using `localhost` during local development of your backend and frontend to avoid CORS "Same-Origin" issues.

### Authentication Middleware

This Vue application contains a custom `auth` middleware, designed to abstract all authentication logic away from your pages. In addition, the middleware can be used to access the currently authenticated user:

```js
// First create a route inside router/index.js file
{
    path: '/example-page',
    name: 'example-page',
    meta: { title: 'Example Page', middleware: ['auth'] },
    component: () => import('../views/ExamplePage.vue'),
},
```

```js
// views/ExamplePage.vue
<script lang="ts" setup>
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue'
import { useAuthStore } from '../stores/auth'

const { user, logout } = useAuthStore()
</script>

<template>
  <AuthenticatedLayout>
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 flex gap-10">
        <p>{{ user?.name }}</p>

        <button @click="logout()">Sign out</button>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<style scoped></style>
```

> Note: You will need to use [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) (`user?.name` instead of `user.name`) when accessing properties on the user object to account for Vue's initial server-side render.

## Contributing

Contribution is open. Create Pull-request and I'll add it to the project if it's good enough.

## License

Laravel API Breeze Vite + Vue 3 is open-sourced software licensed under the [MIT license](LICENSE).
