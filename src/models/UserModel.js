import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: [true, 'Please enter your nickname'],
      unique: true,
      maxLength: [20, 'Nickname cannot be more than 20 characters!'],
      minLength: [3, 'Nickname is too short!'],
    },
    passwordChangedAt: Date,
    photo: String,
    photoPublicId: String,
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
  },
);

// Checking if user has changed his password
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  // In instance methods <this> points to the current document
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );

    return JWTTimestamp < changedTimestamp;
  }

  // false = not changed
  return false;
};

const User = mongoose.model('User', userSchema);

export {User};
