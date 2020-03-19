const knex = require("knex");
const knexFile = require("../knexfile");
const environment = process.env.environment || "development";

module.exports = knex(knexFile[environment]);
