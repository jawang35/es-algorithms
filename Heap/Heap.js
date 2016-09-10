const parentIndexOf = index => Math.floor((index - 1) / 2)

const leftIndexOf = index => (2 * index) + 1

const rightIndexOf = index => (2 * index) + 2

export default class Heap {
  constructor(array) {
    this.array = array ? [...array] : []

    if (array) {
      for (let i = (array.length / 2) - 1; i >= 0; i--) {
        this.shiftDown(i)
      }
    }
  }

  shiftUp(index) {
    const child = this.array[index]

    if (child === undefined) return

    let childIndex = index
    let parentIndex = parentIndexOf(childIndex)

    while (childIndex > 0 && child > this.array[parentIndex]) {
      this.array[childIndex] = this.array[parentIndex]
      childIndex = parentIndex
      parentIndex = parentIndexOf(childIndex)
    }

    this.array[childIndex] = child
  }

  shiftDown(index) {
    const parent = this.array[index]

    if (parent === undefined) return

    let parentIndex = index
    let leftIndex = leftIndexOf(parentIndex)
    let rightIndex = rightIndexOf(parentIndex)

    while (parent < this.array[leftIndex] || parent < this.array[rightIndex]) {
      if (this.array[leftIndex] < this.array[rightIndex]) {
        this.array[parentIndex] = this.array[rightIndex]
        parentIndex = rightIndex
        leftIndex = leftIndexOf(parentIndex)
        rightIndex = rightIndexOf(parentIndex)
      } else {
        this.array[parentIndex] = this.array[leftIndex]
        parentIndex = leftIndex
        leftIndex = leftIndexOf(parentIndex)
        rightIndex = rightIndexOf(parentIndex)
      }
    }

    this.array[parentIndex] = parent
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
    if (value < this.array[index]) throw new Error('Cannot replace with smaller value')

    this.array[index] = value
    this.shiftUp(index)
  }

  peek() {
    return this.array[0]
  }

  search(value) {
    let index

    for (let i = 0; i < this.array.length; i++) {
      if (value === this.array[i]) index = i
    }

    return index
  }
}
