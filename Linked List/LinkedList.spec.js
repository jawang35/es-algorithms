import chai, { expect } from 'chai'
import dirtyChai from 'dirty-chai'
import LinkedList from './LinkedList'

chai.use(dirtyChai)

describe('LinkedList', () => {
  it('can insert a value at any nonnegative index', () => {
    const linkedList = new LinkedList()
    expect(linkedList.insert.bind(linkedList, 'Error', -1)).to.throw('Index cannot be negative')
    expect(linkedList.insert.bind(linkedList, 'Error', 1)).to.throw('Index out of range')
    expect(linkedList.head).to.be.null()

    linkedList.insert('First Node', 0)
    expect(linkedList.head.value).to.equal('First Node')

    linkedList.insert('Second Node', 0)
    expect(linkedList.head.value).to.equal('Second Node')
    expect(linkedList.head.next.value).to.equal('First Node')

    linkedList.insert('Third Node', 1)
    expect(linkedList.head.value).to.equal('Second Node')
    expect(linkedList.head.next.value).to.equal('Third Node')
    expect(linkedList.head.next.next.value).to.equal('First Node')

    linkedList.insert('Fourth Node', 1)
    expect(linkedList.head.value).to.equal('Second Node')
    expect(linkedList.head.next.value).to.equal('Fourth Node')
    expect(linkedList.head.next.next.value).to.equal('Third Node')
    expect(linkedList.head.next.next.next.value).to.equal('First Node')
  })

  it('inserts a value at the head by default', () => {
    const linkedList = new LinkedList()

    linkedList.insert('First Node')
    expect(linkedList.head.value).to.equal('First Node')

    linkedList.insert('Second Node')
    expect(linkedList.head.value).to.equal('Second Node')
    expect(linkedList.head.next.value).to.equal('First Node')

    linkedList.insert('Third Node')
    expect(linkedList.head.value).to.equal('Third Node')
    expect(linkedList.head.next.value).to.equal('Second Node')
    expect(linkedList.head.next.next.value).to.equal('First Node')
  })

  it('appends new values after the last node', () => {
    const linkedList = new LinkedList()

    linkedList.append('First Node')
    expect(linkedList.head.value).to.equal('First Node')
    expect(linkedList.head.next).to.be.undefined()

    linkedList.append('Second Node')
    expect(linkedList.head.value).to.equal('First Node')
    expect(linkedList.head.next.value).to.equal('Second Node')
    expect(linkedList.head.next.next).to.be.undefined()

    linkedList.append('Third Node')
    expect(linkedList.head.value).to.equal('First Node')
    expect(linkedList.head.next.value).to.equal('Second Node')
    expect(linkedList.head.next.next.value).to.equal('Third Node')
    expect(linkedList.head.next.next.next).to.be.undefined()
  })

  it('can find the last node', () => {
    const linkedList = new LinkedList()
    expect(linkedList.last()).to.be.null()

    linkedList.head = { value: 'First Node' }
    expect(linkedList.last()).to.equal(linkedList.head)

    linkedList.head.next = { value: 'Second Node' }
    expect(linkedList.last()).to.equal(linkedList.head.next)

    linkedList.head.next.next = { value: 'Third Node' }
    expect(linkedList.last()).to.equal(linkedList.head.next.next)
  })

  it('can count number of nodes', () => {
    const linkedList = new LinkedList()
    expect(linkedList.count()).to.equal(0)

    linkedList.head = { value: 'First Node' }
    expect(linkedList.count()).to.equal(1)

    linkedList.head.next = { value: 'Second Node' }
    expect(linkedList.count()).to.equal(2)

    linkedList.head.next.next = { value: 'Third Node' }
    expect(linkedList.count()).to.equal(3)
  })

  it('can retrieve a node at any nonnegative index', () => {
    const linkedList = new LinkedList()
    expect(linkedList.nodeAtIndex(0)).to.be.null()
    expect(linkedList.nodeAtIndex.bind(linkedList, -1)).to.throw('Index cannot be negative')

    linkedList.head = {
      value: 'First Node',
      next: {
        value: 'Second Node',
        next: {
          value: 'Third Node'
        }
      }
    }

    expect(linkedList.nodeAtIndex(0)).to.equal(linkedList.head)
    expect(linkedList.nodeAtIndex(1)).to.equal(linkedList.head.next)
    expect(linkedList.nodeAtIndex(2)).to.equal(linkedList.head.next.next)
    expect(linkedList.nodeAtIndex(3)).to.be.undefined()
  })
})
