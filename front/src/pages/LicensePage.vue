<script setup lang="ts">
/**
 * @file Page for register Licence.
 */
import { computed, watchEffect, ref } from 'vue'
import {useUserStore} from 'stores/user'
import { notificationSaved } from 'src/helpers/notifications';
import { AppHeading, AppButton, AppModal } from 'components'

interface QuasarFileMetadata extends Blob {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
  __img?: string
  __key?: string
  __progress?: number
  __progressLabel?: string
  __sizeLabel?: string
  __status?: string
  __uploaded?: number
  lastModified?: number
  lastModifiedDate?: Date
  name?: string
  webkitRelativePath?: string
}

const userStore = useUserStore()

const modalState = ref(false)
const loading = ref(false)

const toggleModal = () => {
  modalState.value = !modalState.value
}

/**
 * Upload file use store action.
 */
 const uploadFile = async (files: Array<QuasarFileMetadata>) => {
  try {
    await userStore.addFile({
      file: files[0],
    })
    notificationSaved()
  } catch (error) {
    
  } finally {
    toggleModal()
  }
}

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nom',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
  { name: 'role', align: 'right', label: 'Role', field: 'role', sortable: true },
]

const rows = [
  {
    name: 'Frozen Yogurt',
    email: 'sidfidfif@jeanfrancoisduchere.com',
    role: 'STUDENT',
  },
  {
    name: 'Ice cream sandwich',
    email: 'sidfidfif@jeanfrancoisduchere.com',
    role: 'TEACHER',
  },
  {
    name: 'Frozen Yogurt',
    email: 'sidfidfif@jeanfrancoisduchere.com',
    role: 'STUDENT',
  },
  {
    name: 'Ice cream sandwich',
    email: 'sidfidfif@jeanfrancoisduchere.com',
    role: 'TEACHER',
  },
  {
    name: 'Frozen Yogurt',
    email: 'sidfidfif@jeanfrancoisduchere.com',
    role: 'STUDENT',
  },
  {
    name: 'Ice cream sandwich',
    email: 'sidfidfif@jeanfrancoisduchere.com',
    role: 'TEACHER',
  },
  {
    name: 'Frozen Yogurt',
    email: 'sidfidfif@jeanfrancoisduchere.com',
    role: 'STUDENT',
  },
  {
    name: 'Ice cream sandwich',
    email: 'sidfidfif@jeanfrancoisduchere.com',
    role: 'TEACHER',
  },
  {
    name: 'Frozen Yogurt',
    email: 'sidfidfif@jeanfrancoisduchere.com',
    role: 'STUDENT',
  },
  {
    name: 'Ice cream sandwich',
    email: 'sidfidfif@jeanfrancoisduchere.com',
    role: 'TEACHER',
  },
  {
    name: 'Frozen Yogurt',
    email: 'sidfidfif@jeanfrancoisduchere.com',
    role: 'STUDENT',
  },
  {
    name: 'Ice cream sandwich',
    email: 'sidfidfif@jeanfrancoisduchere.com',
    role: 'TEACHER',
  },
]

// const test = computed(() => console.log(sidebar.show))
</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 row justify-between items-center q-gutter-md">
      <div class="col-auto">
        <AppHeading>Gestionnaire des licences</AppHeading>
      </div>
      <div class="col-auto">
        <AppButton @click="toggleModal">Ajouter une école</AppButton>
        <AppModal v-model="modalState" title="Uploader un CSV">
          <q-uploader
          ref="fileInput"
          class="rounded-borders items-center justify-center q-pa-md full-width full-height col"
          accept=".pdf, .jpg, .jpeg, .png, .mp4"
          max-file-size="5242880"
          :factory="uploadFile"
          style="max-width: 300px"
        >
        </AppModal>
      </div>
    </div>
    <div class="col-12">
      <q-list bordered class="rounded-borders">
        <q-expansion-item expand-separator label="Le nom de l'école">
          <q-card-section>
            <q-table
              title="Le nom de l'école"
              :grid="$q.screen.xs"
              :dense="$q.screen.lt.md"
              :rows="rows"
              :columns="columns"
              row-key="email"
            />
          </q-card-section>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<style>
.q-table {
  /* table-layout: fixed; */
  /* overflow-x: scroll; */
  width: 100%;
}
</style>
