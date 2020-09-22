const { login } = require('../resolvers/login');
const { signup } = require('../resolvers/signup');
const { createPack } = require('../resolvers/mutations/createPack');
const { addCard } = require('../resolvers/mutations/addCard');

const resolvers = {
  Query: {
    testAuth: async (_, args, context) => {
      console.log(context);
      return 'Hello';
    },
  },
  Mutation: {
    login,
    signup,
    createPack,
    addCard,
  },

};

module.exports = resolvers;
