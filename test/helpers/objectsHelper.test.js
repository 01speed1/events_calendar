const { isEmpty, hasSomething } = require('../../helpers/objectsHelper')

describe("#isEmpty", () => {
  describe("when object does not have properties", () => {
    it("", () => expect(isEmpty({})).toBeTruthy())
  })
})

describe("#hasSomething", () => {
  describe("when object does not have properties", () => {
    it("", () => { expect(hasSomething({})).toBeFalsy() })
  })
})