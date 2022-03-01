type setIntegers = Array<number>

export function findSubSet(setNum: setIntegers, objetive: number): setIntegers {
  if (!setNum.length || (objetive <= 0)) throw new TypeError('Invalid input')

  const result: setIntegers = []

  for (const number of setNum) {
    const difference = objetive - number
    if (!setNum.includes(difference)) continue

    result.push(number, difference)
    break
  }

  return result
}
