const rpc = require("node-json-rpc");

module.exports = function basicGetStatus(client, id, token, callback) {
  client.call({
    jsonrpc: "2.0",
    method: "Basic.getStatus",
    id: id,
    params: {
      need_key_type: true,
    },
    token: token,
  }, callback);
};
