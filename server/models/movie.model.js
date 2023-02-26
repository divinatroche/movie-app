const mongoose = require("mongoose");

// Schema
const MovieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Por favor incluir titulo"],
      minLength: [10, "Titulo debe incluir al menos 10 caracteres"],
      maxLength: [100, "Titulo no debe tener mas de 100 caracteres"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        //user: {
        //  type: mongoose.Schema.ObjectId,
        //  ref: "Usuario",
        //  required: true,
        //},
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    // user: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "Usuario",
    //   required: true,
    // },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Movies = mongoose.model("Movies", MovieSchema);
module.exports = Movies;
