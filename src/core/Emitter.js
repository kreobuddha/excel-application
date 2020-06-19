export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // dispatch, fire, trigger
  // уведомляем слушателей если они есть
  // 'focus', 'make-it-work' примеры event
  // table.emit('table-select', {a: 1})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // on, listen
  // подписываемся на уведомления
  // добавляем нового слушателя
  // formula.subscribe('table-select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event].filter(listener => {
        return listener !== fn
      })
    }
  }
}

// Example
// const emitter = new Emitter()

// const unsub = emitter.subscribe('rustam', data => console.log('Sub: ', data))

// emitter.emit('rustam', 42)

// setTimeout(() => {
//   emitter.emit('rustam', 'after 2 sec')
// }, 2000)

// setTimeout(() => {
//   unsub()
// }, 3000)

// setTimeout(() => {
//   emitter.emit('rustam', 'after 4 sec')
// }, 4000)
