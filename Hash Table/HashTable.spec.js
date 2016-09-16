import { expect } from 'chai'
import HashTable from './HashTable'

describe('Hash Table', () => {
  it('initializes with bucket capacity', () => {
    expect(new HashTable(73).buckets).to.have.length(73)
    expect(new HashTable(5).buckets).to.have.length(5)
    expect(() => new HashTable(-1)).to.throw('Invalid array length')
  })

  it('can initialize an array of entries', () => {
    const entries = [
      { key: 'California', value: 'Sacramento' },
      { key: 'Texas', value: 'Austin' },
      { key: 'Colorado', value: 'Denver' },
      { key: 'South Carolina', value: 'Columbia' },
    ]
    const hashTable = new HashTable(entries, 73)
    expect(hashTable.get('California')).to.equal('Sacramento')
    expect(hashTable.get('Texas')).to.equal('Austin')
    expect(hashTable.get('Colorado')).to.equal('Denver')
    expect(hashTable.get('South Carolina')).to.equal('Columbia')
  })

  it('can handle hash code collisions', () => {
    const entries = [
      { key: 'California', value: 'Sacramento' },
      { key: 'Texas', value: 'Austin' },
      { key: 'Colorado', value: 'Denver' },
      { key: 'South Carolina', value: 'Columbia' },
    ]
    const hashTable = new HashTable(entries, 2)
    expect(hashTable.get('California')).to.equal('Sacramento')
    expect(hashTable.get('Texas')).to.equal('Austin')
    expect(hashTable.get('Colorado')).to.equal('Denver')
    expect(hashTable.get('South Carolina')).to.equal('Columbia')
  })

  it('can hash a key into a bucket', () => {
    const hashTable = new HashTable(73)
    expect(hashTable.hash('')).to.equal(0)
    expect(hashTable.hash('foo bar')).to.be.within(0, 73)
    expect(hashTable.hash('bar foo')).to.be.within(0, 73)
    expect(hashTable.hash(37)).to.be.within(0, 73)
    expect(hashTable.hash(0)).to.be.within(0, 73)
    expect(hashTable.hash(-73)).to.be.within(0, 73)
  })

  it('can set or get an entry', () => {
    const hashTable = new HashTable(73)

    expect(hashTable.set('Texas', 'Austin')).to.be.undefined()
    expect(hashTable.set('Colorado', 'Denver')).to.be.undefined()
    expect(hashTable.set('South Carolina', 'Columbia')).to.be.undefined()

    expect(hashTable.set('California', 'Los Angeles')).to.be.undefined()
    expect(hashTable.get('California')).to.equal('Los Angeles')
    expect(hashTable.set('California', 'Sacramento')).to.be.undefined()

    expect(hashTable.count).to.equal(4)
    expect(hashTable.get('California')).to.equal('Sacramento')
    expect(hashTable.get('Texas')).to.equal('Austin')
    expect(hashTable.get('Colorado')).to.equal('Denver')
    expect(hashTable.get('South Carolina')).to.equal('Columbia')
  })

  it('can delete an entry', () => {
    const entries = [
      { key: 'California', value: 'Sacramento' },
      { key: 'Texas', value: 'Austin' },
      { key: 'Colorado', value: 'Denver' },
      { key: 'South Carolina', value: 'Columbia' },
    ]
    const hashTable = new HashTable(entries, 73)

    expect(hashTable.delete('Texas')).to.be.true()
    expect(hashTable.delete('South Carolina')).to.be.true()
    expect(hashTable.delete('Virginia')).to.be.false()

    expect(hashTable.count).to.equal(2)
    expect(hashTable.get('Texas')).to.be.undefined()
    expect(hashTable.get('South Carolina')).to.be.undefined()
    expect(hashTable.get('Virginia')).to.be.undefined()
    expect(hashTable.get('California')).to.equal('Sacramento')
    expect(hashTable.get('Colorado')).to.equal('Denver')
  })

  it('knows if it has an entry with a specific key', () => {
    const entries = [
      { key: 'California', value: 'Sacramento' },
      { key: 'Texas', value: 'Austin' },
      { key: 'Colorado', value: 'Denver' },
      { key: 'South Carolina', value: 'Columbia' },
    ]
    const hashTable = new HashTable(entries, 73)

    expect(hashTable.has('California')).to.be.true()
    expect(hashTable.has('Texas')).to.be.true()
    expect(hashTable.has('Colorado')).to.be.true()
    expect(hashTable.has('South Carolina')).to.be.true()
    expect(hashTable.has('Virginia')).to.be.false()
  })

  it('can get all entry keys', () => {
    const entries = [
      { key: 'California', value: 'Sacramento' },
      { key: 'Texas', value: 'Austin' },
      { key: 'Colorado', value: 'Denver' },
      { key: 'South Carolina', value: 'Columbia' },
    ]

    expect(new HashTable(entries, 73).keys()).to.deep.equal([
      'South Carolina',
      'Colorado',
      'Texas',
      'California',
    ])
    expect(new HashTable(73).keys()).to.deep.equal([])
  })

  it('can get all entry values', () => {
    const entries = [
      { key: 'California', value: 'Sacramento' },
      { key: 'Texas', value: 'Austin' },
      { key: 'Colorado', value: 'Denver' },
      { key: 'South Carolina', value: 'Columbia' },
    ]

    expect(new HashTable(entries, 73).values()).to.deep.equal([
      'Columbia',
      'Denver',
      'Austin',
      'Sacramento',
    ])
    expect(new HashTable(73).values()).to.deep.equal([])
  })

  it('can get all entries', () => {
    const entries = [
      { key: 'California', value: 'Sacramento' },
      { key: 'Texas', value: 'Austin' },
      { key: 'Colorado', value: 'Denver' },
      { key: 'South Carolina', value: 'Columbia' },
    ]

    expect(new HashTable(entries, 73).entries()).to.deep.equal([
      { key: 'South Carolina', value: 'Columbia' },
      { key: 'Colorado', value: 'Denver' },
      { key: 'Texas', value: 'Austin' },
      { key: 'California', value: 'Sacramento' },
    ])
    expect(new HashTable(73).entries()).to.deep.equal([])
  })
})
