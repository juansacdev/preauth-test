import { findSubSet } from '../src/game-01';

describe("Test findSubSet function", () => {
  describe('when params are OK', () => {
    const emptyArr = [0,4,2,9,3,1,3,6]
    const n = 7

    it('should return an array', () => {
      const result = findSubSet(emptyArr, n)

      expect(result).toBeInstanceOf(Array)
    })
    it('should return [4, 3]', () => {
      const result = findSubSet(emptyArr, n)

      expect(result).toHaveLength(2)
      expect(result).toStrictEqual([4,3])
    })
  })
  describe('when params are not OK', () => {
    it('should throw a error with an empty array', () => {
      const emptyArr: Array<number> = []
      const n = 10

      try {
        findSubSet(emptyArr, n)
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError)
      }
    })
    it('should throw a error with an negative value of n', () => {
      const emptyArr: Array<number> = [1,5,8]
      const n = -10

      try {
        findSubSet(emptyArr, n)
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError)
      }
    })
  })
});
