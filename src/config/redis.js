const util = require("util");
const redis = require("redis");

// const client = redis.createClient({
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
// });

const client = redis.createClient({
  url: process.env.REDIS_URI
});

client.on("connect", function () {
  console.log("Redis Connected!");
});

client.on("error", function (error) {
  console.error(error);
});

const setClient = util.promisify(client.set).bind(client);
const getClient = util.promisify(client.get).bind(client);
const existsClient = util.promisify(client.exists).bind(client);
const deleteKeyClient = util.promisify(client.del).bind(client);
const lpushClient = util.promisify(client.lpush).bind(client);
const lrangeClient = util.promisify(client.lrange).bind(client);

const set = async (key, value, ttl) => {
  if (ttl) {
    await setClient(key, JSON.stringify(value), "EX", ttl);
  } else {
    await setClient(key, JSON.stringify(value));
  }
};

const get = async (key) => {
  const data = await getClient(key);

  return JSON.parse(data);
};

const deleteKey = async (key) => {
  await deleteKeyClient(key);
};

const exists = async (key) => {
  const isExists = await existsClient(key);

  return isExists === 1;
};

const lpush = async (key, value) => {
  await lpushClient(key, value);
};

const lrange = async (key) => {
  const data = await lrangeClient(key, 0, -1);
  data.map((item, index) => {
    data[index] = JSON.parse(item);
  });
  return data;
};

module.exports = {
  set,
  get,
  exists,
  deleteKey,
  client,
  lpush,
  lrange,
};
