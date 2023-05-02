const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const users = [];

  // Read and parse the CSV file
  await new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve(__dirname, 'UserInfo.csv'))
      .pipe(csvParser())
      .on('data', (row) => users.push(row))
      .on('end', resolve)
      .on('error', reject);
  });

  // Seed users data to the database
  const createUsersPromises = users.map((user) => {
    return prisma.user.create({
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        profession: user.profession,
        dateCreated: new Date(user.dateCreated),
        country: user.country,
        city: user.city,
      },
    });
  });

  await Promise.all(createUsersPromises);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
