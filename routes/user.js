const express = require('express');
const router = express.Router();
const cache = require('../cache');

const userCtrl = require('../controllers/user.controller');

function getGlobal(route, url) {
  if (url === '/') {
    return route;
  }
  return `${route}${url}`;
}

router.get('/', (req, res, next) => {
  const text = req.query.name; /*Recoge los parámetros ?text=asdf*/
  userCtrl.list(text)
  .then((result) => {
    if (!result.length){ /*Array de Users vacío */
      console.log('no hay usuarios con ese nombre')
      const err = new Error('User with name '+text+' not found ')
      err.status = 404
      next(err)
    }
    else {
      const url = getGlobal('/users', req.url);
      console.log('Creando cache para /users'+req.url);
      cache[url] = result;
      res.json(result);
    }
  })
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  userCtrl.getUserId(req.params.id)
  .then((result) => {
    if (!result){ /*Array de Users vacío */
      console.log('no hay usuarios con ese id')
      const err = new Error('User not found by id '+req.params.id+' ')
      err.status = 404
      next(err)
    }
    else {
      const url = getGlobal('/users', req.url);
      console.log('Creando cache para /users'+req.url);
      cache[url] = result;
      res.json(result);
    }
  })
  .catch(next);
});

router.get('/:id/tweets', (req, res, next) => {
  userCtrl.getTweetsUser(req.params.id)
  .then((result) => {
    if (!result.length){ /*Array de Users vacío */
      console.log('El usuario no tiene tweets')
      const err = new Error('Tweets not found by user with id '+req.params.id+' ')
      err.status = 404
      next(err)
    }
    else {
      res.json(result);
    }
  })
  .catch(next);
});


router.get('*', (req, res, next) => {
  const url = req.url;
  
  userCtrl.getName(req.params.name)
  .then((result) => {
    res.json(result);
  })
  .catch(next);
});

module.exports = router;
