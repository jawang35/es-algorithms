export default class Queue {
  constructor() {
    this.array = []
  }

  enqueue = value => {
    this.array.push(value)
  }

  dequeue = () => this.array.shift()

  isEmpty = () => !this.array.length

  peek = () => this.array[0]
}
