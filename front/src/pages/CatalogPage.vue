<script setup lang="ts">
/**
 * @file Index page.
 */
import { AppButton, AppIcon, AppInput, AppHeading, AppText, AppBadge, AppTag, AppSelect, AppCheckbox } from 'components'
import { ref } from 'vue'

const todos = ref([
  {
    value: 1,
    label: 'ct1',
  },
  {
    value: 2,
    label: 'ct2',
  },
  {
    value: 3,
    label: 'ct3',
  },
  {
    value: 4,
    label: 'ct4',
  },
  {
    value: 5,
    label: 'ct5',
  },
])
const test = ref(false)
</script>

<template>
  <AppButton>Le texte du btn</AppButton>
  <AppInput>Le texte du btn</AppInput>
  <AppIcon name="icecream" fill />
  <AppHeading>List of the most prestigious classical music competitions </AppHeading>
  <AppText>List of the most prestigious classical music competitions </AppText>
  <AppBadge label="Zorbam" color="accent" />
  <AppTag>Le tag</AppTag>
  <AppSelect :options="todos" />
  <AppCheckbox v-model="test" class="col-auto no-margin" style="margin-right: -5px !important" />
</template>
