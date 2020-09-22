require('dotenv').config();
const { MongoClient } = require('mongodb');
const faker = require('faker');

const generateUsers = async () => {
  const users = [];

  for (let id = 1; id <= 100; id++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const userName = faker.internet.userName();
    const email = faker.internet.email();
    const jobTitle = faker.name.jobTitle();

    users.push({
      id,
      firstName,
      lastName,
      userName,
      email,
      jobTitle
    });
  }

  try {
    const dbConn = await MongoClient.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const col = dbConn.db('test').collection('users');
    await col.insertMany(users);
    await dbConn.close();
  } catch (error) {
    throw new Error(error);
  }
};

generateUsers();
