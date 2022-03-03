type setIntegers = Array<number>

export function findSubSet(setNum: setIntegers, objetive: number): setIntegers {
  if (!setNum.length || (objetive <= 0)) throw new TypeError('Invalid input')

  const result: setIntegers = []
  const map = {};

  for (const number of setNum) {
    const difference = objetive - number

    if (!map[number]) {
      map[difference] = number
      continue
    }

    result.push(map[number], number)
    break
  }

  return result;
}
