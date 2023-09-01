<script setup lang="ts">
/**
 * @file Auth Page.
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getFileFromAssets } from 'src/helpers/files'
import FormAuth from 'src/features/auth/FormAuth.vue'
import { AppCard, AppHeading as h, AppText as txt, AppLink } from 'components'

const route = useRoute()

const authMode = computed(() => (route.name === 'Register' ? 'register' : 'login'))
</script>

<template>
  <div class="row q-pa-md" style="height: 100vh; width: 100vw">
    <AppCard style="height: auto; max-width: 500px; margin: auto; box-shadow: none">
      <div class="row q-col-gutter-sm">
        <div class="col-12 row justify-center">
          <q-img
            color="primary"
            :src="getFileFromAssets('logo-saline-vertical-violet.png')"
            style="width: 100px; height: auto"
          />
        </div>
        <div class="col-12 q-mb-md">
          <h class="q-pb-xs" size="xs">{{ authMode === 'register' ? 'Inscription' : 'Connexion' }}</h>
          <txt class="no-margin" color="neutral" size="md">Bienvenue chez Saline royale academy</txt>
        </div>
        <FormAuth :authMode="authMode" />
        <div class="col-12 row q-gutter-x-sm justify-center">
          <txt class="no-margin" color="neutral">{{
            authMode === 'register' ? 'Vous avez déjà un compte ?' : "Vous n'avez pas de compte ?"
          }}</txt>
          <AppLink :to="{ name: authMode === 'register' ? 'Login' : 'Register' }">
            <txt class="no-margin" color="accent" weight="semibold">{{
              authMode === 'register' ? 'Connectez vous !' : 'Inscrivez vous !'
            }}</txt>
          </AppLink>
        </div>
      </div>
    </AppCard>
  </div>
</template>
