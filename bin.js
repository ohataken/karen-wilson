const rpc = require("node-json-rpc");
const karenWilson = require("./index");

HOST = process.env.HOST || "192.168.1.1";
USERNAME = process.env.USERNAME || "admin";
PASSWORD = process.env.PASSWORD || "password";

const client = new rpc.Client({
  port: 80,
  host: HOST,
  path: "/api",
  strict: true,
});

const subcommandTable = {
  clients: {
    description: "dhcp clients",
    proc: () => {
      karenWilson.login(client, 1, {
        id: USERNAME,
        password: PASSWORD,
      }, (err, res) => {
        karenWilson.basicGetStatus(client, 1, res.token, (err, res) => {
          res.result.dhcp_clients.forEach((cl) => {
            console.log(cl);
          });
        });
      });
    }
  },

  forwardings: {
    description: "port forwardings",
    proc: () => {
      karenWilson.login(client, 1, {
        id: USERNAME,
        password: PASSWORD,
      }, (err, res) => {
        karenWilson.advancedGetForwarding(client, 1, res.token, (err, res) =>{
          console.log(res.result.forwarding);
        });
      });
    }
  },

  help: {
    description: "help",
    proc: () => {
      const keys = Object.keys(subcommandTable);
      keys.forEach((key) => {
        console.log(subcommandTable[key].description);
      });
    }
  }
};

if (process.argv.length > 2 && process.argv[2] in subcommandTable) {
  subcommandTable[process.argv[2]].proc();
}
