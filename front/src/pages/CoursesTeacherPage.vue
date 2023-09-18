<script setup lang="ts">
/**
 * @file Page for courses.
 */
import { ref, onMounted, computed } from 'vue'
import { useTeacherStore } from 'stores/teacher'
import { useUserStore } from 'stores/user'
import { useQueryState } from 'src/composable/useQueryState'
import FormCourse from 'src/features/course/FormCourse.vue'
import { AppHeading, AppButton, AppModalBig } from 'components'

const userStore = useUserStore()
const teacherStore = useTeacherStore()
const { isQueryFetched } = useQueryState()

const modalFormState = ref(false)
const formModalRef = ref()
const loadingSubmit = ref(false)

const userId = computed(() => userStore.id)
const courses = computed(() => teacherStore.courses)

const handleModalState = () => {
  modalFormState.value = !modalFormState.value
}

onMounted(async () => {
  await isQueryFetched('queryCourses', async () => {
    await teacherStore.queryCourses(userId.value)
  })
})

/**
 * Handle submit of the form.
 */
const handleSubmit = async () => {
  loadingSubmit.value = true

  const submitStatus = await formModalRef.value?.submit()

  if (submitStatus === 'SUCCESS') modalFormState.value = false

  loadingSubmit.value = false
}
</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <div class="row justify-between q-col-gutter-md">
        <div class="col-auto">
          <AppHeading>Mes cours</AppHeading>
        </div>

        <div class="col-auto">
          <AppButton @click="handleModalState">Créer un cours</AppButton>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div v-for="course in courses" :key="course.id">
        {{ course.titre }}
      </div>
    </div>
  </div>
  <AppModalBig
    v-model="modalFormState"
    :loading-submit="loadingSubmit"
    @cancel="() => (modalFormState = false)"
    @submit="handleSubmit"
  >
    <template #title>Création du cours</template>
    <template #default>
      <FormCourse ref="formModalRef"></FormCourse>
    </template>
  </AppModalBig>
</template>
