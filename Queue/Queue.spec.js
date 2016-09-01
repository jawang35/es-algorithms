import { expect } from 'chai'
import Queue from './Queue'

describe('Queue', () => {
  it('can enqueue values to the end of the queue', () => {
    const queue = new Queue()
    expect(queue.enqueue('First Value')).to.be.undefined()
    expect(queue.array).to.deep.equal(['First Value'])

    expect(queue.enqueue('Second Value')).to.be.undefined()
    expect(queue.array).to.deep.equal(['First Value', 'Second Value'])

    expect(queue.enqueue('Third Value')).to.be.undefined()
    expect(queue.array).to.deep.equal(['First Value', 'Second Value', 'Third Value'])
  })

  it('can dequeue values from the beginning of the queue', () => {
    const queue = new Queue()
    queue.array = ['First Value', 'Second Value', 'Third Value']

    expect(queue.dequeue()).to.equal('First Value')
    expect(queue.array).to.deep.equal(['Second Value', 'Third Value'])

    expect(queue.dequeue()).to.equal('Second Value')
    expect(queue.array).to.deep.equal(['Third Value'])

    expect(queue.dequeue()).to.equal('Third Value')
    expect(queue.array).to.deep.equal([])

    expect(queue.dequeue()).to.be.undefined()
    expect(queue.array).to.deep.equal([])
  })

  it('can check if queue is empty', () => {
    const queue = new Queue()
    expect(queue.isEmpty()).to.be.true()

    queue.enqueue('Some Value')
    expect(queue.isEmpty()).to.be.false()
  })

  it('can peek at the first value of the queue', () => {
    const queue = new Queue()
    expect(queue.peek()).to.be.undefined()

    queue.array = ['First Value', 'Second Value', 'Third Value']
    expect(queue.peek()).to.equal('First Value')
  })
})
