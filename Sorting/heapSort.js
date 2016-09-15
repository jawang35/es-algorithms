import Heap from '../Heap'
import defaultCompare from './helpers/defaultCompare'

const heapSort = (items, compare) => {
  const sortedItems = new Array(items.length)
  const isOrderedBefore = (item1, item2) => compare(item1, item2) < 0
  const heap = new Heap(items, isOrderedBefore)

  for (let i = 0; i < items.length; i += 1) {
    const nextItem = heap.array[0]
    heap.array[0] = heap.array[items.length - 1 - i]
    heap.array[items.length - 1 - i] = nextItem
    sortedItems[i] = heap.array.pop()
    heap.shiftDown(0)
  }

  return sortedItems
}

export default (items, compare = defaultCompare) => {
  if (typeof items === 'string') return heapSort(items.split(''), compare)

  return heapSort(items, compare)
}
