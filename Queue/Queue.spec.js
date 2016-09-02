import { expect } from 'chai'
import Queue from './Queue'

describe('Queue', () => {
  it('initializes with constructor arguments', () => {
    expect(new Queue().array).to.deep.equal([])
    expect(new Queue('First Item', 'Second Item', 'Third Item').array).to.deep.equal([
      'First Item',
      'Second Item',
      'Third Item'
    ])
  })

  it('can enqueue items to the end of the queue', () => {
    const queue = new Queue()
    expect(queue.enqueue('First Item')).to.be.undefined()
    expect(queue.array).to.deep.equal(['First Item'])

    expect(queue.enqueue('Second Item')).to.be.undefined()
    expect(queue.array).to.deep.equal(['First Item', 'Second Item'])

    expect(queue.enqueue('Third Item')).to.be.undefined()
    expect(queue.array).to.deep.equal(['First Item', 'Second Item', 'Third Item'])
  })

  it('can dequeue items from the beginning of the queue', () => {
    const queue = new Queue('First Item', 'Second Item', 'Third Item')

    expect(queue.dequeue()).to.equal('First Item')
    expect(queue.array).to.deep.equal(['Second Item', 'Third Item'])

    expect(queue.dequeue()).to.equal('Second Item')
    expect(queue.array).to.deep.equal(['Third Item'])

    expect(queue.dequeue()).to.equal('Third Item')
    expect(queue.array).to.deep.equal([])

    expect(queue.dequeue()).to.be.undefined()
    expect(queue.array).to.deep.equal([])
  })

  it('can count items in queue', () => {
    const emptyQueue = new Queue()
    expect(emptyQueue.count()).to.equal(0)

    const queue = new Queue('First Item', 'Second Item', 'Third Item')
    expect(queue.count()).to.equal(3)
  })

  it('can check if queue is empty', () => {
    const queue = new Queue()
    expect(queue.isEmpty()).to.be.true()

    queue.enqueue('Some Item')
    expect(queue.isEmpty()).to.be.false()
  })

  it('can peek at the first item of the queue', () => {
    const emptyQueue = new Queue()
    expect(emptyQueue.peek()).to.be.undefined()

    const queue = new Queue('First Item', 'Second Item', 'Third Item')
    expect(queue.peek()).to.equal('First Item')
  })
})
