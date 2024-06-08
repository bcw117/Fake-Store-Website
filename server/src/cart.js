var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cartSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  productID: {
    type: Number,
    required: true,
  },
});

var Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;
