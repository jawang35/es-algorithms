export default (string, pattern) => {
  if (!string || !pattern) return -1

  const patternLength = pattern.length

  for (let i = 0; i < string.length; i += 1) {
    if (string.substring(i, i + patternLength) === pattern) return i
  }

  return -1
}
