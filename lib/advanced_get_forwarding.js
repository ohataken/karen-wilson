const rpc = require("node-json-rpc");

module.exports = function advancedGetForwarding(client, id, token, callback) {
  client.call({
    jsonrpc: "2.0",
    method: "Advanced.getForwarding",
    id: id,
    params: {
      need_key_type: true,
    },
    token: token,
  }, callback);
};
