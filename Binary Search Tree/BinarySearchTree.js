export default class BinarySearchTree {
  constructor(...args) {
    if (args.length === 1 && Array.isArray(args[0])) {
      this.arrayConstructor(args[0])
    } else {
      this.baseConstructor(...args)
    }
  }

  arrayConstructor(nodes) {
    const firstNode = nodes[0]
    this.key = firstNode.key
    this.value = firstNode.value

    for (const node of nodes.slice(1)) {
      this.insert(node.key, node.value)
    }
  }

  baseConstructor(key, value) {
    this.key = key
    this.value = value
  }

  toString() {
    if (this.key === undefined || this.key === null) return ''

    let string = this.key.toString()

    if (this.left) {
      string = `(${this.left.toString()}) <- ${string}`
    }

    if (this.right) {
      string = `${string} -> (${this.right.toString()})`
    }

    return string
  }

  isRoot() {
    return !this.parent
  }

  isLeaf() {
    return !this.left && !this.right
  }

  isLeftChild() {
    return this.parent ? this.parent.left === this : false
  }

  isRightChild() {
    return this.parent ? this.parent.right === this : false
  }

  hasLeftChild() {
    return !!this.left
  }

  hasRightChild() {
    return !!this.right
  }

  hasAnyChild() {
    return this.hasLeftChild() || this.hasRightChild()
  }

  count() {
    return 1 +
      (this.left ? this.left.count() : 0) +
      (this.right ? this.right.count() : 0)
  }

  height() {
    if (this.isLeaf()) return 0

    const leftHeight = this.left ? this.left.height() : 0
    const rightHeight = this.right ? this.right.height() : 0

    return 1 + Math.max(leftHeight, rightHeight)
  }

  minimum() {
    let node = this

    while (node.left) {
      node = node.left
    }

    return node
  }

  maximum() {
    let node = this

    while (node.right) {
      node = node.right
    }

    return node
  }

  insert(key, value) {
    if (this.key === undefined) {
      this.key = key
      this.value = value
    } else if (key < this.key) {
      if (this.left) {
        this.left.insert(key, value)
      } else {
        this.left = new BinarySearchTree(key, value)
        this.left.parent = this
      }
    } else if (key > this.key) {
      if (this.right) {
        this.right.insert(key, value)
      } else {
        this.right = new BinarySearchTree(key, value)
        this.right.parent = this
      }
    } else {
      throw new Error('Key already exists')
    }
  }

  remove(key) {
    const node = this.search(key)

    if (!node) return undefined

    const value = node.value
    const parent = node.parent

    if (node.left) {
      if (node.right) {
        const replacement = node.right.minimum()
        replacement.remove()
        node.key = replacement.key
        node.value = replacement.value
      } else {
        node.key = node.left.key
        node.value = node.left.value
        node.left = node.left.left
      }
    } else if (node.right) {
      node.key = node.right.key
      node.value = node.right.value
      node.right = node.right.right
    } else if (node.isLeftChild()) {
      delete parent.left
    } else if (node.isRightChild()) {
      delete parent.right
    } else {
      delete node.key
      delete node.value
    }

    return value
  }

  search(key) {
    if (key < this.key) {
      return this.left ? this.left.search(key) : undefined
    } else if (key > this.key) {
      return this.right ? this.right.search(key) : undefined
    }

    return this
  }

  traverse(process) {
    if (this.left) {
      this.left.traverse(process)
    }

    process(this)

    if (this.right) {
      this.right.traverse(process)
    }
  }
}
