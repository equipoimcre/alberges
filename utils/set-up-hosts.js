const hosts = require('hosts-etc');

function addHost(hostName) {
  const host = new hosts.Host(hostName, "127.0.0.1");
  hosts.set(host);
}

const HOST_LIST = [
  "shelter-evaluation.cruzroja.com",
  "api.shelter-evaluation.cruzroja.com",
  "local.app.shelter-evaluation.cruzroja.com",
  "local.app.api.shelter-evaluation.cruzroja.com"
];

HOST_LIST.forEach( host => addHost(host));