<template>
  <div>
    <p-select-location
      :options="options"
      @change="selectChange"
      :props="{ multiple: true, lazy: false }"
      value="id"
      label="mc"
      :show-all-levels="false"
      clearable
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { options } from '@/components/PSelectLocation/options'

@Component({ name: 'App' })
export default class App extends Vue {
  private options = options

  private selectChange(val: any) {
    console.log(val)
  }
}
</script>

<style lang="scss" scoped>
</style>
