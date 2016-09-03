import defaultCompare from './helpers/defaultCompare'

const merge = (leftItems, rightItems, compare) => {
  const sortedItems = new Array(leftItems.length + rightItems.length)
  let leftPosition = 0
  let rightPosition = 0

  for (let i = 0; i < sortedItems.length; i++) {
    if (leftPosition < leftItems.length && rightPosition < rightItems.length) {
      const leftItem = leftItems[leftPosition]
      const rightItem = rightItems[rightPosition]

      if (compare(leftItem, rightItem) <= 0) {
        sortedItems[i] = leftItem
        leftPosition += 1
      } else {
        sortedItems[i] = rightItem
        rightPosition += 1
      }
    } else if (leftPosition < leftItems.length) {
      sortedItems[i] = leftItems[leftPosition]
      leftPosition += 1
    } else if (rightPosition < rightItems.length) {
      sortedItems[i] = rightItems[rightPosition]
      rightPosition += 1
    }
  }

  return sortedItems
}

const mergeSort = (items, compare = defaultCompare) => {
  if (items.length <= 1) return items

  const middleIndex = Math.round(items.length / 2)
  const sortedLeft = mergeSort(items.slice(0, middleIndex), compare)
  const sortedRight = mergeSort(items.slice(middleIndex), compare)

  return merge(sortedLeft, sortedRight, compare)
}

export default mergeSort
