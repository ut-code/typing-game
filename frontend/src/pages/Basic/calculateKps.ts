const calculateKps = (time: number, correctInputCount: number) => {
  const typingSpeed = time === 0 ? 99.99 : correctInputCount / time
  return Math.floor(typingSpeed * Math.pow(10, 2)) / Math.pow(10, 2)
}

export default calculateKps
