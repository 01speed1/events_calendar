const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OID = Schema.Types.ObjectId;

var EventSchema = Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  categoryID: { type: OID, ref: "Category", required: true },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Event", EventSchema);