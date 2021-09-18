import { h } from './mount.js'
import { reactive } from './dep.js'
import { createApp } from './app.js'

const App = {
  data: reactive({
    count: 0
  }),
  render() {
    return h('div',{
      class: 'pink',
      onClick: () => {
        this.data.count++
      }
    }, String(this.data.count))
  }
}

createApp(App, document.getElementById('app'))