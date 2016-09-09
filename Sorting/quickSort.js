import defaultCompare from './helpers/defaultCompare'

const quickSort = (items, compare) => {
  if (items.length <= 1) return items

  const pivot = items[Math.floor(items.length / 2)]
  const less = items.filter(item => compare(item, pivot) < 0)
  const equal = items.filter(item => compare(item, pivot) === 0)
  const greater = items.filter(item => compare(item, pivot) > 0)

  return [...quickSort(less, compare), ...equal, ...quickSort(greater, compare)]
}

export default (items, compare = defaultCompare) => {
  if (typeof items === 'string') return quickSort(items.split(''), compare)

  return quickSort(items, compare)
}
