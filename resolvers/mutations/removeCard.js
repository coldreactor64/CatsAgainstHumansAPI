const { UserInputError, AuthenticationError } = require("apollo-server");
const { Pack } = require("../../models/Pack");

exports.removeCard = async (_, { cardID, packID }, context) => {
  if (context !== "NOTAUTH") {
    try {
      const CardPack = await Pack.findOne({ code: packID });
      if (CardPack === null) {
        return UserInputError("Pack ID does not exist");
      }
      const whiteCard = await CardPack.whiteCards.id(cardID);
      const blackCard = await CardPack.blackCards.id(cardID);
      if (blackCard === null) {
        whiteCard.remove();
      }
      if (whiteCard === null) {
        blackCard.remove();
      }
      const resultingPack = await CardPack.save();
      return {
        name: resultingPack.name,
        description: resultingPack.description,
        code: resultingPack.code,
        whiteCards: [...resultingPack.whiteCards],
        blackCards: [...resultingPack.blackCards],
        votes: resultingPack.votes,
      };
    } catch (error) {
      // Catch any DB errors
      const resultingPack = await Pack.findOne({ code: packID });
      return {
        name: resultingPack.name,
        description: resultingPack.description,
        code: resultingPack.code,
        whiteCards: [...resultingPack.whiteCards],
        blackCards: [...resultingPack.blackCards],
        votes: resultingPack.votes,
      };
    }
  } else {
    // Check login
    throw new AuthenticationError("You must be logged in to create Packs.");
  }
};
