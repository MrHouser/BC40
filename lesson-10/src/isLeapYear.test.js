/*
1. Отримує рік  у вигляді цілого числа
2. Повертає true якщо рік високосний та false якщо ні.
3. Повертає помилку з правильним текстом якщо отримала некоректні дані

2008 - true
2003 - false
1900 - false
2000 - true

41 - error "Year must be greater that 41"
2000.4 - error 'Year must be an integer'
() - error 'Year expected'
'2000' - error 'Year must be a number'
null - error 'Year must be a number'
true- error 'Year must be a number'
false - error 'Year must be a number'
()=>{} - error 'Year must be a number'
[] - error 'Year must be a number'
{} - error 'Year must be a number'
*/

const isLeapYear = require("./isLeapYear")

describe("test isLeapYear", () => {
  test("2008 - true", () => {
    const result = isLeapYear(2008)
    expect(result).toBe(true)
  })

  it("2003 - false", () => {
    expect(isLeapYear(2003)).toBe(false)
  })

  it("1900 - false", () => {
    expect(isLeapYear(1900)).toBe(false)
  })

  it("2000 - false", () => {
    expect(isLeapYear(2000)).toBe(true)
  })

  it("41 - error 'Year must be greater that 41'", () => {
    expect(() => isLeapYear(41)).toThrow("Year must be greater that 41")
  })

  it("2000.4 - error 'Year must be an integer'", () => {
    expect(() => isLeapYear(2000.4)).toThrow("Year must be an integer")
  })

  it("() - error 'Year expected'", () => {
    expect(() => isLeapYear()).toThrow("Year expected")
  })

  it("null - error 'Year must be a number'", () => {
    expect(() => isLeapYear(null)).toThrow("Year must be a number")
  })

  it("true - error 'Year must be a number'", () => {
    expect(() => isLeapYear(true)).toThrow("Year must be a number")
  })

  it("false - error 'Year must be a number'", () => {
    expect(() => isLeapYear(false)).toThrow("Year must be a number")
  })

  it("()=>{} - error 'Year must be a number'", () => {
    expect(() => isLeapYear(() => {})).toThrow("Year must be a number")
  })

  it("[] - error 'Year must be a number'", () => {
    expect(() => isLeapYear([])).toThrow("Year must be a number")
  })

  it("{} - error 'Year must be a number'", () => {
    expect(() => isLeapYear({})).toThrow("Year must be a number")
  })
})
