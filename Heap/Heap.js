const parentIndexOf = index => Math.floor((index - 1) / 2)

const leftIndexOf = index => (2 * index) + 1

const rightIndexOf = index => (2 * index) + 2

const defaultIsOrderedBefore = (value1, value2) => value1 > value2

export default class Heap {
  constructor(...args) {
    if (Array.isArray(args[0])) {
      this.arrayConstructor(args[0], args[1])
    } else {
      this.baseConstructor(...args)
    }
  }

  baseConstructor(isOrderedBefore = defaultIsOrderedBefore) {
    this.isOrderedBefore = isOrderedBefore
    this.array = []
  }

  arrayConstructor(array, isOrderedBefore = defaultIsOrderedBefore) {
    this.isOrderedBefore = isOrderedBefore
    this.array = [...array]

    for (let i = Math.floor(this.array.length / 2) - 1; i >= 0; i -= 1) {
      this.shiftDown(i)
    }
  }

  shiftUp(index) {
    const child = this.array[index]

    if (child === undefined) return

    let childIndex = index
    let parentIndex = parentIndexOf(childIndex)

    while (childIndex > 0 && this.isOrderedBefore(child, this.array[parentIndex])) {
      this.array[childIndex] = this.array[parentIndex]
      childIndex = parentIndex
      parentIndex = parentIndexOf(childIndex)
    }

    this.array[childIndex] = child
  }

  shiftDown(index) {
    let parentIndex = index

    while (true) { // eslint-disable-line
      const leftIndex = leftIndexOf(parentIndex)
      const rightIndex = rightIndexOf(parentIndex)
      let first = parentIndex

      if (
        leftIndex < this.array.length &&
        this.isOrderedBefore(this.array[leftIndex], this.array[first])
      ) {
        first = leftIndex
      }
      if (
        rightIndex < this.array.length &&
        this.isOrderedBefore(this.array[rightIndex], this.array[first])
      ) {
        first = rightIndex
      }
      if (first === parentIndex) return

      const temp = this.array[parentIndex]
      this.array[parentIndex] = this.array[first]
      this.array[first] = temp
      parentIndex = first
    }
  }

  insert(value) {
    this.array.push(value)
    this.shiftUp(this.array.length - 1)
  }

  remove() {
    if (this.array.length <= 1) return this.array.pop()

    const value = this.array[0]
    const lastValue = this.array.pop()
    this.array[0] = lastValue
    this.shiftDown(0)
    return value
  }

  removeAt(index) {
    if (index === this.array.length - 1) return this.array.pop()

    const value = this.array[index]

    if (value === undefined || value === null) return undefined

    this.array[index] = this.array.pop()
    this.shiftDown(index)
    this.shiftUp(index)
    return value
  }

  replace(index, value) {
    if (index > this.array.length - 1) return
    if (this.isOrderedBefore(this.array[index], value)) {
      throw new Error('Cannot replace with lower priority value')
    }

    this.array[index] = value
    this.shiftUp(index)
  }

  peek() {
    return this.array[0]
  }

  search(value) {
    let index

    for (let i = 0; i < this.array.length; i += 1) {
      if (value === this.array[i]) index = i
    }

    return index
  }

  isEmpty() {
    return !this.array.length
  }

  count() {
    return this.array.length
  }
}
