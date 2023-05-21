import mongoose, { ConnectOptions } from 'mongoose';

let isConnected = false; //track the connection

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB connection already established');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: 'share_prompt',
    });
    isConnected = true;
    console.log('MongoDB connection established');
  } catch (e) {
    console.log(e);
  }
};
