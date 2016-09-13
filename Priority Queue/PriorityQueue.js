import Heap from '../Heap'

export default class PriorityQueue {
  constructor(...args) {
    this.heap = new Heap(...args)
  }

  isEmpty() {
    return this.heap.isEmpty()
  }

  count() {
    return this.heap.count()
  }

  peek() {
    return this.heap.peek()
  }

  enqueue(value) {
    this.heap.insert(value)
  }

  dequeue() {
    return this.heap.remove()
  }

  changePriority(index, value) {
    return this.heap.replace(index, value)
  }
}
