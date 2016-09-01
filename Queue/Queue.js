export default class Queue {
  constructor(...values) {
    this.array = values
  }

  enqueue = value => {
    this.array.push(value)
  }

  dequeue = () => this.array.shift()

  isEmpty = () => !this.array.length

  peek = () => this.array[0]
}
