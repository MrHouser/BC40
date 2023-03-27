const isLeapYear = (year) => {
  if (year === undefined) {
    throw new Error("Year expected")
  }

  if (typeof year !== "number") {
    throw new Error("Year must be a number")
  }

  if (!Number.isInteger(year)) {
    throw new Error("Year must be an integer")
  }

  if (year < 42) {
    throw new Error("Year must be greater that 41")
  }

  const date = new Date(year, 2, 0)
  const dayNumber = date.getDate()
  return dayNumber === 29
}

module.exports = isLeapYear
