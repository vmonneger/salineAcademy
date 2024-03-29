<script setup lang="ts">
/**
 * @file Page for courses.
 */
import { ref, onMounted, computed } from 'vue'
import { useTeacherStore } from 'stores/teacher'
import { useUserStore } from 'stores/user'
import { useQueryState } from 'src/composable/useQueryState'
import FormCourse from 'src/features/course/FormCourse.vue'
import { AppButton, AppModalBig, AppCard, AppText as txt, AppHeading as h, AppLink } from 'components'

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
  try {
    await isQueryFetched('queryCourses', async () => {
      await teacherStore.queryCourses(userId.value)
    })
  } catch (error) {
    console.error(error)
  }
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
          <h>Mes cours</h>
        </div>

        <div class="col-auto">
          <AppButton @click="handleModalState">Créer un cours</AppButton>
        </div>
      </div>
    </div>
    <div class="col-12 row q-col-gutter-md">
      <div v-for="course in courses" :key="course.id" class="col-4">
        <AppLink :to="{ name: 'Course', params: { courseId: course.id } }">
          <AppCard class="cursor-pointer">
            <h size="xs">{{ course.titre }}</h>
            <txt>{{ course.description }}</txt>
            <div v-for="(instrument, index) in course.instruments" :key="index">
              <txt>{{ instrument }}</txt>
            </div>
          </AppCard>
        </AppLink>
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
