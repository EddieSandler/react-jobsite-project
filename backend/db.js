"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;
let DB_URI;


if (process.env.NODE_ENV === "test") {
  DB_URI="jobly_test";
} else {
  DB_URI="jobly";
}

  db = new Client({
    host:"/var/run/postgresql",
    database:DB_URI
  });


db.connect();

module.exports = db;