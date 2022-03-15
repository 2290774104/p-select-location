export function merge(obj: any, add: any) {
  const shallowCopy = Object.assign({}, obj, add)
  return shallowCopy
}

export function omit(obj: any, fields: any[]) {
  const shallowCopy = Object.assign({}, obj)
  for (let i = 0; i < fields.length; i += 1) {
    const key = fields[i]
    delete shallowCopy[key]
  }
  return shallowCopy
}
