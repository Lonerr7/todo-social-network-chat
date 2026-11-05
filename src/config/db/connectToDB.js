import mongoose from 'mongoose';

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log('Successfully connected to DB');
  } catch (err) {
    console.error('Error connecting to DB');
    throw err;
  }
};
