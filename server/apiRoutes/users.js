const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

// matches GET requests to /api/users/
router.get('/', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.status(201).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({error: "Failed to retrieve any user data"});
  }
});

// matches GET request to api/users/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found.' });
    } else {
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user.' });
  }
});

// matches GET request to api/users/date-range/
router.get('/date-range', async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Both startDate and endDate are required.' });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        dateCreated: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users within the specified date range.' });
  }
});

// matches GET request to api/users/profession
router.get('/profession', async (req, res) => {
  const { profession } = req.query;

  if (!profession) {
    return res.status(400).json({ error: 'The profession query parameter is required.' });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        profession: {
          equals: profession,
        },
      },
    });
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users with the specified profession.' });
  }
});

// matches unknown amount of field parameters
router.get('/search', async (req, res) => {
  const allowedFields = ['id', 'firstname', 'lastname', 'email', 'profession', 'dateCreated', 'country', 'city'];
  const queryParams = req.query;

  const whereConditions = Object.entries(queryParams).reduce((conditions, [key, value]) => {
    if (allowedFields.includes(key)) {
      conditions[key] = key === 'dateCreated' ? { equals: new Date(value) } : { contains: value };
    }
    return conditions;
  }, {});

  try {
    const users = await prisma.user.findMany({
      where: whereConditions,
    });
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users with the specified conditions.' });
  }
});




module.exports = router;
