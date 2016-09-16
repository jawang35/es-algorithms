export default class HashTable {
  constructor(...args) {
    if (Array.isArray(args[0])) {
      this.arrayConstructor(args[0], args[1])
    } else {
      this.baseConstructor(...args)
    }
  }

  arrayConstructor(array, capacity) {
    this.baseConstructor(capacity)
    for (const { key, value } of array) {
      this.set(key, value)
    }
  }

  baseConstructor(capacity) {
    this.buckets = new Array(capacity)
    this.count = 0

    for (let i = 0; i < capacity; i += 1) {
      this.buckets[i] = []
    }
  }

  hash(key) {
    let result = 0
    const string = key.toString()

    for (let i = 0; i < string.length; i += 1) {
      const char = string.charCodeAt(i)
      result = ((result << 5) - result) + char // eslint-disable-line
      result = result & result // eslint-disable-line
    }

    return Math.abs(result) % this.buckets.length
  }

  set(key, value) {
    const bucketIndex = this.hash(key)
    const bucket = this.buckets[bucketIndex]

    const existingEntry = bucket.find(entry => entry.key === key)
    if (existingEntry) {
      existingEntry.value = value
    } else {
      bucket.push({ key, value })
      this.count += 1
    }
  }

  get(key) {
    const bucketIndex = this.hash(key)
    const bucket = this.buckets[bucketIndex]

    const foundEntry = bucket.find(entry => entry.key === key)
    if (foundEntry) return foundEntry.value
    return undefined
  }

  delete(key) {
    const bucketIndex = this.hash(key)
    const bucket = this.buckets[bucketIndex]

    for (let i = 0; i < bucket.length; i += 1) {
      const entry = bucket[i]

      if (entry.key === key) {
        bucket.splice(i, 1)
        this.count -= 1
        return true
      }
    }

    return false
  }

  has(key) {
    const bucketIndex = this.hash(key)
    const bucket = this.buckets[bucketIndex]
    return bucket.some(entry => entry.key === key)
  }

  keys() {
    const keys = []
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        keys.push(entry.key)
      }
    }
    return keys
  }

  values() {
    const values = []
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        values.push(entry.value)
      }
    }
    return values
  }

  entries() {
    const entries = []
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        entries.push(entry)
      }
    }
    return entries
  }
}
