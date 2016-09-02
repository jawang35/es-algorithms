export default class Stack {
  constructor(...items) {
    this.array = items
  }

  isEmpty = () => !this.array.length

  count = () => this.array.length

  push = item => {
    this.array.push(item)
  }

  pop = () => this.array.pop()

  peek = () => this.array[this.array.length - 1]
}
