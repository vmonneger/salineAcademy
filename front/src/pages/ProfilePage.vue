<script setup lang="ts">
/**
 * @fileoverview Fichier du composant de profil.
 * @file ProfilePage.vue
 */
import FormUpdatePassword from 'src/features/auth/FormUpdatePassword.vue'
import { AppHeading } from 'components'
</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <AppHeading>Profil</AppHeading>
    </div>
    <div class="col-12 row justify-center">
      <FormUpdatePassword style="max-width: 500px" />
    </div>
  </div>
</template>
