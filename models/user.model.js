const mongoose = require('mongoose');


const UserModel = mongoose.model('users', {
  t_id: Number,
  screen_name: String,
  name: String,
});

const TweetUserModel = mongoose.model('tweetuser', {
  id_user: Number,
  id_tweet: Number
})

function list() {
  return UserModel.find({});
}

function listT(text) {
  return UserModel.find({"name" : {$regex : `.*${text}.*`}});
}

function getUserId(id) {
  return UserModel.findOne({"t_id": id}); 
}
  



module.exports = {
  list,
  listT,
  getUserId
};
