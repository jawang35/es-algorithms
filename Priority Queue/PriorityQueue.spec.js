import { expect } from 'chai'
import PriorityQueue from './PriorityQueue'

describe('Priority Queue', () => {
  it('knows if it is empty', () => {
    const emptyPriorityQueue = new PriorityQueue()
    const priorityQueue = new PriorityQueue([1])

    expect(emptyPriorityQueue.isEmpty()).to.be.true()
    expect(priorityQueue.isEmpty()).to.be.false()
  })

  it('can count items in the queue', () => {
    const emptyPriorityQueue = new PriorityQueue()
    const priorityQueue = new PriorityQueue([10, 7, 2, 5, 1])

    expect(emptyPriorityQueue.count()).to.equal(0)
    expect(priorityQueue.count()).to.equal(5)
  })

  it('can peek at the next item in the queue', () => {
    const emptyPriorityQueue = new PriorityQueue()
    const priorityQueue = new PriorityQueue([10, 7, 2, 5, 1])

    expect(emptyPriorityQueue.peek()).to.be.undefined()
    expect(priorityQueue.peek()).to.equal(10)
  })

  it('can enqueue an item maintaining priority', () => {
    const emptyPriorityQueue = new PriorityQueue()
    const priorityQueue = new PriorityQueue([10, 7, 2, 5, 1])

    expect(emptyPriorityQueue.enqueue(5)).to.be.undefined()
    expect(emptyPriorityQueue.heap.array).to.deep.equal([5])

    expect(priorityQueue.enqueue(11)).to.be.undefined()
    expect(priorityQueue.peek()).to.equal(11)

    expect(priorityQueue.enqueue(9)).to.be.undefined()
    expect(priorityQueue.peek()).to.equal(11)
  })

  it('can dequeue staged item and stage next item', () => {
    const emptyPriorityQueue = new PriorityQueue()
    const priorityQueue = new PriorityQueue([10, 7, 2, 5, 1])

    expect(emptyPriorityQueue.dequeue()).to.be.undefined()
    expect(emptyPriorityQueue.heap.array).to.deep.equal([])

    expect(priorityQueue.dequeue()).to.equal(10)
    expect(priorityQueue.dequeue()).to.equal(7)
    expect(priorityQueue.dequeue()).to.equal(5)
    expect(priorityQueue.dequeue()).to.equal(2)
    expect(priorityQueue.dequeue()).to.equal(1)
    expect(priorityQueue.heap.array).to.deep.equal([])
  })

  it('can increase the priority of an item', () => {
    const priorityQueue = new PriorityQueue([10, 7, 2, 5, 1])

    expect(priorityQueue.changePriority(3, 11)).to.be.undefined()
    expect(priorityQueue.heap.array).to.deep.equal([11, 10, 2, 7, 1])
  })
})
