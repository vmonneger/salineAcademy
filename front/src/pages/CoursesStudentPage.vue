<script setup lang="ts">
/**
 * @file Course page for students.
 */
import { onMounted, computed } from 'vue'
import { useStudentStore } from 'stores/student'
import { useUserStore } from 'stores/user'
import { useQueryState } from 'src/composable/useQueryState'
import { AppCard, AppText as txt, AppHeading as h, AppLink } from 'components'

const userStore = useUserStore()
const studentStore = useStudentStore()
const { isQueryFetched } = useQueryState()

const userId = computed(() => userStore.id)
const courses = computed(() => studentStore.courses)

onMounted(async () => {
  try {
    await isQueryFetched('queryCourses', async () => {
      await studentStore.queryCourses(userId.value)
    })
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <h>Mes cours</h>
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
</template>
