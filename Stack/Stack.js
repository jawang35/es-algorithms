export default class Stack {
  constructor(...items) {
    this.array = items
  }

  isEmpty() {
    return !this.array.length
  }

  count() {
    return this.array.length
  }

  push(item) {
    this.array.push(item)
  }

  pop() {
    return this.array.pop()
  }

  peek() {
    return this.array[this.array.length - 1]
  }
}
