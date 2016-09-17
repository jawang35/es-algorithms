import { expect } from 'chai'
import Set from './Set'

describe('Set', () => {
  it('can initialize from an array of items', () => {
    const set = new Set('how much wood could a wood chuck chuck'.split(' '))
    expect(Array.from(set.items.keys())).to.deep.equal('how much wood could a chuck'.split(' '))
  })

  it('can iterate through set items', () => {
    const set = new Set([2, 1, 2, 3, 4, 5, 4])
    const items = []

    for (const item of set) {
      items.push(item)
    }

    expect(items).to.deep.equal([2, 1, 3, 4, 5])
  })

  it('can add unique items to the set', () => {
    const set = new Set()
    const someObject = {}
    const anotherObject = {}

    expect(set.add(1)).to.be.undefined()
    expect(set.add('one')).to.be.undefined()
    expect(set.add(someObject)).to.be.undefined()
    expect(set.add(anotherObject)).to.be.undefined()
    expect(set.add(1)).to.be.undefined()
    expect(set.add('one')).to.be.undefined()
    expect(set.add(someObject)).to.be.undefined()
    expect(set.add(anotherObject)).to.be.undefined()

    const items = Array.from(set.items.keys())
    expect(items[0]).to.equal(1)
    expect(items[1]).to.equal('one')
    expect(items[2]).to.equal(someObject)
    expect(items[3]).to.equal(anotherObject)
  })

  it('can delete items from set', () => {
    const someObject = {}
    const set = new Set([1, 'one', someObject])

    expect(set.delete(1)).to.be.undefined()
    expect(set.delete(someObject)).to.be.undefined()
    expect(set.delete('two')).to.be.undefined()

    expect(Array.from(set.items.keys())).to.deep.equal(['one'])
  })

  it('can get array of entries', () => {
    const set = new Set('hello world!')
    expect(set.entries().join('')).to.equal('helo wrd!')
    expect(new Set().entries()).to.deep.equal([])
  })

  it('knows if it has an item', () => {
    const set = new Set([2, 3, 1, 3, 5, 2])
    expect(set.has(0)).to.be.false()
    expect(set.has(1)).to.be.true()
    expect(set.has(2)).to.be.true()
    expect(set.has(3)).to.be.true()
    expect(set.has(4)).to.be.false()
    expect(set.has(5)).to.be.true()
  })

  it('can union with another set', () => {
    const firstSet = new Set('race car')
    const secondSet = new Set('taco cat')
    const union = firstSet.union(secondSet)
    expect(Array.from(union.items.keys()).join('')).to.equal('race to')
  })

  it('can intersect with another set', () => {
    const firstSet = new Set('race car')
    const secondSet = new Set('taco cat')
    const intersection = firstSet.intersect(secondSet)
    expect(Array.from(intersection.items.keys()).join('')).to.equal('ac ')
  })

  it('can find the difference with another set', () => {
    const firstSet = new Set('race car')
    const secondSet = new Set('taco cat')
    const difference = firstSet.difference(secondSet)
    expect(Array.from(difference.items.keys()).join('')).to.equal('re')
  })
})
