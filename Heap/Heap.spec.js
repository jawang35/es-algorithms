import { expect } from 'chai'
import deepFreeze from 'deep-freeze'
import Heap from './Heap'

describe('Heap', () => {
  it('can initialize with an array', () => {
    /*
            7              16
           / \            /  \
         5     16   =>   5    10
        / \    /        / \  /
       1   2  10       1  2  7
     */
    const array = deepFreeze([7, 5, 16, 1, 2, 10])
    const heap = new Heap(array)
    expect(heap.array).to.deep.equal([16, 5, 10, 1, 2, 7])
  })

  it('can initialize with a different priority function', () => {
    /* Min Heap
           1
          / \
         2   5
        / \
       10  7
     */
    const heap = new Heap([10, 7, 5, 2, 1], (value1, value2) => value1 < value2)
    expect(heap.array).to.deep.equal([1, 2, 5, 10, 7])

    expect(heap.insert(3)).to.be.undefined()
    expect(heap.array).to.deep.equal([1, 2, 3, 10, 7, 5])

    expect(heap.remove()).to.equal(1)
    expect(heap.array).to.deep.equal([2, 5, 3, 10, 7])

    expect(heap.replace.bind(heap, 3, 11)).to.throw('Cannot replace with lower priority value')
    expect(heap.array).to.deep.equal([2, 5, 3, 10, 7])
  })

  it('can shift up a node in the tree', () => {
    /*
           10
          /  \
         7    2
        / \  /
       5  1 16
     */
    const heap = new Heap()
    heap.array = [10, 7, 2, 5, 1, 16]

    expect(heap.shiftUp(5)).to.be.undefined()
    expect(heap.array).to.deep.equal([16, 7, 10, 5, 1, 2])

    expect(heap.shiftUp(1)).to.be.undefined()
    expect(heap.array).to.deep.equal([16, 7, 10, 5, 1, 2])

    expect(heap.shiftUp(0)).to.be.undefined()
    expect(heap.array).to.deep.equal([16, 7, 10, 5, 1, 2])

    expect(heap.shiftUp(6)).to.be.undefined()
    expect(heap.array).to.deep.equal([16, 7, 10, 5, 1, 2])
  })

  it('can shift down a node in the tree', () => {
    /*
           1
          / \
         7   2
        / \
       2   5
     */
    const heap = new Heap()
    heap.array = [1, 7, 2, 2, 5]

    expect(heap.shiftDown(0)).to.be.undefined()
    expect(heap.array).to.deep.equal([7, 5, 2, 2, 1])

    expect(heap.shiftDown(1)).to.be.undefined()
    expect(heap.array).to.deep.equal([7, 5, 2, 2, 1])

    expect(heap.shiftDown(4)).to.be.undefined()
    expect(heap.array).to.deep.equal([7, 5, 2, 2, 1])

    expect(heap.shiftDown(5)).to.be.undefined()
    expect(heap.array).to.deep.equal([7, 5, 2, 2, 1])
  })

  it('can insert a node while maintaining the heap property', () => {
    /*
           10
          /  \
         7    2
        / \
       5   1
     */
    const heap = new Heap([10, 7, 2, 5, 1])

    expect(heap.insert(16)).to.be.undefined()
    expect(heap.array).to.deep.equal([16, 7, 10, 5, 1, 2])

    expect(heap.insert(3)).to.be.undefined()
    expect(heap.array).to.deep.equal([16, 7, 10, 5, 1, 2, 3])

    expect(heap.insert(16)).to.be.undefined()
    expect(heap.array).to.deep.equal([16, 16, 10, 7, 1, 2, 3, 5])
  })

  it('can remove a node while maintaining the heap property', () => {
    /*
           10
          /  \
         7    2
        / \
       5   1
     */
    const heap = new Heap([10, 7, 2, 5, 1])

    expect(heap.remove()).to.equal(10)
    expect(heap.array).to.deep.equal([7, 5, 2, 1])

    expect(heap.remove()).to.equal(7)
    expect(heap.array).to.deep.equal([5, 1, 2])

    expect(heap.remove()).to.equal(5)
    expect(heap.array).to.deep.equal([2, 1])

    expect(heap.remove()).to.equal(2)
    expect(heap.array).to.deep.equal([1])

    expect(heap.remove()).to.equal(1)
    expect(heap.array).to.deep.equal([])

    expect(heap.remove()).be.undefined()
    expect(heap.array).to.deep.equal([])
  })

  it('can remove a node at a specific index while maintaining the heap property', () => {
    /*
           10
          /  \
         7    2
        / \
       5   1
     */
    const heap = new Heap([10, 7, 2, 5, 1])

    expect(heap.removeAt(1)).to.equal(7)
    expect(heap.array).to.deep.equal([10, 5, 2, 1])

    expect(heap.removeAt(2)).to.equal(2)
    expect(heap.array).to.deep.equal([10, 5, 1])

    expect(heap.removeAt(0)).to.equal(10)
    expect(heap.array).to.deep.equal([5, 1])

    expect(heap.removeAt(1)).to.equal(1)
    expect(heap.array).to.deep.equal([5])

    expect(heap.removeAt(0)).to.equal(5)
    expect(heap.array).to.deep.equal([])

    expect(heap.removeAt(1)).to.be.undefined()
    expect(heap.array).to.deep.equal([])
  })

  it('can replace a node with a value with higher priority', () => {
    /*
           10
          /  \
         7    2
        / \
       5   1
     */
    const heap = new Heap([10, 7, 2, 5, 1])
    expect(heap.replace(3, 8)).to.be.undefined()
    expect(heap.array).to.deep.equal([10, 8, 2, 7, 1])

    expect(heap.replace(1, 9)).to.be.undefined()
    expect(heap.array).to.deep.equal([10, 9, 2, 7, 1])

    expect(heap.replace(0, 11)).to.be.undefined()
    expect(heap.array).to.deep.equal([11, 9, 2, 7, 1])

    expect(heap.replace(5, 2)).to.be.undefined()
    expect(heap.array).to.deep.equal([11, 9, 2, 7, 1])

    expect(heap.replace.bind(heap, 3, 6)).to.throw('Cannot replace with lower priority value')
  })

  it('can peek at the top value of the tree', () => {
    /*
           10
          /  \
         7    2
        / \
       5   1
     */
    const heap = new Heap([10, 7, 2, 5, 1])
    expect(heap.peek()).to.equal(10)
    expect(heap.array).to.deep.equal([10, 7, 2, 5, 1])

    const emptyHeap = new Heap()
    expect(emptyHeap.peek()).to.be.undefined()
    expect(emptyHeap.array).to.deep.equal([])
  })

  it('can search for index of value in tree', () => {
    /*
           10
          /  \
         7    2
        / \
       5   1
     */
    const heap = new Heap([10, 7, 2, 5, 1])

    expect(heap.search(10)).to.equal(0)
    expect(heap.search(5)).to.equal(3)
    expect(heap.search(3)).to.be.undefined()
  })
})
