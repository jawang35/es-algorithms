export default class Queue {
  constructor(...items) {
    this.array = items
  }

  enqueue(item) {
    this.array.push(item)
  }

  dequeue() {
    return this.array.shift()
  }

  count() {
    return this.array.length
  }

  isEmpty() {
    return !this.array.length
  }

  peek() {
    return this.array[0]
  }
}
