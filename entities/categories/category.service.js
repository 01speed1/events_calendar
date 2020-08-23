const Category = require('../../entities/categories/category.model')
const { hasSomething } = require('../../helpers/objectsHelper')

const { create, getAll } = require('../../lib/modelBuilder')(Category)

const { required } = require('../../lib/errorBuilder')

const getAllCategory = async () => {
  const categories = await getAll()
  return { categories }
}

const createCategory = async (parameters = {}) => {
  let errors = {}
  const { name } = parameters

  errors = required(errors, 'name', name)

  if (hasSomething(errors)) return { errors }

  const category = await create({ name })

  return { message: 'category created', category }

}

module.exports = { createCategory, getAllCategory }