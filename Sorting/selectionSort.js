import defaultCompare from './helpers/defaultCompare'

export default (items, compare = defaultCompare) => {
  const sortedItems = [...items]

  for (let i = 0; i < sortedItems.length; i++) {
    let smallestItemPosition = i

    for (let j = i + 1; j < sortedItems.length; j++) {
      if (compare(sortedItems[j], sortedItems[smallestItemPosition]) < 0) {
        smallestItemPosition = j
      }
    }

    const currentItem = sortedItems[i]
    const smallestItem = sortedItems[smallestItemPosition]
    sortedItems[i] = smallestItem
    sortedItems[smallestItemPosition] = currentItem
  }

  return sortedItems
}
