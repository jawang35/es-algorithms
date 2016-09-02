export default class Queue {
  constructor(...items) {
    this.array = items
  }

  enqueue = item => {
    this.array.push(item)
  }

  dequeue = () => this.array.shift()

  count = () => this.array.length

  isEmpty = () => !this.array.length

  peek = () => this.array[0]
}
