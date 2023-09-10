<script setup lang="ts">
/**
 * @file Page for register Licence.
 */
import { computed, ref } from 'vue'
import { useAdminStore } from 'stores/admin'
import { notificationSaved } from 'src/helpers/notifications'
import { QuasarFileMetadata } from 'src/types/types'
import { AppHeading, AppButton, AppModal } from 'components'

type Rows = {
  name: string
  email: string
  role: string
}

const adminStore = useAdminStore()

const modalState = ref(false)
const loading = ref(false)

// const schools = computed(() => adminStore.schools)
// const users = computed(() => adminStore.users)

const toggleModal = () => {
  modalState.value = !modalState.value
}

/**
 * Upload file use store action.
 */
const uploadFile = async (file: Array<QuasarFileMetadata>) => {
  try {
    await adminStore.uploadCSV(file[0])
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

const testschools = [
  {
    name: 'le nom ecoooole',
    id: 1,
  },
  {
    name: 'le nom popopo',
    id: 2,
  },
  {
    name: 'le nom moomomo',
    id: 3,
  },
]

const testusers = [
  {
    school: 'le nom ecoooole',
    name: 'FRancois machin',
    email: 'truc@truc.com',
    role: 'STUDENT',
  },
  {
    school: 'le nom popopo',
    name: 'ZAZAZA lolo',
    email: 'truc@truc.com',
    role: 'STUDENT',
  },
  {
    school: 'le nom moomomo',
    name: 'Steve mala',
    email: 'sssss@truc.com',
    role: 'STUDENT',
  },
  {
    school: 'le nom popopo',
    name: 'Koko lolo',
    email: 'truc@truc.com',
    role: 'STUDENT',
  },
]

const users = computed<Map<string, Rows[]>>(() => {
  const usersMap = new Map()

  testusers.forEach((user) => {
    const { school, ...userWithoutSchool } = user

    if (!usersMap.has(school)) {
      usersMap.set(school, [])
    }
    usersMap.get(school).push(userWithoutSchool)
  })
  return usersMap
})
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
          <div class="row">
            <q-uploader ref="fileInput" class="col-12" accept=".csv" max-file-size="5242880" :factory="uploadFile" />
          </div>
        </AppModal>
      </div>
    </div>
    <div v-for="school in testschools" :key="school.id" class="col-12">
      <q-list bordered class="rounded-borders">
        <q-expansion-item expand-separator :label="school.name">
          <q-card-section>
            <q-table
              :title="school.name"
              :rows="users.size === 0 ? [] : users.get(school.name)"
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
  width: 100%;
}
</style>
