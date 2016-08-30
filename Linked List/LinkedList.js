class Node {
  constructor(value) {
    this.value = value
  }
}

export default class LinkedList {
  constructor() {
    this.head = null
  }

  insert = (value, index = 0) => {
    if (index < 0) throw new Error('Index cannot be negative')

    let prev
    let next = this.head
    let i = index

    while (next && i > 0) {
      prev = next
      next = next.next
      i -= 1
    }

    if (i > 0) throw new Error('Index out of range')

    const newNode = new Node(value)

    if (prev) prev.next = newNode
    else this.head = newNode

    newNode.next = next
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

    if (!node) return null

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

  nodeAtIndex = index => {
    if (index < 0) throw new Error('Index cannot be negative')

    let node = this.head
    let i = index

    while (node && i > 0) {
      node = node.next
      i -= 1
    }

    return node
  }
}
