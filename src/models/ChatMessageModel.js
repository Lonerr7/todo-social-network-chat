import mongoose from 'mongoose';

const {Schema} = mongoose;

const chatMessageSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
    min: [1, 'Please, enter your message'],
    max: [500, 'Your message is too long'],
  },
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

export {ChatMessage};
