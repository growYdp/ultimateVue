import { mount } from "./mount.js"

/**
 * 
 * @param {object} n1 oldVNode
 * @param {object} n2 newVNode
 */
export function patch(n1, n2) {
  if (n1.tag === n2.tag) {
    // 1.oldVNode tag equal newVNode tag
    const el = n2.el = n1.el

    // 1.1 handle props
    const oldProps = n1.props || {}
    const newProps = n2.props || {}

    // 1.1.1 handle new props
    for (const key in newProps) {
      const oldValue = oldProps[key]
      const newValue = newProps[key]
      if (oldValue !== newValue) {
        // old value unequal new value
        // use new value
        el.setAttribute(key, newValue)
      }
    }

    for (const key in oldProps) {
      if (!(key in newProps)) {
        el.removeAttribute(key)
      }
    }

    // 1.2 handle children
    const oldChildren = n1.children
    const newChildren = n2.children
    if (typeof newChildren === 'string') {
      // 1.2.1 when type of new children is string
      if (typeof oldChildren === 'string') {
        // 1.2.1.1 when type of old children is string
        if (newChildren !== oldChildren) {
          // unequal
          el.textContent = newChildren
        }
      } else {
        // 1.2.1.2 when typeof old children is array
        el.textContent = newChildren
      }
    } else {
      // 1.2.2 when type of new children is array
      if (typeof oldChildren === 'string') {
        // 1.2.2.1 old children is string
        newChildren.forEach(child => {
          mount(child, el)
        })
      } else {
        // 1.2.2.2 old children is array
        const commonLength = Math.min(oldChildren.length, newChildren.length)

        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i])
        }

        if (newChildren.length > oldChildren.length) {
          newChildren.slice(oldChildren.length).forEach(child => {
            mount(child, el)
          })
        } else if (newChildren.length < oldChildren.length) {
          oldChildren.slice(newChildren.length).forEach(child => {
            el.removeChild(child.el)
          })
        }
      }
    }
  } else {
    // 2.oldVNode tag unequal newVNode tag
  }
}