<script setup lang="ts">
/**
 * @fileoverview Fichier du composant de profil.
 * @file ProfilePage.vue
 */
import { ref } from 'vue'
import { AppInput, AppButton } from 'components'
import { ruleVerifyPassword } from 'src/helpers/rules'
import { useAuthStore } from 'stores/auth'
import { notificationSaved } from 'src/helpers/notifications'

const authStore = useAuthStore()

const newPassword = ref('')
const confirmPassword = ref('')

const submitUpdatePassword = async () => {
  try {
    await authStore.updatePassword(newPassword.value)

    newPassword.value = ''
    confirmPassword.value = ''
    notificationSaved()
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe:', error)
  }
}
</script>

<template>
  <q-form class="row q-col-gutter-sm" @submit="submitUpdatePassword">
    <div class="col-12">
      <AppInput
        label="Nouveau mot de passe"
        v-model="newPassword"
        type="password"
        placeholder="nouveau mot de passe"
        lazy-rules="ondemand"
        required
      />
    </div>
    <div class="col-12">
      <AppInput
        label="Confirmer le mot de passe"
        v-model="confirmPassword"
        type="password"
        :rules="ruleVerifyPassword(newPassword)"
        lazy-rules="ondemand"
        required
        placeholder="Confirmez le mot de passe"
      />
    </div>
    <div class="col-12 text-right">
      <AppButton type="submit" label="Valider" />
    </div>
  </q-form>
</template>
