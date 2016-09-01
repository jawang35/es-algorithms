export default class Stack {
  constructor(...values) {
    this.array = values
  }

  isEmpty = () => !this.array.length

  count = () => this.array.length

  push = value => {
    this.array.push(value)
  }

  pop = () => this.array.pop()

  peek = () => this.array[this.array.length - 1]
}
