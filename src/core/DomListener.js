import {capitalize} from '@core/utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    // console.log(this.listeners)
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implemented in ${this.name} Component`
        )
      }
      // Привязываем функцию обработчик событий к контексту
      this[method] = this[method].bind(this)
      // То же что и addEventListener
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)

      // То же что и removeEventListener
      this.$root.off(listener, this[method])
      console.log(`${listener} in ${method} method is off`)
    })
  }
}

// input => onInput
const getMethodName = (eventName) => 'on' + capitalize(eventName)
