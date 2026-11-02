import mongoose from 'mongoose';

// TODO: write in async/await way. Create function main in index.js file. Await setupPresenceExpiration there also.

export const connectToDB = () => {
  mongoose
    .connect(process.env.DATABASE)
    .then(() => {
      console.log('Successfully connected to DB');
    })
    .catch((err) => {
      console.error(err);
      console.error('Error connecting to DB');
    });
};
