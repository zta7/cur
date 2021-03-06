import { LocalStorage } from 'quasar'
import { provide as p, watch, ref } from 'vue'

export default ({ key, toValue, validateFn, provide }, cb = () => {}) => {
  let v = LocalStorage.getItem(key)
  if (validateFn && !validateFn(v)) v = toValue

  const _ref = ref(v)
  if (provide) p(key, _ref.value)

  cb(_ref.value)
  watch(_ref, n => {
    cb(n)
    LocalStorage.set(key, n)
  })
  return _ref
}
