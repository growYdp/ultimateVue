// evolution
// --------
// 1.Base
/*
let activeEffect

class Dep {
  subscribers = new Set()
  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect)
    }
  }
  notify() {
    this.subscribers.forEach(effect => {
      effect()
    })
  }
}

function watchEffect(effect) {
  activeEffect = effect
  effect()
  activeEffect = null
}

const dep = new Dep()

watchEffect(() => {
  dep.depend()
  console.log('effect run')
})

dep.notify()
*/

// --------
// 2.arguments
/*
let activeEffect

class Dep {
  constructor(value) {
    this.value = value
    this.subscribers = new Set()
  }

  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect)
    }
  }

  notify() {
    this.subscribers.forEach(effect => {
      effect()
    })
  }
}

function watchEffect(effect) {
  activeEffect = effect
  effect()
  activeEffect = null
}

const dep = new Dep('growydp')

watchEffect(() => {
  dep.depend()
  console.log(dep.value)
})

dep.value = 'changed'
dep.notify()
*/

// --------
// 3.getter/setter
/*
let activeEffect

class Dep {
  constructor(value) {
    this._value = value
    this.subscribes = new Set()
  }
  get value() {
    this.depend()
    return this._value
  }
  set value(newValue) {
    this._value = newValue
    this.notify()
  }
  depend() {
    if (activeEffect) {
      this.subscribes.add(activeEffect)
    }
  }
  notify() {
    this.subscribes.forEach(effect => {
      effect()
    })
  }
}

function watchEffect(effect) {
  activeEffect = effect
  effect()
  activeEffect = null
}

const dep = new Dep('growydp')

watchEffect(() => {
  console.log(dep.value)
})

dep.value = 'changed'
*/

// --------
// 4.add reactive
let activeEffect

class Dep {
  subscribers = new Set()
  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect)
    }
  }
  notify() {
    this.subscribers.forEach(effect => {
      effect()
    })
  }
}

function reactive(raw) {
  Object.keys(raw).forEach(key => {
    const dep = new Dep()
    let value = raw[key]
    Object.defineProperty(raw, key, {
      get() {
        dep.depend()
        return value
      },
      set(newValue) {
        value = newValue
        dep.notify()
      }
    })
  })
  return raw
}

function watchEffect(effect) {
  activeEffect = effect
  effect()
  activeEffect = null
}

const state = reactive({
  count: 0
})

watchEffect(() => {
  console.log(state.count)
})

state.count = 1