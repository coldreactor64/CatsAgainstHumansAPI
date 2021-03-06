/* eslint-disable no-underscore-dangle */
const {
  UserInputError,
  AuthenticationError,
} = require('apollo-server');
const { generateGameID } = require('../../utils/generateGameID');
const { Pack } = require('../../models/Pack');

exports.createPack = async (_, { name, description }, context) => {
  if (context.User !== 'NOTAUTH') {
    try {
      const id = generateGameID();
      const newPack = new Pack({
        name,
        description,
        code: id,
        votes: 0,
        owner: context.User.id,
      });
      const createdPack = await newPack.save();
      return {
        name: createdPack.name,
        description: createdPack.description,
        code: createdPack.code,
        whiteCards: [...createdPack.whiteCards],
        blackCards: [...createdPack.blackCards],
        votes: createdPack.votes,
      };
    } catch (error) {
      console.log('ERROR CREATING');
      throw new UserInputError(error);
    }
  } else {
    console.log('LOGIN ERROR');
    throw new AuthenticationError('You must be logged in to create Packs.');
  }
};
