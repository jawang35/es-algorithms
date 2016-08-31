import chai, { expect } from 'chai'
import dirtyChai from 'dirty-chai'
import Stack from './Stack'

chai.use(dirtyChai)

describe('Stack', () => {
  it('can check if empty', () => {
    const stack = new Stack()
    expect(stack.isEmpty()).to.be.true()

    stack.push('New Item')
    expect(stack.isEmpty()).to.be.false()
  })

  it('can count number of items', () => {
    const stack = new Stack()
    expect(stack.count()).to.equal(0)

    stack.push('First Item')
    expect(stack.count()).to.equal(1)

    stack.push('Second Item')
    expect(stack.count()).to.equal(2)
  })

  it('can push new item onto top', () => {
    const stack = new Stack()
    expect(stack.array).to.deep.equal([])

    stack.push('First Item')
    expect(stack.array).to.deep.equal(['First Item'])

    stack.push('Second Item')
    expect(stack.array).to.deep.equal(['First Item', 'Second Item'])

    stack.push('Third Item')
    expect(stack.array).to.deep.equal(['First Item', 'Second Item', 'Third Item'])
  })

  it('can pop item off top', () => {
    const stack = new Stack()
    stack.push('First Item')
    stack.push('Second Item')
    stack.push('Third Item')
    expect(stack.array).to.deep.equal(['First Item', 'Second Item', 'Third Item'])

    expect(stack.pop()).to.equal('Third Item')
    expect(stack.array).to.deep.equal(['First Item', 'Second Item'])

    expect(stack.pop()).to.equal('Second Item')
    expect(stack.array).to.deep.equal(['First Item'])

    expect(stack.pop()).to.equal('First Item')
    expect(stack.array).to.deep.equal([])

    expect(stack.pop()).to.be.null()
    expect(stack.array).to.deep.equal([])
  })

  it('can peek at top item', () => {
    const stack = new Stack()
    expect(stack.peek()).to.be.null()

    stack.push('First Item')
    expect(stack.peek()).to.equal('First Item')

    stack.push('Second Item')
    expect(stack.peek()).to.equal('Second Item')

    stack.push('Third Item')
    expect(stack.peek()).to.equal('Third Item')
  })
})
