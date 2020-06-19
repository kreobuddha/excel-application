import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []

    this.prepare()
  }

  // настраиваем наш компонент до init()
  prepare() {}

  // возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // уведомляем слушателей про события event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  // инициализируем компонент, добавляем дом слушатели
  init() {
    this.initDOMListeners()
  }

  // удаляем компонент, чистим дом слушатели
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsubs => unsubs())
  }
}
