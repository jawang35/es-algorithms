import { expect } from 'chai'
import boyerMoore from './boyerMoore'
import bruteForce from './bruteForce'

const stringSearches = new Map([
  ['Boyer-Moore', boyerMoore],
  ['Brute Force', bruteForce],
])

describe('String Search', () => {
  for (const stringSearchType of stringSearches.keys()) {
    const stringSearch = stringSearches.get(stringSearchType)

    describe(stringSearchType, () => {
      it('gets the index of the start of the pattern in a string', () => {
        const emptyString = ''
        const string = 'how much wood could a wood chuck chuck'
        expect(stringSearch(emptyString, '')).to.equal(-1)
        expect(stringSearch(emptyString, 'test')).to.equal(-1)
        expect(stringSearch(string, '')).to.equal(-1)
        expect(stringSearch(string, 'how')).to.equal(0)
        expect(stringSearch(string, 'could')).to.equal(14)
        expect(stringSearch(string, 'a wood')).to.equal(20)
        expect(stringSearch(string, 'chuck')).to.equal(27)
        expect(stringSearch(string, 'would')).to.equal(-1)
      })
    })
  }
})
