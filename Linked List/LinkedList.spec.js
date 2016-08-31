import chai, { expect } from 'chai'
import dirtyChai from 'dirty-chai'
import deepFreeze from 'deep-freeze'
import LinkedList from './LinkedList'

chai.use(dirtyChai)

describe('LinkedList', () => {
  const threeNodeList = () => ({
    value: 'First Node',
    next: {
      value: 'Second Node',
      next: {
        value: 'Third Node',
        next: null
      }
    }
  })
  const indexOutOfRange = 'Index out of range'

  it('can display list as string', () => {
    const linkedList = new LinkedList()
    expect(linkedList.toString()).to.equal('[]')

    linkedList.head = threeNodeList()
    expect(linkedList.toString()).to.equal('[First Node, Second Node, Third Node]')
  })

  it('can retrieve a node at any nonnegative index', () => {
    const linkedList = new LinkedList()
    expect(linkedList.nodeAtIndex.bind(linkedList, 0)).to.throw(indexOutOfRange)
    expect(linkedList.nodeAtIndex.bind(linkedList, -1)).to.throw(indexOutOfRange)

    linkedList.head = threeNodeList()

    expect(linkedList.nodeAtIndex(0)).to.equal(linkedList.head)
    expect(linkedList.nodeAtIndex(1)).to.equal(linkedList.head.next)
    expect(linkedList.nodeAtIndex(2)).to.equal(linkedList.head.next.next)
    expect(linkedList.nodeAtIndex.bind(linkedList, 3)).to.throw(indexOutOfRange)
  })

  it('can retrieve nodes before and at a nonnegative index', () => {
    const linkedList = new LinkedList()
    linkedList.head = threeNodeList()

    expect(linkedList.nodesBeforeAndAt(0)).to.deep.equal({
      before: null,
      node: linkedList.head
    })
    expect(linkedList.nodesBeforeAndAt(1)).to.deep.equal({
      before: linkedList.head,
      node: linkedList.head.next
    })
    expect(linkedList.nodesBeforeAndAt(2)).to.deep.equal({
      before: linkedList.head.next,
      node: linkedList.head.next.next
    })
    expect(linkedList.nodesBeforeAndAt(3)).to.deep.equal({
      before: linkedList.head.next.next,
      node: null
    })
    expect(linkedList.nodesBeforeAndAt.bind(linkedList, -1)).to.throw(indexOutOfRange)
    expect(linkedList.nodesBeforeAndAt.bind(linkedList, 4)).to.throw(indexOutOfRange)
  })

  it('can insert a value at any nonnegative index', () => {
    const linkedList = new LinkedList()
    expect(linkedList.insert.bind(linkedList, 'Error', -1)).to.throw(indexOutOfRange)
    expect(linkedList.insert.bind(linkedList, 'Error', 1)).to.throw(indexOutOfRange)
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
    expect(linkedList.head.next).to.be.null()

    linkedList.append('Second Node')
    expect(linkedList.head.value).to.equal('First Node')
    expect(linkedList.head.next.value).to.equal('Second Node')
    expect(linkedList.head.next.next).to.be.null()

    linkedList.append('Third Node')
    expect(linkedList.head.value).to.equal('First Node')
    expect(linkedList.head.next.value).to.equal('Second Node')
    expect(linkedList.head.next.next.value).to.equal('Third Node')
    expect(linkedList.head.next.next.next).to.be.null()
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

  it('can remove all nodes', () => {
    const linkedList = new LinkedList()
    linkedList.head = threeNodeList()
    linkedList.removeAll()
    expect(linkedList.head).to.be.null()
  })

  it('can remove last node', () => {
    const linkedList = new LinkedList()
    linkedList.head = threeNodeList()

    expect(linkedList.removeLast()).to.equal('Third Node')
    expect(linkedList.head).to.deep.equal({
      value: 'First Node',
      next: {
        value: 'Second Node',
        next: null
      }
    })

    expect(linkedList.removeLast()).to.equal('Second Node')
    expect(linkedList.head).to.deep.equal({
      value: 'First Node',
      next: null
    })

    expect(linkedList.removeLast()).to.equal('First Node')
    expect(linkedList.head).to.be.null()

    expect(linkedList.removeLast()).to.be.null()
    expect(linkedList.head).to.be.null()
  })

  it('can remove nodes at a nonnegative index', () => {
    const linkedList = new LinkedList()
    linkedList.head = threeNodeList()

    expect(linkedList.remove.bind(linkedList, -1)).to.throw(indexOutOfRange)
    expect(linkedList.remove.bind(linkedList, 3)).to.throw(indexOutOfRange)

    expect(linkedList.remove(1)).to.equal('Second Node')
    expect(linkedList.head.value).to.equal('First Node')
    expect(linkedList.head.next.value).to.equal('Third Node')
    expect(linkedList.head.next.next).to.be.null()

    expect(linkedList.remove(1)).to.equal('Third Node')
    expect(linkedList.head.value).to.equal('First Node')
    expect(linkedList.head.next).to.be.null()

    expect(linkedList.remove(0)).to.equal('First Node')
    expect(linkedList.head).to.be.null()
  })

  it('removes the head node by default', () => {
    const linkedList = new LinkedList()
    linkedList.head = threeNodeList()

    expect(linkedList.remove()).to.equal('First Node')
    expect(linkedList.head.value).to.equal('Second Node')
    expect(linkedList.head.next.value).to.equal('Third Node')
    expect(linkedList.head.next.next).to.be.null()

    expect(linkedList.remove()).to.equal('Second Node')
    expect(linkedList.head.value).to.equal('Third Node')
    expect(linkedList.head.next).to.be.null()

    expect(linkedList.remove()).to.equal('Third Node')
    expect(linkedList.head).to.be.null()
  })

  it('can reverse its nodes', () => {
    const linkedList = new LinkedList()

    linkedList.reverse()
    expect(linkedList.head).to.be.null()

    linkedList.head = threeNodeList()
    linkedList.reverse()
    expect(linkedList.head.value).to.equal('Third Node')
    expect(linkedList.head.next.value).to.equal('Second Node')
    expect(linkedList.head.next.next.value).to.equal('First Node')

    linkedList.reverse()
    expect(linkedList.head.value).to.equal('First Node')
    expect(linkedList.head.next.value).to.equal('Second Node')
    expect(linkedList.head.next.next.value).to.equal('Third Node')
  })

  it('can map node values without mutating original list', () => {
    const linkedList = new LinkedList()

    const mappedLinkedList1 = linkedList.map(() => true)
    expect(mappedLinkedList1.head).to.be.null()

    linkedList.head = threeNodeList()
    deepFreeze(linkedList)

    const mappedLinkedList2 = linkedList.map(value => value.toUpperCase())
    expect(mappedLinkedList2.head.value).to.equal('FIRST NODE')
    expect(mappedLinkedList2.head.next.value).to.equal('SECOND NODE')
    expect(mappedLinkedList2.head.next.next.value).to.equal('THIRD NODE')

    const mappedLinkedList3 = linkedList.map(value => value.length)
    expect(mappedLinkedList3.head.value).to.equal(10)
    expect(mappedLinkedList3.head.next.value).to.equal(11)
    expect(mappedLinkedList3.head.next.next.value).to.equal(10)
  })

  it('can filter node values without mutating original list', () => {
    const linkedList = new LinkedList()

    const filteredLinkedList1 = linkedList.filter(() => true)
    expect(filteredLinkedList1.head).to.be.null()

    linkedList.head = threeNodeList()
    deepFreeze(linkedList)

    const filteredLinkedList2 = linkedList.filter(value => value.indexOf('i') > -1)
    expect(filteredLinkedList2.head.value).to.equal('First Node')
    expect(filteredLinkedList2.head.next.value).to.equal('Third Node')
    expect(filteredLinkedList2.head.next.next).to.be.null()

    const filteredLinkedList3 = linkedList.filter(() => true)
    expect(filteredLinkedList3.head).to.deep.equal(linkedList.head)
  })
})
