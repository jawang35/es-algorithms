import { expect } from 'chai'
import gcd from './gcd'

describe('GCD', () => {
  it('returns the GCD of two numbers', () => {
    expect(gcd(72, 42)).to.equal(6)
    expect(gcd(9, 45)).to.equal(9)
    expect(gcd(5, 1)).to.equal(1)
    expect(gcd(25, 5)).to.equal(5)
  })

  it('errors on a nonnegative', () => {
    expect(gcd.bind(null, 10, 0)).to.throw('GCD cannot be found on a nonnegative number')
    expect(gcd.bind(null, 0, 40)).to.throw('GCD cannot be found on a nonnegative number')
    expect(gcd.bind(null, 10, -1)).to.throw('GCD cannot be found on a nonnegative number')
    expect(gcd.bind(null, -4, 40)).to.throw('GCD cannot be found on a nonnegative number')
  })
})
