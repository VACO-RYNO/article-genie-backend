const express = require("express");
const loaders = require("./loaders");

const app = express();

async function initServer() {
  await loaders({ expressApp: app });
}

initServer();

module.exports = app;
