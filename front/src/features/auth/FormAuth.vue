<script setup lang="ts">
/**
 * @file Form for authentication
 */
import { ref, computed } from 'vue'
import { notification, notificationSaved } from 'src/helpers/notifications'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/auth'
import { capitalizeFirstLetter } from 'src/helpers/text'
import { ruleVerifyPassword } from 'src/helpers/rules'
import { AppInput, AppButton } from 'components'

interface FormProps {
  authMode: 'register' | 'login'
}

const props = defineProps<FormProps>()

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordMatch: '',
})

const loading = ref(false)

const isRegister = computed(() => (props.authMode === 'register' ? true : false))

/**
 * Form submit.
 */
const handleSubmit = async () => {
  loading.value = true
  try {
    if (props.authMode === 'register') {
      await authStore.register({
        firstName: capitalizeFirstLetter(form.value.firstName),
        lastName: capitalizeFirstLetter(form.value.lastName),
        email: form.value.email,
        password: form.value.password,
      })
      notificationSaved()
    } else {
      await authStore.login({
        email: form.value.email,
        password: form.value.password,
      })
    }
    router.push({ name: 'Catalog' })
  } catch (error) {
    notification('Vos identifiants sont invalides', 'error')
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <q-form class="row q-col-gutter-sm" @submit="handleSubmit">
    <div v-if="isRegister" class="col-6">
      <AppInput
        v-model="form.firstName"
        name="firstName"
        type="text"
        required
        label="Prénom"
        placeholder="Entrez votre prénom"
      />
    </div>
    <div v-if="isRegister" class="col-6">
      <AppInput
        v-model="form.lastName"
        name="lastName"
        type="text"
        required
        label="Nom"
        placeholder="Entrez votre nom"
      />
    </div>

    <div class="col-12">
      <AppInput
        v-model="form.email"
        name="email"
        type="email"
        required
        label="Email"
        placeholder="Entrez votre email"
      />
    </div>
    <div class="col-12">
      <AppInput
        v-model="form.password"
        required
        label="Mot de passe"
        name="password"
        class="col-12"
        placeholder="Entrez votre mot de passe"
        type="password"
      />
    </div>
    <div v-if="isRegister" class="col-12">
      <AppInput
        v-model="form.passwordMatch"
        required
        label="Mot de passe"
        name="password-match"
        placeholder="Confirmez votre mot de passe"
        dense
        :rules="ruleVerifyPassword(form.password)"
        lazy-rules
        type="password"
      />
    </div>
    <div class="col-12 text-center q-mb-md">
      <AppButton :loading="loading" class="fit" type="submit">{{
        isRegister ? "S'enregister" : 'Connexion'
      }}</AppButton>
    </div>
  </q-form>
</template>
