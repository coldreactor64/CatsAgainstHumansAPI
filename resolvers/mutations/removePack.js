const { UserInputError, AuthenticationError } = require('apollo-server');
const { Pack } = require('../../models/Pack');

exports.removePack = async (_, { packID }, context) => {
  if (context !== 'NOTAUTH') {
    try {
      const CardPack = await Pack.findOne({ code: packID });
      if (CardPack === null) {
        return new UserInputError('Pack ID does not exist');
      }
      if (context.User.id !== CardPack.owner) {
        return new AuthenticationError('You do not own this pack');
      }
      await CardPack.remove();
      return true;
    } catch (error) {
      // Catch any DB errors
      return new UserInputError(error);
    }
  } else {
    // Check login
    throw new AuthenticationError('You must be logged in to create Packs.');
  }
};
