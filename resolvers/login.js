const {
  UserInputError,
} = require('apollo-server');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const Users = require('../models/users');
const Sessions = require('../models/sessions');

exports.login = async (_, { email, password }) => {
  // TODO ADD TO LOCAL CACHE LOGGED IN SESSIONS
  const User = await Users.findOne({ email });
  // Find the user if the exists
  if (User === null) {
    throw new UserInputError('Invalid Username or password');
  } else {
    // Create a token and see if the password matches
    const token = uuidv4();
    const validpass = await bcrypt.compareSync(password, User.password);
    if (validpass) {
      // Check if there is an active session for this user.
      const ActiveSession = await Sessions.findOne({ email });
      ActiveSession.overwrite({ token });
      return { token };
    }
    throw new UserInputError('Invalid Username or password');
  }
};
