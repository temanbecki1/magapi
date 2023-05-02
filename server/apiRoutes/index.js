const router = require('express').Router();

// routes request to users /api/users/
router.use('/users', require('./users'));

// matches GET requests to /api/
router.get('/', (req, res, next) => {
  res.send("Welcome to the api server page Teman!")
})

router.use((req,res,next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
