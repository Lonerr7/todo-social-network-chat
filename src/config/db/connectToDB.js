import mongoose from 'mongoose';

export const connectToDB = async () => {
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
