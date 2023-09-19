<script setup lang="ts">
/**
 * @file Course page.
 */
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTeacherStore } from 'stores/teacher'
import { useUserStore } from 'stores/user'
import { useStudentStore } from 'stores/student'
import { useQueryState } from 'src/composable/useQueryState'
import { Course } from 'src/types/databaseTypes'
import { AppCard, AppText as txt, AppHeading as h, AppButton } from 'components'

const teacherStore = useTeacherStore()
const userStore = useUserStore()
const studentStore = useStudentStore()
const { isQueryFetched } = useQueryState()
const route = useRoute()

const userId = computed(() => userStore.id)
const isTeacher = computed(() => userStore.role === 'TEACHER')
const course = computed(() => {
  if (isTeacher.value) {
    return teacherStore.courses.find((course) => course.id == Number(route.params.courseId)) ?? ([] as Course)
  }
  if (!isTeacher.value) {
    return studentStore.courses.find((course) => course.id == Number(route.params.courseId)) ?? ([] as Course)
  }
  return [] as Course
})

onMounted(async () => {
  // TODO: (backend) Create endpoint get single course id.
  try {
    if (isTeacher.value) {
      await isQueryFetched('queryCourses', async () => {
        await teacherStore.queryCourses(userId.value)
      })
    } else {
      await isQueryFetched('queryCourses', async () => {
        await studentStore.queryCourses(userId.value)
      })
    }
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <AppButton flat icon-left="sym_s_chevron_left" :to="{ name: isTeacher ? 'CoursesTeacher' : 'CoursesStudent' }">
        Retourner aux cours
      </AppButton>
    </div>
    <div class="col-12">
      <AppCard class="cursor-pointer">
        <h size="xs">{{ course.titre }}</h>
        <txt>{{ course.description }}</txt>
        <div v-for="(instrument, index) in course.instruments" :key="index">
          <txt>{{ instrument }}</txt>
        </div>
      </AppCard>
    </div>
  </div>
</template>
