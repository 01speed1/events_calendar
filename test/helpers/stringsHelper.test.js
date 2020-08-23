require("dotenv").config();

const { endpointStringBuilder } = require("../../helpers/stringsHelper");

describe( "#endpointStringBuilder", () => {
  describe("when receive a endopoint name", () => {
    it("should return the expected string", () => {
      const response = endpointStringBuilder("events")

      expect(response).toBe("/api/events")
    })
  })

  describe("when dont receive a endopoint name", () => {
    it("should return the expected string", () => {
      const response = endpointStringBuilder()

      expect(response).toBe("/api/")
    })
  })
} )

