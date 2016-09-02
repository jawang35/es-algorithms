export default class OptimizedQueue {
  constructor(...items) {
    this.array = items
    this.head = 0
  }

  enqueue = item => {
    this.array.push(item)
  }

  dequeue = () => {
    if (this.head >= this.array.length) return undefined

    const item = this.array[this.head]

    this.array[this.head] = undefined
    this.head += 1

    if (this.array.length > 50 && this.head / this.array.length > 0.25) {
      this.array = this.array.slice(this.head)
      this.head = 0
    }

    return item
  }

  count = () => this.array.length - this.head

  isEmpty = () => !this.count()

  peek = () => this.array[this.head]
}
