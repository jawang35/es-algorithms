import { expect } from 'chai'
import deepFreeze from 'deep-freeze'
import bubbleSort from './bubbleSort'
import heapSort from './heapSort'
import insertionSort from './insertionSort'
import mergeSort from './mergeSort'
import quickSort from './quickSort'
import selectionSort from './selectionSort'

const sorts = new Map([
  ['Bubble Sort', bubbleSort],
  ['Heap Sort', heapSort],
  ['Insertion Sort', insertionSort],
  ['Merge Sort', mergeSort],
  ['Quick Sort', quickSort],
  ['Selection Sort', selectionSort],
])

describe('Sorting', () => {
  for (const sortType of sorts.keys()) {
    const sort = sorts.get(sortType)

    describe(sortType, () => {
      it('does nothing for an empty array', () => {
        expect(sort([])).to.deep.equal([])
      })

      it('sorts arrays of orderable items', () => {
        const numbers = deepFreeze([2, 3, 5, -1, 1.1, 3, 1.2, 2, 9, 1, 10, -3, 0])
        const strings = deepFreeze(['who', 'goes', 'there', '?'])
        const string = deepFreeze('Hello, World!')

        expect(sort(numbers)).to.deep.equal([-3, -1, 0, 1, 1.1, 1.2, 2, 2, 3, 3, 5, 9, 10])
        expect(sort(strings)).to.deep.equal(['?', 'goes', 'there', 'who'])
        expect(sort(string).join('')).to.equal(' !,HWdellloor')
      })

      if (sort !== heapSort) {
        it('can stable sort by a user defined compare function', () => {
          const items = deepFreeze([
            ['First', 5],
            ['Second', 2],
            ['Third', -1],
            ['Fourth', 3],
            ['Fifth', 2],
          ])
          const compare = (item1, item2) => item1[1] - item2[1]
          expect(sort(items, compare)).to.deep.equal([
            ['Third', -1],
            ['Second', 2],
            ['Fifth', 2],
            ['Fourth', 3],
            ['First', 5],
          ])
        })
      } else {
        it('can sort by a user defined compare function', () => {
          const items = deepFreeze([
            ['First', 5],
            ['Second', 2],
            ['Third', -1],
            ['Fourth', 3],
            ['Fifth', 2],
          ])
          const compare = (item1, item2) => item1[1] - item2[1]
          expect(sort(items, compare)).to.deep.equal([
            ['Third', -1],
            ['Fifth', 2],
            ['Second', 2],
            ['Fourth', 3],
            ['First', 5],
          ])
        })
      }
    })
  }
})
