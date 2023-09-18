<script setup lang="ts">
/**
 * @file Form for courses.
 */
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { useTeacherStore } from 'stores/teacher'
import { useUserStore } from 'stores/user'
import { useVideoStore } from 'stores/video'
import { notificationSaved, notification } from 'src/helpers/notifications'
import { Video } from 'stores/video/types'
import { useQueryState } from 'src/composable/useQueryState'
import TheFilterVideos from '../catalog/TheFilterVideos.vue'
import { AppInput, AppSelect, AppCardVideo, AppText as txt, AppButton } from 'components'

interface Select {
  label: string
  value: number
}

const userStore = useUserStore()
const teacherStore = useTeacherStore()
const videoStore = useVideoStore()
const { isQueryFetched } = useQueryState()

const formRef = ref()
const videos = ref([] as Array<Video>)
const videosPagination = ref([] as Array<Video>)
const videoSelected = ref<Video | null>()

const itemsParPage = ref(3)
const currentPage = ref(1)

const videosStore = computed(() => videoStore.videos)
const userId = computed(() => userStore.id)
const listStudentsOptions = computed(() => {
  return teacherStore.students.map((student) => {
    return {
      label: student.firstName + ' ' + student.lastName,
      value: student.id,
    }
  })
})
const totalVideos = computed(() => videos.value.length)
const pagesNumber = computed(() => Math.ceil(totalVideos.value / itemsParPage.value))

const form = reactive({
  title: '',
  description: '',
  students: [] as Array<Select>,
  userId: userId.value,
  video: 0,
})

const displayVideosPerPage = (videos: Array<Video>, page: number) => {
  const startIndex = (page - 1) * itemsParPage.value
  const endIndex = startIndex + itemsParPage.value

  return videos.slice(startIndex, endIndex)
}

onMounted(async () => {
  try {
    await isQueryFetched(['getVideos', 'querySchoolStudents'], async () => {
      await videoStore.getVideos()
      await teacherStore.querySchoolStudents(userId.value)
    })

    videosPagination.value = displayVideosPerPage(videos.value, currentPage.value)
  } catch (error) {
    console.error(error)
  }
})

const submit = async () => {
  const isValid = await formRef.value?.validate().then((success: boolean) => {
    if (success) {
      if (!form.video) {
        notification("Vous n'avez pas selectionné de vidéo", 'error')
        return false
      }
      return true
    }
  })

  if (!isValid) return 'ERROR'

  try {
    const parsedUserId = form.students.map((student) => student.value)

    await teacherStore.createCourse({
      video: form.video,
      titre: form.title,
      description: form.description,
      userId: form.userId,
      students: parsedUserId,
    })

    notificationSaved()
    return 'SUCCESS'
  } catch (error) {
    console.error(error)
  }
}

const getVideoFiltered = (videosFiltered: Array<Video>) => {
  videos.value = videosFiltered
}

const selectVideo = (video: Video) => {
  videoSelected.value = video
  form.video = video.id
}

const unSelectVideo = () => {
  videoSelected.value = null
}

watch(currentPage, async () => {
  videosPagination.value = displayVideosPerPage(videos.value, currentPage.value)
})
watch(videos, async () => {
  videosPagination.value = displayVideosPerPage(videos.value, currentPage.value)
})

defineExpose({
  submit,
})
</script>

<template>
  <q-form ref="formRef">
    <div class="row">
      <div v-if="!videoSelected" class="col-12">
        <txt class="no-margin">Selectionnez une vidéo</txt>
        <TheFilterVideos @videosFiltered="getVideoFiltered" :videos="videosStore" style="width: 100%" />
      </div>
      <template v-if="!videoSelected">
        <div class="col-12 col-sm-4 col-md-3" v-for="(video, index) in videosPagination" :key="index">
          <AppCardVideo
            :image="video.url"
            :badgeName="video.format.name"
            :title="video.title"
            :langues="video.langues"
            :description="video.description"
            @click="selectVideo(video)"
          />
        </div>
      </template>
      <div v-if="videoSelected" class="col-12 row justify-center q-mb-lg">
        <div class="col-sm-4 col-md-3 row justify-center">
          <AppCardVideo
            :image="videoSelected.url"
            :badgeName="videoSelected.format.name"
            :title="videoSelected.title"
            :langues="videoSelected.langues"
            :description="videoSelected.description"
          />
          <AppButton size="lg" @click="unSelectVideo">Supprimer la vidéo</AppButton>
        </div>
      </div>
      <div v-if="!videoSelected" class="col-12 q-pa-lg flex flex-center">
        <q-pagination v-model="currentPage" :max="pagesNumber" />
      </div>
      <div class="col-12">
        <AppInput v-model="form.title" label="Titre" required />
      </div>
      <div class="col-12">
        <AppInput v-model="form.description" label="Description" type="textarea" />
      </div>
      <div class="col-12">
        <AppSelect
          v-model="form.students"
          multiple
          hint="Nbre élèves"
          counter
          label="Selectionnez les élèves"
          :options="listStudentsOptions"
          use-chips
          emit-option="label"
        />
      </div>
    </div>
  </q-form>
</template>
