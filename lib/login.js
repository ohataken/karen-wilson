const rpc = require("node-json-rpc");

module.exports = function login(client, id, params, callback) {
  client.call({
    jsonrpc: "2.0",
    method: "login",
    id: id,
    params: params,
  }, callback);
};
