export default class Set {
  constructor(items = []) {
    this.items = new Map()
    for (const item of items) {
      this.add(item)
    }
  }

  * [Symbol.iterator]() {
    for (const item of this.entries()) yield item
  }

  add(value) {
    this.items.set(value, true)
  }

  delete(value) {
    this.items.delete(value)
  }

  entries() {
    return Array.from(this.items.keys())
  }

  has(value) {
    return this.items.has(value)
  }

  union(otherSet) {
    const result = new Set()

    for (const item of [...this.entries(), ...otherSet.entries()]) {
      result.add(item)
    }

    return result
  }

  intersect(otherSet) {
    const result = new Set()

    for (const item of this.entries()) {
      if (otherSet.has(item)) result.add(item)
    }

    return result
  }

  difference(otherSet) {
    const result = new Set()

    for (const item of this.entries()) {
      if (!otherSet.has(item)) result.add(item)
    }

    return result
  }
}
