const userModel = require('../models/user.model');
const tweetModel = require('../models/tweet.model');

function list(text) {
  if (!text){
    return userModel.list();
  }
  else{
    return userModel.listT(text);
  }
}

function getUserId(id) {
  return userModel.getUserId(id)
}

function getTweetsUser(id){
  userModel.getTweetsUser(id)
}

function getTweetsUser(id){
  console.log(id);
  return tweetModel.getTweetByUserId(id);
}

module.exports = {
  list,
  getUserId,
  getTweetsUser
};
