
import Vue from 'vue'
// for future
// export interface InstallationOptions {}
// export function install (vue: typeof Vue, options: InstallationOptions): void

// now
export function install(vue: typeof Vue): void

export interface IData {
  value: string
  label: string
  leaf: boolean
}

export interface INode extends IData {
  level: number
}

export interface PSelectLocation {
  level: number

  firstLoad: (node: INode) => any[]

  secondLoad: (node: INode) => any[]

  thirdLoad: (node: INode) => any[]
}
