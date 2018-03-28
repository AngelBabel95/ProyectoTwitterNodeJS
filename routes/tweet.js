const express = require('express');
const router = express.Router();
const cache = require('../cache');

const tweetCrtl = require('../controllers/tweet.controller');

function getGlobal(route, url) {
  if (url === '/') {
    return route;
  }
  return `${route}${url}`;
}

router.get('/', (req, res, next) => {
  const text = req.query.text; /*Recoge los parámetros ?text=asdf*/
  tweetCrtl.list(text)
  .then((result) => {
    if (!result.length){ /*Array de Tweets vacío */
      console.log('no hay tweets con ese texto')
      const err = new Error('Tweet with text '+text+' not found ')
      err.status = 404
      next(err)
    } 
    else {
      const url = getGlobal('/tweets', req.url);
      console.log('Creando cache para /tweets'+req.url);
      cache[url] = result;
      res.json(result);
    }
    
  })
  .catch(next);
  
});

router.get('/:id', (req, res, next) => {
  tweetCrtl.getTweetById(req.params.id)
  .then((result) => {
    if (!result){ /*Array de Tweets vacío */
      console.log('no hay tweets con ese id')
      const err = new Error('Tweet not found by id '+req.params.id)
      err.status = 404
      next(err)
    }
    else{
      const url = getGlobal('/tweets', req.url);
      console.log('Creando cache para /tweets'+req.url);
      cache[url] = result;
      res.json(result);
    }
  })
  .catch((err) => {
    next(err);
  });
});


/* router.get('/:id/users', (req, res, next) => {
  tweetCrtl.getTweetById(req.params.id)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    next(err);
  }); */
  

module.exports = router;
