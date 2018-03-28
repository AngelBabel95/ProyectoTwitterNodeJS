const mongoose = require('mongoose');

const TweetModel = mongoose.model('tweets', {
  created_at: Date,
  t_id: Number,
  text: String,
  user_id: String,
  entities: {},
});

function list() {
  return TweetModel.find({});
}

function listT(text) {
  return TweetModel.find({"text" : {$regex : `.*${text}.*`}}); 
  /* TweetModel.find({"text" : {$regex : `.*${text}.*`}})
  .then((resolve) => {
    if (!resolve.length){
      console.log('No encuantra tweet')
      const err = new Error('tweet not found');
      throw err;
    }
    console.log(resolve)
    return resolve; 
  })*/
}

function getTweetByUserId (id){
  return TweetModel.find({"user_id": id})
}

function getTweetById(id) {
  return TweetModel.findOne({"t_id": id})
}


module.exports = {
  list,
  listT,
  getTweetByUserId,
  getTweetById
};
