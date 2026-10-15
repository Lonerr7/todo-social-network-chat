import mongoose from 'mongoose';

const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  CEO: 'CEO',
};

// TODO: Remove unnecessary fields
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxLength: [20, 'First name cannot be more than 20 characters'],
    },
    lastName: {
      type: String,
      maxLength: [20, 'Last name cannot be more than 20 characters'],
    },
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
    generalInfo: {
      dateOfBirth: Date,
      currentCity: String,
      country: String,
      relationship: {
        type: String,
        enum: ['Married', 'Not married', 'In active search', 'Single', ''],
      },
      website: String,
      jobPlace: String,
    },
    mainInfo: {
      cityOfBirth: String,
      nativeLanguage: String,
    },
    contactInfo: {
      phoneNumber: String,
      discord: {
        type: String,
        max: [30, 'Your discord is too long!'],
      },
    },
    beliefs: {
      politicalViews: String,
      religion: {
        type: String,
        enum: ['Orthodoxy', 'Catholicism', 'Islam', 'Buddhism', 'Judaism', ''],
        default: '',
      },
      inspiredBy: {
        type: String,
        max: [100, 'Too much!'],
      },
    },
    personalInfo: {
      activities: {
        type: String,
        max: [40, 'Too much!'],
      },
      interests: {
        type: String,
        max: [40, 'Too much!'],
      },
      attitudeTowardsSmoking: {
        type: String,
        enum: ['Positive', 'Neutral', 'Negative', 'Compromise', ''],
        default: '',
      },
      attitudeTowardsDrinking: {
        type: String,
        enum: ['Positive', 'Neutral', 'Negative', 'Compromise', ''],
        default: '',
      },
      favoriteMusic: {
        type: String,
        max: [40, 'Too much!'],
      },
      favoriteMovies: {
        type: String,
        max: [40, 'Too much!'],
      },
      favouriteBooks: {
        type: String,
        max: [40, 'Too much!'],
      },
      aboutMe: {
        type: String,
        max: [40, 'Too much!'],
      },
    },
    role: {
      type: String,
      enum: [USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.CEO],
      default: USER_ROLES.USER,
    },
    isVerified: Boolean,
    onlineStatus: {
      type: String,
      enum: ['Online', 'Offline', "Don't bother", 'Away', 'Sleeping'],
      default: 'Online',
    },
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
