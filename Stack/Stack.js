export default class Stack {
  constructor() {
    this.array = []
  }

  isEmpty = () => !this.array.length

  count = () => this.array.length

  push = value => {
    this.array.push(value)
  }

  pop = () => this.array.pop() || null

  peek = () => this.array[this.array.length - 1] || null
}
