const gcd = (number1, number2) => {
  if (number1 <= 0 || number2 <= 0) throw new Error('GCD cannot be found on a nonnegative number')

  const remainder = number1 % number2

  if (remainder === 0) return number2
  return gcd(number2, remainder)
}

export default gcd
