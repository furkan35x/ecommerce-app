const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Kullanıcı şeması
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Lütfen bir isim girin.'],
      trim: true,
      minlength: [3, 'İsim en az 3 karakter uzunluğunda olmalıdır.'],
    },
    email: {
      type: String,
      required: [true, 'Lütfen bir e-posta adresi girin.'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Geçerli bir e-posta adresi girin.',
      ],
    },
    password: {
      type: String,
      required: [true, 'Lütfen bir şifre girin.'],
      minlength: [6, 'Şifre en az 6 karakter uzunluğunda olmalıdır.'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt alanlarını otomatik ekler.
  }
);

// Şifreyi kayıttan önce hashle
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Şifre doğrulama metodu
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
