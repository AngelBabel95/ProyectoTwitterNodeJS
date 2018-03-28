const mongoose = require('mongoose');
const nameDB = process.env.DB || 'twitterDB';
mongoose.connect(`mongodb://localhost/${nameDB}`);

const UserModel = mongoose.model('user', {
    t_id: Number,
    screen_name: String,
    name: String,
});

const TweetModel = mongoose.model('tweet', {
    created_at: Date,
    t_id: Number,
    text: String,
    user_id: String,
    entities: {},
});

const TweetUserModel = mongoose.model('tweetuser', {
    id_user: Number,
    id_tweet: Number
})

const Twitter = require('twitter');

const client = new Twitter({

consumer_key: "yurpQSWRgMSO0Mk8w6DwED9BW",

consumer_secret: "fhmewjeidM2IYyVKW2Lk4nmiBa3bPquoYsX7fDXfpAY9ShHfEE",

access_token_key: "977957232456425473-hv2FuUKng8mdPXnL5fsvTNd9IU2lqdE",

access_token_secret: "tee9YpKQWJQr8axr4NoB5dETkceR1wnwA37wDfnDbJeWG"

});

client.stream('statuses/filter', { track: 'hola', language: 'es' }, function (stream) {

stream.on('data', function (tweet) {
    /*Inserciones en coleccion usuario */
    const u = {t_id: tweet.user.id, screen_name: tweet.user.screen_name, name: tweet.user.name}
    UserModel(u).save();
    /*Inserciones en coleccion tweets */
    const t = {created_at: tweet.created_at, t_id: tweet.id, text: tweet.text, user_id: tweet.user.id}
    TweetModel(t).save();

    const tu = {id_user:tweet.user.id, id_tweet: tweet.id}
    /* const tuRt = {id_user:tweet.user.id, id_tweet: tweet.t_id} */
    console.log(tweet);
    TweetUserModel(tu).save();

});

stream.on('error', function (error) {

console.log(error);

});

});



/*{ created_at: 'Wed Mar 28 07:48:09 +0000 2018',
  id: 978901540474966000,
  id_str: '978901540474966017',
  text: 'RT @CalaixNikov: Hola @EspejoPublico. Os abro un breve hilo sobre vuestraS "confiables" fuentes informativas para hacer tan
elaborado repor…',
  source: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
  truncated: false,
  in_reply_to_status_id: null,
  in_reply_to_status_id_str: null,
  in_reply_to_user_id: null,
  in_reply_to_user_id_str: null,
  in_reply_to_screen_name: null,
  user:
   { id: 251730702,
     id_str: '251730702',
     name: 'Fàtima Lizaso',
     screen_name: 'Ishtar1973',
     location: 'Caldes de Montbui, Catalunya',
     url: 'http://www.lacasadelbosc.blogspot.com',
     description: 'Hay que escuchar más a la Naturaleza y los silencios que nos brinda. Dicen más ellos que millones de nuestras palabras',
     translator_type: 'none',
     protected: false,
     verified: false,
     followers_count: 128,
     friends_count: 448,
     listed_count: 0,
     favourites_count: 18427,
     statuses_count: 16061,
     created_at: 'Sun Feb 13 18:51:45 +0000 2011',
     utc_offset: 7200,
     time_zone: 'Madrid',
     geo_enabled: false,
     lang: 'es',
     contributors_enabled: false,
     is_translator: false,
     profile_background_color: 'C0DEED',
     profile_background_image_url: 'http://abs.twimg.com/images/themes/theme1/bg.png',
     profile_background_image_url_https: 'https://abs.twimg.com/images/themes/theme1/bg.png',
     profile_background_tile: false,
     profile_link_color: '1DA1F2',
     profile_sidebar_border_color: 'C0DEED',
     profile_sidebar_fill_color: 'DDEEF6',
     profile_text_color: '333333',
     profile_use_background_image: true,
     profile_image_url: 'http://pbs.twimg.com/profile_images/972215911884173312/DOoDa285_normal.jpg',
     profile_image_url_https: 'https://pbs.twimg.com/profile_images/972215911884173312/DOoDa285_normal.jpg',
     profile_banner_url: 'https://pbs.twimg.com/profile_banners/251730702/1520629312',
     default_profile: true,
     default_profile_image: false,
     following: null,
     follow_request_sent: null,
     notifications: null },
  geo: null,
  coordinates: null,
  place: null,
  contributors: null,
  retweeted_status:
   { created_at: 'Tue Mar 27 19:56:14 +0000 2018',
     id: 978722382193061900,
     id_str: '978722382193061888',
     text: 'Hola @EspejoPublico. Os abro un breve hilo sobre vuestraS "confiables" fuentes informativas para hacer tan elaborad… https://t.co/4eUYSgKZsm',
     source: '<a href="http://twitter.com" rel="nofollow">Twitter Web Client</a>',
     truncated: true,
     in_reply_to_status_id: null,
     in_reply_to_status_id_str: null,
     in_reply_to_user_id: null,
     in_reply_to_user_id_str: null,
     in_reply_to_screen_name: null,
     user:
      { id: 2364999878,
        id_str: '2364999878',
        name: 'Calaix  */