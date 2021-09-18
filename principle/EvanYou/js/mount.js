/**
 * use h create vnode
 * @param {string} tag 
 * @param {object} props 
 * @param {string|array} children 
 * @returns 
 */
export function h(tag, props, children) {
  return {
    tag,
    props,
    children
  }
}

/**
 * turn virtual Dom into DOM
 * @param {object} vnode 
 * @param {object} container 
 */
export function mount(vnode, container) {
  // 1.create vnode element
  const el = vnode.el = document.createElement(vnode.tag)
  // 2.handle vnode props
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key]
      if (key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLocaleLowerCase(), value)
      } else {
        el.setAttribute(key, value)
      }
    }
  }
  // 3.handle children
  if (vnode.children) {
    const children = vnode.children
    if (typeof children === 'string') {
      // 3.1 type of children is string
      el.textContent = children 
    } else {
      // 3.2 typeof children is array
      children.forEach(child => {
        mount(child, el)
      })
    }
  }
  // 4.append el
  container.appendChild(el)
}
