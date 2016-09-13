import defaultCompare from './helpers/defaultCompare'

export default (items, compare = defaultCompare) => {
  const sortedItems = [...items]
  let sorted = false

  while (!sorted) {
    sorted = true

    for (let i = 0; i < sortedItems.length - 1; i += 1) {
      const currentItem = sortedItems[i]
      const nextItem = sortedItems[i + 1]

      if (compare(nextItem, currentItem) < 0) {
        sorted = false
        sortedItems[i] = nextItem
        sortedItems[i + 1] = currentItem
      }
    }
  }

  return sortedItems
}
