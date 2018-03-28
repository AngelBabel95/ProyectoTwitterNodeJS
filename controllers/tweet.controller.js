const tweetModel = require('../models/tweet.model');

function list(text) {
  if (!text){
    return tweetModel.list();
  }
  else{
    return tweetModel.listT(text);
  }
}

function getTweetById(id) {
  return tweetModel.getTweetById(id);
}

module.exports = {
  list,
  getTweetById
};
