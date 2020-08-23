const getAll = (Model) => async () => await Model.find({});

const findBy = (Model) => async (parameters) => {
  return await Model.find(parameters).exec();
};

const getOne = (Model) => async (findOptions) => {
  try {
    return await Model.findOne(findOptions).exec();
  } catch (errors) {
    return errors;
  }
};

const create = (Model) => async (parameters) => await Model.create(parameters)

const update = (Model) => async (_id, parameters) =>
  await Model.findOneAndUpdate({ _id }, parameters, { new: true }).exec();

const remove = (Model) => async (_id) => await Model.findOneAndRemove({ _id });

module.exports = (Model) => ({
  findBy: findBy(Model),
  getAll: getAll(Model),
  getOne: getOne(Model),
  create: create(Model),
  update: update(Model),
  remove: remove(Model),
});
