const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdepositphotos.com%2Fvector-images%2Fdefault-profile-picture.html&psig=AOvVaw3qTK5b18r4w9awlDFUO0F5&ust=1583168252886000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNCutMHf-ecCFQAAAAAdAAAAABAD'
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
