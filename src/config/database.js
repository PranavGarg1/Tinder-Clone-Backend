const mongoose = require("mongoose");

const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://gargpranav9292:pg12345@cluster0.8cexwdx.mongodb.net/?appName=Cluster0/tinderClone",
  );
};

module.exports = {
  connectDb,
};
