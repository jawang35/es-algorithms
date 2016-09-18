export default (string, pattern) => {
  if (!string || !pattern) return -1

  const patternLength = pattern.length

  const skipTable = {}
  for (let i = 0; i < patternLength; i += 1) {
    skipTable[pattern[i]] = patternLength - 1 - i
  }

  let index = patternLength - 1
  let found = false

  while (!found && index < string.length) {
    for (let i = 0; i < patternLength; i += 1) {
      const stringChar = string[index - i]
      const patternChar = pattern[patternLength - 1 - i]
      const charMatch = stringChar === patternChar

      if (!charMatch) {
        index += skipTable[stringChar] || patternLength
        break
      }

      if (i === patternLength - 1) found = true
    }
  }

  return found ? (index - (patternLength - 1)) : -1
}
