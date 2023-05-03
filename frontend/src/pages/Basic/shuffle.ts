/**
 * shuffle an array
 * @param array array to be shuffled
 * @returns shuffled array
 * @example
 * const shuffledArray = shuffle([1, 2, 3, 4, 5]) // [3, 2, 5, 1, 4]
 */
const shuffle = <T>(array: T[]): T[] => {
  const newArray = [...array]
  for (let i = 0; i < array.length; i += 1) {
    const j = Math.floor(Math.random() * array.length)
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export default shuffle
