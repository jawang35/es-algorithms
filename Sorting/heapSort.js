import Heap from '../Heap'
import defaultCompare from './helpers/defaultCompare'

const heapSort = (items, compare) => {
  const sortedItems = new Array(items.length)
  const isOrderedBefore = (item1, item2) => compare(item1, item2) < 0
  const heap = new Heap(items, isOrderedBefore)

  for (let i = 0; i < items.length; i += 1) {
    sortedItems[i] = heap.remove()
  }

  return sortedItems
}

export default (items, compare = defaultCompare) => {
  if (typeof items === 'string') return heapSort(items.split(''), compare)

  return heapSort(items, compare)
}
