import { expect } from 'chai'
import deepFreeze from 'deep-freeze'
import LinkedList from './LinkedList'

describe('LinkedList', () => {
  const createThreeNodeList = () => new LinkedList('First Node', 'Second Node', 'Third Node')
  const indexOutOfRange = 'Index out of range'

  it('initializes with constructor arguments', () => {
    expect(new LinkedList().head).to.be.undefined()
    expect(createThreeNodeList().head).to.deep.equal({
      value: 'First Node',
      next: {
        value: 'Second Node',
        next: {
          value: 'Third Node'
        }
      }
    })
  })

  it('can display list as string', () => {
    const emptyList = new LinkedList()
    expect(emptyList.toString()).to.equal('[]')

    const threeNodeList = createThreeNodeList()
    expect(threeNodeList.toString()).to.equal('[First Node, Second Node, Third Node]')
  })

  it('can retrieve a node at any nonnegative index', () => {
    const emptyList = new LinkedList()
    expect(emptyList.nodeAtIndex.bind(emptyList, 0)).to.throw(indexOutOfRange)
    expect(emptyList.nodeAtIndex.bind(emptyList, -1)).to.throw(indexOutOfRange)

    const threeNodeList = createThreeNodeList()
    expect(threeNodeList.nodeAtIndex(0)).to.equal(threeNodeList.head)
    expect(threeNodeList.nodeAtIndex(1)).to.equal(threeNodeList.head.next)
    expect(threeNodeList.nodeAtIndex(2)).to.equal(threeNodeList.head.next.next)
    expect(threeNodeList.nodeAtIndex.bind(threeNodeList, 3)).to.throw(indexOutOfRange)
  })

  it('can retrieve nodes before and at a nonnegative index', () => {
    const threeNodeList = createThreeNodeList()
    expect(threeNodeList.nodesBeforeAndAt(0)).to.deep.equal({
      before: undefined,
      node: threeNodeList.head
    })
    expect(threeNodeList.nodesBeforeAndAt(1)).to.deep.equal({
      before: threeNodeList.head,
      node: threeNodeList.head.next
    })
    expect(threeNodeList.nodesBeforeAndAt(2)).to.deep.equal({
      before: threeNodeList.head.next,
      node: threeNodeList.head.next.next
    })
    expect(threeNodeList.nodesBeforeAndAt(3)).to.deep.equal({
      before: threeNodeList.head.next.next,
      node: undefined
    })
    expect(threeNodeList.nodesBeforeAndAt.bind(threeNodeList, -1)).to.throw(indexOutOfRange)
    expect(threeNodeList.nodesBeforeAndAt.bind(threeNodeList, 4)).to.throw(indexOutOfRange)
  })

  it('can insert a value at any nonnegative index', () => {
    const linkedList = new LinkedList()
    expect(linkedList.insert.bind(linkedList, 'Error', -1)).to.throw(indexOutOfRange)
    expect(linkedList.insert.bind(linkedList, 'Error', 1)).to.throw(indexOutOfRange)
    expect(linkedList.head).to.be.undefined()

    expect(linkedList.insert('First Node', 0)).to.be.undefined()
    expect(linkedList.head.value).to.equal('First Node')

    expect(linkedList.insert('Second Node', 0)).to.be.undefined()
    expect(linkedList.head.value).to.equal('Second Node')
    expect(linkedList.head.next.value).to.equal('First Node')

    expect(linkedList.insert('Third Node', 1)).to.be.undefined()
    expect(linkedList.head.value).to.equal('Second Node')
    expect(linkedList.head.next.value).to.equal('Third Node')
    expect(linkedList.head.next.next.value).to.equal('First Node')

    expect(linkedList.insert('Fourth Node', 1)).to.be.undefined()
    expect(linkedList.head.value).to.equal('Second Node')
    expect(linkedList.head.next.value).to.equal('Fourth Node')
    expect(linkedList.head.next.next.value).to.equal('Third Node')
    expect(linkedList.head.next.next.next.value).to.equal('First Node')
  })

  it('inserts a value at the head by default', () => {
    const linkedList = new LinkedList()

    expect(linkedList.insert('First Node')).to.be.undefined()
    expect(linkedList.head.value).to.equal('First Node')

    expect(linkedList.insert('Second Node')).to.be.undefined()
    expect(linkedList.head.value).to.equal('Second Node')
    expect(linkedList.head.next.value).to.equal('First Node')

    expect(linkedList.insert('Third Node')).to.be.undefined()
    expect(linkedList.head.value).to.equal('Third Node')
    expect(linkedList.head.next.value).to.equal('Second Node')
    expect(linkedList.head.next.next.value).to.equal('First Node')
  })

  it('appends new values after the last node', () => {
    const linkedList = new LinkedList()

    expect(linkedList.append('First Node')).to.be.undefined()
    expect(linkedList.head.value).to.equal('First Node')
    expect(linkedList.head.next).to.be.undefined()

    expect(linkedList.append('Second Node')).to.be.undefined()
    expect(linkedList.head.value).to.equal('First Node')
    expect(linkedList.head.next.value).to.equal('Second Node')
    expect(linkedList.head.next.next).to.be.undefined()

    expect(linkedList.append('Third Node')).to.be.undefined()
    expect(linkedList.head.value).to.equal('First Node')
    expect(linkedList.head.next.value).to.equal('Second Node')
    expect(linkedList.head.next.next.value).to.equal('Third Node')
    expect(linkedList.head.next.next.next).to.be.undefined()
  })

  it('can find the last node', () => {
    const linkedList = new LinkedList()
    expect(linkedList.last()).to.be.undefined()

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
    const threeNodeList = createThreeNodeList()
    expect(threeNodeList.removeAll()).to.be.undefined()
    expect(threeNodeList.head).to.be.undefined()
  })

  it('can remove last node', () => {
    const threeNodeList = createThreeNodeList()

    expect(threeNodeList.removeLast()).to.equal('Third Node')
    expect(threeNodeList.head).to.deep.equal({
      value: 'First Node',
      next: {
        value: 'Second Node',
        next: undefined
      }
    })

    expect(threeNodeList.removeLast()).to.equal('Second Node')
    expect(threeNodeList.head).to.deep.equal({
      value: 'First Node',
      next: undefined
    })

    expect(threeNodeList.removeLast()).to.equal('First Node')
    expect(threeNodeList.head).to.be.undefined()

    expect(threeNodeList.removeLast()).to.be.undefined()
    expect(threeNodeList.head).to.be.undefined()
  })

  it('can remove nodes at a nonnegative index', () => {
    const threeNodeList = createThreeNodeList()

    expect(threeNodeList.remove.bind(threeNodeList, -1)).to.throw(indexOutOfRange)
    expect(threeNodeList.remove.bind(threeNodeList, 3)).to.throw(indexOutOfRange)

    expect(threeNodeList.remove(1)).to.equal('Second Node')
    expect(threeNodeList.head.value).to.equal('First Node')
    expect(threeNodeList.head.next.value).to.equal('Third Node')
    expect(threeNodeList.head.next.next).to.be.undefined()

    expect(threeNodeList.remove(1)).to.equal('Third Node')
    expect(threeNodeList.head.value).to.equal('First Node')
    expect(threeNodeList.head.next).to.be.undefined()

    expect(threeNodeList.remove(0)).to.equal('First Node')
    expect(threeNodeList.head).to.be.undefined()
  })

  it('removes the head node by default', () => {
    const threeNodeList = createThreeNodeList()

    expect(threeNodeList.remove()).to.equal('First Node')
    expect(threeNodeList.head.value).to.equal('Second Node')
    expect(threeNodeList.head.next.value).to.equal('Third Node')
    expect(threeNodeList.head.next.next).to.be.undefined()

    expect(threeNodeList.remove()).to.equal('Second Node')
    expect(threeNodeList.head.value).to.equal('Third Node')
    expect(threeNodeList.head.next).to.be.undefined()

    expect(threeNodeList.remove()).to.equal('Third Node')
    expect(threeNodeList.head).to.be.undefined()
  })

  it('can reverse its nodes', () => {
    const emptyList = new LinkedList()

    emptyList.reverse()
    expect(emptyList.head).to.be.undefined()

    const threeNodeList = createThreeNodeList()
    expect(threeNodeList.reverse()).to.be.undefined()
    expect(threeNodeList.head.value).to.equal('Third Node')
    expect(threeNodeList.head.next.value).to.equal('Second Node')
    expect(threeNodeList.head.next.next.value).to.equal('First Node')

    expect(threeNodeList.reverse()).to.be.undefined()
    expect(threeNodeList.head.value).to.equal('First Node')
    expect(threeNodeList.head.next.value).to.equal('Second Node')
    expect(threeNodeList.head.next.next.value).to.equal('Third Node')
  })

  it('can map node values without mutating original list', () => {
    const emptyList = new LinkedList()

    const mappedLinkedList1 = emptyList.map(() => true)
    expect(mappedLinkedList1.head).to.be.undefined()

    const threeNodeList = deepFreeze(createThreeNodeList())

    const mappedLinkedList2 = threeNodeList.map(value => value.toUpperCase())
    expect(mappedLinkedList2.head.value).to.equal('FIRST NODE')
    expect(mappedLinkedList2.head.next.value).to.equal('SECOND NODE')
    expect(mappedLinkedList2.head.next.next.value).to.equal('THIRD NODE')

    const mappedLinkedList3 = threeNodeList.map(value => value.length)
    expect(mappedLinkedList3.head.value).to.equal(10)
    expect(mappedLinkedList3.head.next.value).to.equal(11)
    expect(mappedLinkedList3.head.next.next.value).to.equal(10)
  })

  it('can filter node values without mutating original list', () => {
    const emptyList = new LinkedList()

    const filteredLinkedList1 = emptyList.filter(() => true)
    expect(filteredLinkedList1.head).to.be.undefined()

    const threeNodeList = deepFreeze(createThreeNodeList())

    const filteredLinkedList2 = threeNodeList.filter(value => value.indexOf('i') > -1)
    expect(filteredLinkedList2.head.value).to.equal('First Node')
    expect(filteredLinkedList2.head.next.value).to.equal('Third Node')
    expect(filteredLinkedList2.head.next.next).to.be.undefined()

    const filteredLinkedList3 = threeNodeList.filter(() => true)
    expect(filteredLinkedList3.head).to.deep.equal(threeNodeList.head)
  })
})
