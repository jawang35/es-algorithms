class Node {
  constructor(value) {
    this.value = value
  }
}

const indexOutOfRange = 'Index out of range'

export default class LinkedList {
  toString = () => {
    let node = this.head
    let string = '['

    while (node) {
      string += node.value.toString()
      node = node.next
      if (node) string += ', '
    }

    return `${string}]`
  }

  nodeAtIndex = index => {
    if (index < 0) throw new Error(indexOutOfRange)

    let node = this.head
    let i = index

    while (node && i > 0) {
      node = node.next
      i -= 1
    }

    if (!node) throw new Error(indexOutOfRange)

    return node
  }

  nodesBeforeAndAt = index => {
    if (index < 0) throw new Error(indexOutOfRange)

    let before
    let node = this.head
    let i = index

    while (node && i > 0) {
      before = node
      node = node.next
      i -= 1
    }

    if (i > 0) throw new Error(indexOutOfRange)

    return {
      before,
      node
    }
  }

  insert = (value, index = 0) => {
    const { before, node } = this.nodesBeforeAndAt(index)

    const newNode = new Node(value)

    if (before) before.next = newNode
    else this.head = newNode

    newNode.next = node
  }

  append = value => {
    const newNode = new Node(value)
    const last = this.last()

    if (last) {
      last.next = newNode
    } else {
      this.head = newNode
    }
  }

  last = () => {
    let node = this.head

    if (!node) return undefined

    while (node.next) {
      node = node.next
    }

    return node
  }

  count = () => {
    let number = 0
    let node = this.head

    while (node) {
      number += 1
      node = node.next
    }

    return number
  }

  removeAll = () => {
    this.head = undefined
  }

  removeLast = () => {
    let node = this.head

    if (!node) return undefined

    if (node && !node.next) {
      this.head = undefined
      return node.value
    }

    while (node.next && node.next.next) {
      node = node.next
    }

    const value = node.next.value
    node.next = undefined
    return value
  }

  remove = (index = 0) => {
    const { before, node } = this.nodesBeforeAndAt(index)

    if (!node) throw new Error(indexOutOfRange)

    if (!before) this.head = node.next
    else before.next = node.next

    return node.value
  }

  reverse = () => {
    let node = this.head
    let before

    while (node) {
      const next = node.next
      node.next = before
      this.head = node
      before = node
      node = next
    }
  }

  map = transform => {
    const newList = new LinkedList()
    let node = this.head

    while (node) {
      newList.append(transform(node.value))
      node = node.next
    }

    return newList
  }

  filter = predicate => {
    const newList = new LinkedList()
    let node = this.head

    while (node) {
      if (predicate(node.value)) newList.append(node.value)
      node = node.next
    }

    return newList
  }
}
