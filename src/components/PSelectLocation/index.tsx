import Vue, { CreateElement, VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator'
import { merge, omit } from '../utils/opera'

interface IData {
  value: string
  label: string
  leaf: boolean
}

interface INode extends IData {
  level: number
}

@Component
export default class PSelectLocation extends Vue {
  // 级联层数（最大 3）
  @Prop({ type: Number, default: 3 }) private readonly level!: number

  @Prop({ type: Function, default: () => [] }) private readonly firstLoad!: Function

  @Prop({ type: Function, default: () => [] }) private readonly secondLoad!: Function

  @Prop({ type: Function, default: () => [] }) private readonly thirdLoad!: Function

  render(h: CreateElement): VNode {
    const defaultProps = {
      expandTrigger: 'click',
      multiple: false,
      checkStrictly: false,
      lazy: true,
      lazyLoad: async (node: INode, resolve: any) => {
        const data: IData[] = []
        if (node.level === 0) {
          const list = await this.firstLoad(node)
          list.forEach((item: any) => {
            data.push({
              value: item[this.$attrs.value],
              label: item[this.$attrs.label],
              leaf: this.level === 1
            })
          });
        }
        if (node.level === 1) {
          const list = await this.secondLoad(node)
          list.forEach((item: any) => {
            // 前一级为市，代表当前级为区间，无后续节点
            data.push({
              value: item[this.$attrs.value],
              label: item[this.$attrs.label],
              leaf: node.label.includes('市') || this.level === 2
            })
          });
        }
        if (node.level === 2) {
          const list = await this.thirdLoad(node)
          list.forEach((item: any) => {
            data.push({
              value: item[this.$attrs.value],
              label: item[this.$attrs.label],
              leaf: true
            })
          });
        }
        resolve(data)
      }
    }

    // 获取用户配置并合并默认配置
    const props = merge(defaultProps, Object.prototype.hasOwnProperty.call(this.$attrs, 'props') ? this.$attrs.props : {})

    // 如果配置动态加载数据则移除数据源
    const attrs = merge(props.lazy ? omit(this.$attrs, ['options']) : this.$attrs, { props })

    // 动态加载时移除 value label 属性（已在加载项中处理）
    const $attrs = attrs.props.lazy ? omit(attrs, ['value', 'label']) : attrs

    console.log($attrs);

    return (
      <el-cascader
        {...{ props: $attrs, on: this.$listeners }}
      />
    )
  }
}
