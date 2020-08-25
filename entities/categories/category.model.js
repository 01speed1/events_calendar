const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CategorySchema = Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() }
});

const Category = mongoose.model("Category", CategorySchema);

Category.findOne({name: 'Parties'}, async(err, doc) => {
  if (!doc) await Category.create({name: 'Parties'})
})

module.exports = Category