import { expect } from 'chai'
import OptimizedQueue from './OptimizedQueue'

describe('OptimizedQueue', () => {
  it('initializes with constructor arguments', () => {
    const emptyQueue = new OptimizedQueue()
    expect(emptyQueue.array).to.deep.equal([])
    expect(emptyQueue.head).to.equal(0)

    const queue = new OptimizedQueue('First Item', 'Second Item', 'Third Item')
    expect(queue.array).to.deep.equal([
      'First Item',
      'Second Item',
      'Third Item'
    ])
    expect(queue.head).to.equal(0)
  })

  it('can enqueue items to the end of the queue', () => {
    const queue = new OptimizedQueue()
    expect(queue.enqueue('First Item')).to.be.undefined()
    expect(queue.array).to.deep.equal(['First Item'])
    expect(queue.head).to.equal(0)

    expect(queue.enqueue('Second Item')).to.be.undefined()
    expect(queue.array).to.deep.equal(['First Item', 'Second Item'])
    expect(queue.head).to.equal(0)

    expect(queue.enqueue('Third Item')).to.be.undefined()
    expect(queue.array).to.deep.equal(['First Item', 'Second Item', 'Third Item'])
    expect(queue.head).to.equal(0)
  })

  it('can dequeue items from the beginning of the queue without shifting items', () => {
    const queue = new OptimizedQueue('First Item', 'Second Item', 'Third Item')

    expect(queue.dequeue()).to.equal('First Item')
    expect(queue.array).to.deep.equal([undefined, 'Second Item', 'Third Item'])
    expect(queue.head).to.equal(1)

    expect(queue.dequeue()).to.equal('Second Item')
    expect(queue.array).to.deep.equal([undefined, undefined, 'Third Item'])
    expect(queue.head).to.equal(2)

    expect(queue.dequeue()).to.equal('Third Item')
    expect(queue.array).to.deep.equal([undefined, undefined, undefined])
    expect(queue.head).to.equal(3)

    expect(queue.dequeue()).to.be.undefined()
    expect(queue.array).to.deep.equal([undefined, undefined, undefined])
    expect(queue.head).to.equal(3)
  })

  it('will occasionally shift items when dequeueing', () => {
    const queue = new OptimizedQueue(...(new Array(51).fill('Repeating Item')))
    expect(queue.array.length).to.equal(51)
    expect(queue.head).to.equal(0)

    for (let i = 0; i < 12; i++) {
      expect(queue.dequeue()).to.equal('Repeating Item')
      expect(queue.array.length).to.equal(51)
      expect(queue.head).to.equal(i + 1)
    }

    expect(queue.dequeue()).to.equal('Repeating Item')
    expect(queue.array.length).to.equal(38)
    expect(queue.head).to.equal(0)

    for (let i = 0; i < 38; i++) {
      expect(queue.dequeue()).to.equal('Repeating Item')
      expect(queue.array.length).to.equal(38)
      expect(queue.head).to.equal(i + 1)
    }

    expect(queue.array.length).to.equal(38)
    expect(queue.head).to.equal(38)
  })

  it('can count items in queue', () => {
    const emptyQueue = new OptimizedQueue()
    expect(emptyQueue.count()).to.equal(0)

    const queue = new OptimizedQueue('First Item', 'Second Item', 'Third Item')
    expect(queue.count()).to.equal(3)
  })

  it('can check if queue is empty', () => {
    const queue = new OptimizedQueue()
    expect(queue.isEmpty()).to.be.true()

    queue.enqueue('Some Item')
    expect(queue.isEmpty()).to.be.false()
  })

  it('can peek at the first item of the queue', () => {
    const emptyQueue = new OptimizedQueue()
    expect(emptyQueue.peek()).to.be.undefined()

    const queue = new OptimizedQueue('First Item', 'Second Item', 'Third Item')
    expect(queue.peek()).to.equal('First Item')
  })
})
