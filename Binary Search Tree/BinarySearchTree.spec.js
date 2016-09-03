import { expect } from 'chai'
import BinarySearchTree from './BinarySearchTree'

describe('BinarySearchTree', () => {
  it('initializes node from key, value', () => {
    const root = new BinarySearchTree(1, 2)
    expect(root).to.deep.equal({
      key: 1,
      value: 2
    })
    const child = new BinarySearchTree(2, 3)
    expect(child).to.deep.equal({
      key: 2,
      value: 3
    })
  })

  it('can initialize an empty tree', () => {
    const bst = new BinarySearchTree()
    expect(bst).to.deep.equal({
      key: undefined,
      value: undefined
    })
  })

  it('can initialize a full tree from an array of node definitions', () => {
    /*
         3
        / \
       2   5
          / \
         4   6
     */
    const bst = new BinarySearchTree([
      { key: 3, value: 'three' },
      { key: 2, value: 'two' },
      { key: 5, value: 'five' },
      { key: 4, value: 'four' },
      { key: 6, value: 'six' }
    ])
    expect(bst.key).to.equal(3)
    expect(bst.value).to.equal('three')
    expect(bst.left).to.be.ok()
    expect(bst.right).to.be.ok()

    expect(bst.left.key).to.equal(2)
    expect(bst.left.value).to.equal('two')
    expect(bst.left.left).to.be.undefined()
    expect(bst.left.right).to.be.undefined()

    expect(bst.right.key).to.equal(5)
    expect(bst.right.value).to.equal('five')
    expect(bst.right.left).to.be.ok()
    expect(bst.right.right).to.be.ok()

    expect(bst.right.left.key).to.equal(4)
    expect(bst.right.left.value).to.equal('four')

    expect(bst.right.right.key).to.equal(6)
    expect(bst.right.right.value).to.equal('six')
  })

  it('can display tree as a string', () => {
    /*
         3
        / \
       2   5
          / \
         4   6
     */
    const bst = new BinarySearchTree([
      { key: 3 },
      { key: 2 },
      { key: 5 },
      { key: 4 },
      { key: 6 }
    ])
    expect(bst.toString()).to.equal('(2) <- 3 -> ((4) <- 5 -> (6))')
  })

  it('knows if it is a root', () => {
    /*
         3
        / \
       2   5
          / \
         4   6
     */
    const bst = new BinarySearchTree([
      { key: 3 },
      { key: 2 },
      { key: 5 },
      { key: 4 },
      { key: 6 }
    ])
    expect(bst.isRoot()).to.be.true()
    expect(bst.left.isRoot()).to.be.false()
    expect(bst.right.isRoot()).to.be.false()
    expect(bst.right.left.isRoot()).to.be.false()
    expect(bst.right.right.isRoot()).to.be.false()
  })

  it('knows if it is a leaf', () => {
    /*
         3
        / \
       2   5
          / \
         4   6
     */
    const bst = new BinarySearchTree([
      { key: 3 },
      { key: 2 },
      { key: 5 },
      { key: 4 },
      { key: 6 }
    ])
    expect(bst.isLeaf()).to.be.false()
    expect(bst.left.isLeaf()).to.be.true()
    expect(bst.right.isLeaf()).to.be.false()
    expect(bst.right.left.isLeaf()).to.be.true()
    expect(bst.right.right.isLeaf()).to.be.true()
  })

  it('knows if it is a left child', () => {
    /*
         3
        / \
       2   5
          / \
         4   6
     */
    const bst = new BinarySearchTree([
      { key: 3 },
      { key: 2 },
      { key: 5 },
      { key: 4 },
      { key: 6 }
    ])
    expect(bst.isLeftChild()).to.be.false()
    expect(bst.left.isLeftChild()).to.be.true()
    expect(bst.right.isLeftChild()).to.be.false()
    expect(bst.right.left.isLeftChild()).to.be.true()
    expect(bst.right.right.isLeftChild()).to.be.false()
  })

  it('knows if it is a right child', () => {
    /*
           4
          / \
         2   5
        / \
       1   3
     */
    const bst = new BinarySearchTree([
      { key: 4 },
      { key: 2 },
      { key: 5 },
      { key: 1 },
      { key: 3 }
    ])
    expect(bst.isRightChild()).to.be.false()
    expect(bst.left.isRightChild()).to.be.false()
    expect(bst.left.left.isRightChild()).to.be.false()
    expect(bst.left.right.isRightChild()).to.be.true()
    expect(bst.right.isRightChild()).to.be.true()
  })

  it('knows if it has a left child', () => {
    /*
         3
        / \
       2   5
          /
         4
     */
    const bst = new BinarySearchTree([
      { key: 3 },
      { key: 5 },
      { key: 2 },
      { key: 4 }
    ])
    expect(bst.hasLeftChild()).to.be.true()
    expect(bst.left.hasLeftChild()).to.be.false()
    expect(bst.right.hasLeftChild()).to.be.true()
    expect(bst.right.left.hasLeftChild()).to.be.false()
  })

  it('knows if it has a right child', () => {
    /*
         4
        / \
       2   5
        \
         3
     */
    const bst = new BinarySearchTree([
      { key: 4 },
      { key: 2 },
      { key: 3 },
      { key: 5 }
    ])
    expect(bst.hasRightChild()).to.be.true()
    expect(bst.left.hasRightChild()).to.be.true()
    expect(bst.left.right.hasRightChild()).to.be.false()
    expect(bst.right.hasRightChild()).to.be.false()
  })

  it('knows if it has any child', () => {
    /*
           3
          / \
         2   4
        /     \
       1       5
     */
    const bst = new BinarySearchTree([
      { key: 3 },
      { key: 2 },
      { key: 4 },
      { key: 1 },
      { key: 5 }
    ])
    expect(bst.hasAnyChild()).to.be.true()
    expect(bst.left.hasAnyChild()).to.be.true()
    expect(bst.left.left.hasAnyChild()).to.be.false()
    expect(bst.right.hasAnyChild()).to.be.true()
    expect(bst.right.right.hasAnyChild()).to.be.false()
  })

  it('can count nodes in the tree', () => {
    /*
         3
        / \
       2   5
          / \
         4   6
     */
    const bst = new BinarySearchTree([
      { key: 3 },
      { key: 2 },
      { key: 5 },
      { key: 4 },
      { key: 6 }
    ])
    expect(bst.count()).to.equal(5)
  })

  it('knows its own height', () => {
    /*
         3
        / \
       2   5
          / \
         4   6
     */
    const bst = new BinarySearchTree([
      { key: 3 },
      { key: 2 },
      { key: 5 },
      { key: 4 },
      { key: 6 }
    ])
    expect(bst.height()).to.equal(3)
    expect(new BinarySearchTree().height()).to.equal(0)
  })

  it('can find its minimum', () => {
    /*
           4
          / \
         2   5
        / \
       1   3
     */
    const bst = new BinarySearchTree([
      { key: 4 },
      { key: 2 },
      { key: 5 },
      { key: 1 },
      { key: 3 }
    ])
    expect(bst.minimum().key).to.equal(1)
  })

  it('can find its maximum', () => {
    /*
         3
        / \
       2   5
          / \
         4   6
     */
    const bst = new BinarySearchTree([
      { key: 3 },
      { key: 2 },
      { key: 5 },
      { key: 4 },
      { key: 6 }
    ])
    expect(bst.maximum().key).to.equal(6)
  })

  it('can insert nodes while maintaining order', () => {
    /*
         3
        / \
       2   5
          / \
         4   6
     */
    const bst = new BinarySearchTree([
      { key: 3 },
      { key: 2 },
      { key: 5 },
      { key: 4 },
      { key: 6 }
    ])
    expect(bst.insert(1, 'one')).to.be.undefined()
    expect(bst.left.left.key).to.equal(1)
    expect(bst.left.left.value).to.equal('one')
    expect(bst.toString()).to.equal('((1) <- 2) <- 3 -> ((4) <- 5 -> (6))')

    expect(bst.insert(7, 'seven')).to.be.undefined()
    expect(bst.right.right.right.key).to.equal(7)
    expect(bst.right.right.right.value).to.equal('seven')
    expect(bst.toString()).to.equal('((1) <- 2) <- 3 -> ((4) <- 5 -> (6 -> (7)))')

    expect(bst.insert.bind(bst, 3, 'three')).to.throw('Key already exists')
  })

  it('can insert node into empty tree', () => {
    const bst = new BinarySearchTree()
    expect(bst.insert(5, 'five')).to.be.undefined()
    expect(bst).to.deep.equal({ key: 5, value: 'five' })
  })

  it('can remove nodes while maintaining order', () => {
    /*
         3
        / \
       2   5
          / \
         4   6
     */
    const bst = new BinarySearchTree([
      { key: 3, value: 'three' },
      { key: 2, value: 'two' },
      { key: 5, value: 'five' },
      { key: 4, value: 'four' },
      { key: 6, value: 'six' }
    ])
    expect(bst.remove(3)).to.equal('three')
    expect(bst.toString()).to.equal('(2) <- 4 -> (5 -> (6))')

    expect(bst.remove(5)).to.equal('five')
    expect(bst.toString()).to.equal('(2) <- 4 -> (6)')

    expect(bst.remove(2)).to.equal('two')
    expect(bst.toString()).to.equal('4 -> (6)')

    expect(bst.remove(4)).to.equal('four')
    expect(bst.toString()).to.equal('6')

    expect(bst.remove(6)).to.equal('six')
    expect(bst.toString()).to.equal('')
  })

  it('can search nodes for a key', () => {
    /*
         3
        / \
       2   5
          / \
         4   6
     */
    const bst = new BinarySearchTree([
      { key: 3, value: 'three' },
      { key: 2, value: 'two' },
      { key: 5, value: 'five' },
      { key: 4, value: 'four' },
      { key: 6, value: 'six' }
    ])
    expect(bst.search(3)).to.deep.equal(bst)
    expect(bst.search(2)).to.deep.equal(bst.left)
    expect(bst.search(5)).to.deep.equal(bst.right)
    expect(bst.search(4)).to.deep.equal(bst.right.left)
    expect(bst.search(6)).to.deep.equal(bst.right.right)
    expect(bst.search(1)).to.be.undefined()
    expect(bst.search(7)).to.be.undefined()
  })

  it('can traverse all nodes in order', () => {
    /*
         3
        / \
       2   5
          / \
         4   6
     */
    const bst = new BinarySearchTree([
      { key: 3, value: 'three' },
      { key: 2, value: 'two' },
      { key: 5, value: 'five' },
      { key: 4, value: 'four' },
      { key: 6, value: 'six' }
    ])
    const traversalResult = []
    const traversalProcess = ({ key, value }) =>
      traversalResult.push(`Key: ${key}; Value: ${value}`)
    expect(bst.traverse(traversalProcess)).to.be.undefined()
    expect(traversalResult).to.deep.equal([
      'Key: 2; Value: two',
      'Key: 3; Value: three',
      'Key: 4; Value: four',
      'Key: 5; Value: five',
      'Key: 6; Value: six'
    ])
  })
})
