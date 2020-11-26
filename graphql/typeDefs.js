const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    nickname: String!
    email: String!
    wonGames: [Game]
    lostGames: [Game]
  }

  type Token {
    token: String!
  }

  type UsersResult {
    user: User
  }
  
  type Game {
    id: Int!
    rounds: [Round]
  }

  type Round {
    whiteCardsPlayed: [WhiteCard]
    blackCardsPlayed: BlackCard
  }

  type WhiteCard {
    text: String!
    id: String!
  }

  type BlackCard {
    spaces: Int!
    text: String!
    id: String!
  }

  input Card {
    type: String!
    spaces: Int
    text: String!
  }
  
  type Pack {
    name: String!
    description: String!
    code: String!
    whiteCards: [WhiteCard]
    blackCards: [BlackCard]
    votes: Int!
  }

  type GameState {
    GameID: String!
    CardCzar: String!
    Round: [Round]
    PreviousRounds: [Round]
    ActivePlayers: [User]
    InactivePlayers: [User]
  }

  type Query {
    getUsers(search: String, page: Int, limit: Int): UsersResult
    # getCards => get the cards for the current game you are playing
    getCards(gameID: String!): Pack
    testAuth:String!
  }

  type Subscription {
    updateGameState(gameID: String!): GameState
  }


  type Mutation {
    #login - Login User
    login(email: String!, password: String!) : Token

    #signup - signup User
    signup(email: String!, password: String!, nickname: String!) : Boolean
    
    #joinGame -> Join a game from a gameID
    joinGame(gameID: String!): Boolean
    
    #leaveGame -> Leave a game from a gameID
    leaveGame(gameID: String!): Boolean
    
    #getNewCard -> Get a new white card
    getNewCard(gameID: String!): WhiteCard
    
    #selectCards -> Select the white cards you want
    selectCards(gameID: String!, cardID: [String!]): Boolean
    
    #selectWinner -> If Card Czar, select the winner of the round
    selectWinner(gameID: String!, cardID: String!): Boolean
    
    #readyGame => Set yourself ready to play
    readyGame(gameID: String!): Boolean
    
    #addPack -> Add a pack of cards to a game
    addPack(packID:String!): Boolean
    
    #removePack -> Remove a pack of cards from a game
    removePack(packID:String!): Boolean

    #create a pack of cards
    createPack(name: String!, description: String!): Pack
    
    #addCard -> add a card to a pack
    addCard(Card: Card!, packID: String!): Pack
    
    #removeCard -> remove a card from a pack
    removeCard(cardID: String!, packID: String!): Pack
  }
 
`;

module.exports = typeDefs;
