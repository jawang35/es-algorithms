const defaultCompare = (item1, item2) => {
  if (item1 <= item2) return -1
  return 1
}

export default (items, compare = defaultCompare) => {
  const sortedItems = new Array(items.length)

  for (let i = 0; i < items.length; i++) {
    const itemToInsert = items[i]
    let positionToInsert = 0

    for (let j = i - 1; j >= 0; j--) {
      const item = sortedItems[j]

      if (compare(item, itemToInsert) <= 0) {
        positionToInsert = j + 1
        break
      }

      sortedItems[j + 1] = item
    }

    sortedItems[positionToInsert] = itemToInsert
  }

  return sortedItems
}
