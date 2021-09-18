import { mount } from "./mount.js"
import { patch } from './patch.js'
import { watchEffect } from './dep.js'

export function createApp(component, container) {
  let isMounted = false
  let prevVdom
  watchEffect(() => {
    if (!isMounted) {
      prevVdom = component.render()
      mount(prevVdom, container)
      isMounted = true
    } else {
      const newVdom = component.render()
      patch(prevVdom, newVdom)
      prevVdom = newVdom
    }
  })
}