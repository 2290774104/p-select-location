<template>
  <div>
    <p-select-location
      v-model="location"
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
import _ from 'lodash'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { options } from '@/components/PSelectLocation/options'

@Component({ name: 'App' })
export default class App extends Vue {
  private options = options

  private location: any[] = [['zhinan', 'shejiyuanze', 'yizhi']]

  private created() {
    setTimeout(() => {
      this.location.push(['zhinan', 'shejiyuanze', 'xiaolv'])
    }, 3000)
  }

  private selectChange(val: any) {
    console.log(val, 'change')
    console.log(_.cloneDeep(this.location))
  }

  @Watch('location', { deep: true })
  private locationChange(newVal: any[]) {
    console.log(newVal, 'v-model')
  }
}
</script>

<style lang="scss" scoped>
</style>
