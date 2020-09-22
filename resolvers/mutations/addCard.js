const {
  UserInputError,
  AuthenticationError,
} = require('apollo-server');
const { Pack } = require('../../models/Pack');

exports.addCard = async (_, {
  Card: {
    type, spaces, text,
  }, packID,
}, context) => {
  if (context !== 'NOTAUTH') {
    try {
      const CardPack = await Pack.findOne({ code: packID });
      if (type === 'BLACK') {
        // Create a new card object
        const newCard = { spaces, text };
        // Push it to the Card Pack array and save it
        CardPack.blackCards.push(newCard);
        const resultingCard = await CardPack.save();
        // Return it to the user
        return {
          name: resultingCard.name,
          description: resultingCard.description,
          code: resultingCard.code,
          whiteCards: [...resultingCard.whiteCards],
          blackCards: [...resultingCard.blackCards],
          votes: resultingCard.votes,
        };
      } if (type === 'WHITE') {
        // If Create a card Object
        const newCard = { text };
        // Push and save and return to the user
        CardPack.whiteCards.push(newCard);
        const resultingCard = await CardPack.save();
        return {
          name: resultingCard.name,
          description: resultingCard.description,
          code: resultingCard.code,
          whiteCards: [...resultingCard.whiteCards],
          blackCards: [...resultingCard.blackCards],
          votes: resultingCard.votes,
        };
      } // If we have a wrong card type, UserInputError
      throw new UserInputError('Invalid Card Type');
    } catch (error) {
      // Catch any DB errors
      throw new UserInputError(error);
    }
  } else {
    // Check login
    throw new AuthenticationError('You must be logged in to create Packs.');
  }
};
