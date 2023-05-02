const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

// matches GET requests to /api/users/
router.get('/', async (req, res, next) => {
  try {
    res.send("Welocme to the user api main page!")
  } catch (err) {
    console.log(err);
    res.status(500).json({error: "Failed to retrieve any user data"});
  }
});

module.exports = router;
