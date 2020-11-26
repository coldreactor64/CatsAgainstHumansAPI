const {
  UserInputError,
} = require('apollo-server');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const Users = require('../models/users');
const Sessions = require('../models/sessions');

exports.signup = async (_, { email, password, nickname }) => {
  // See if user already exists with that email
  const User = await Users.findOne({ email });
  if (User === null) {
    // Create a new user with data sent
    try {
      // Login Token for new user
      const token = uuidv4();
      const newUser = new Users({
        email,
        password: bcrypt.hashSync(password, 10),
        nickname,
        lostGames: [],
        wonGames: [],
        activeGame: '',
      });
      const newSession = new Sessions({
        token,
        email,
      });
        // eslint-disable-next-line consistent-return
        // Save it and create a new session
      await newUser.save();
      await newSession.save();
      return true;
    } catch (error) {
      console.log(error);
      throw new UserInputError('Error adding user, contact support');
    }
  } else {
    throw new UserInputError('Email already Exists.');
  }
};
