const { faker } = require("@faker-js/faker");
const express = require("express");
const app = express();
const port = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let userId = 0;
let companyId = 0;
const createUser = () => {
  const user = {
    password: faker.animal.type(),
    email: `${faker.lorem.word()}@${faker.lorem.word()}.com`,
    phoneNumber: faker.name.firstName(),
    lastName: faker.name.lastName(),
    firstName: faker.name.firstName(),
    _id: userId,
  };
  userId++;
  return user;
};

const createCompany = () => {
  const company = {
    _id: companyId,
    name: faker.company.companyName(),
    address: {
      street: faker.address.streetName(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      country: faker.address.country(),
    },
  };
  companyId++;
  return company;
};

app.get("/api/create/user", (req, res) => {
  res.json(createUser());
});

app.get("/api/create/company", (req, res) => {
  res.json(createCompany());
});

app.get("/api/create/both", (req, res) => {
  res.json({
    user: createUser(),
    company: createCompany(),
  });
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
