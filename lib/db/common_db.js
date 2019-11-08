const { isNull, isEmpty } = require('lodash');
const { ObjectId } = require('mongodb');

const { makeError } = require('../errors/utils');

// resolve: return true when removed correctly.
function exist(collection, params) {
  return new Promise((resolve, reject) => {
    collection.findOne(params || {}, (error, result) => {
      if (error) {
        reject(error);
      }

      if (isNull(result)) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

// findById: return a promise.
// resolve: get back a document by id.
function findById(collection, id) {
  if (isEmpty(id)) throw makeError('Missing id parameter', 500);
  if (isEmpty(collection)) throw makeError('Missing Collection', 500);

  return new Promise((resolve, reject) => {
    collection.findOne({ _id: ObjectId(id) }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function find(collection, params, sort = {}, includeFields = {}) {
  if (isEmpty(collection)) throw makeError('Missing Collection', 500);

  return new Promise((resolve, reject) => {
    collection
      .find(params, includeFields)
      .sort(sort)
      .toArray((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
  });
}

function handleError(error) {
  let status = 500;
  if (error.code === 11000) {
    status = 409;
  }
  return makeError(error.message, status);
}

// insert: return a promise with mongodb insert/return.
// resolve: return document.
// catch: database error.
function insert(collection, body) {
  if (isEmpty(collection)) throw makeError('Missing Collection', 500);
  if (isEmpty(body)) throw makeError('Missing Body', 500);

  return new Promise((resolve, reject) => {
    collection.insertOne(body, {}, (error, result) => {
      if (error) {
        reject(handleError(error));
      } else {
        resolve(result);
      }
    });
  });
}

function insertMany(collection, bodyArr) {
  return new Promise((resolve, reject) => {
    collection.insertMany(bodyArr, {}, (error, result) => {
      if (error) {
        reject(handleError(error));
      } else {
        resolve(result);
      }
    });
  });
}

// update: return a promise with mongodb update/return.
// resolve: return updated Records.
// catch: database error.
function updateById(collection, id, body) {
  if (isEmpty(id)) throw makeError('Missing id parameter', 500);
  if (isEmpty(collection)) throw makeError('Missing Collection', 500);
  if (isEmpty(body)) throw makeError('Missing Body', 500);

  return new Promise((resolve, reject) => {
    collection.updateOne(
      { _id: ObjectId(id) },
      {
        $set: body,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
}

// update: return a promise with mongodb update/return.
// resolve: return document.
// catch: database error.
function update(collection, query, body) {
  return new Promise((resolve, reject) => {
    collection.update(query, { $set: body }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function updatePushById(collection, id, body) {
  if (isEmpty(id)) {
    throw makeError('Missing id parameter', 500);
  }

  if (isEmpty(collection)) {
    throw makeError('Missing Collection', 500);
  }

  return new Promise((resolve, reject) => {
    collection.updateById(
      id,
      {
        $push: body || {},
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
}

function updatePush(collection, query, body) {
  if (isEmpty(query)) {
    throw makeError('Missing query', 500);
  }

  if (isEmpty(collection)) {
    throw makeError('Missing Collection', 500);
  }

  return new Promise((resolve, reject) => {
    collection.update(
      query,
      {
        $push: body || {},
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
}

// removeById: return a promise.
// resolve: return true when removed correctly.
// catch: error in data base
function removeById(collection, id) {
  return new Promise((resolve, reject) => {
    if (isEmpty(id)) throw makeError('Missing id parameter', 500);
    if (isEmpty(collection)) throw makeError('Missing Collection', 500);

    collection.deleteOne({ _id: ObjectId(id) }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.deletedCount === 1);
      }
    });
  });
}

// removeById: return a promise.
// resolve: return true when removed correctly.
// catch: error in data base
function remove(collection, query) {
  return new Promise((resolve, reject) => {
    collection.remove(query, error => {
      if (error) {
        reject(handleError(error));
      } else {
        resolve();
      }
    });
  });
}

function removeManyById(collection, ids) {
  return new Promise((resolve, reject) => {
    collection.deleteMany(
      {
        _id: { $in: ids },
      },
      (error, result) => {
        if (error) {
          reject(handleError(error));
        } else {
          resolve(result.deletedCount);
        }
      },
    );
  });
}

module.exports = {
  exist,
  find,
  findById,
  insert,
  insertMany,
  update,
  updateById,
  updatePushById,
  updatePush,
  removeById,
  remove,
  removeManyById,
};
