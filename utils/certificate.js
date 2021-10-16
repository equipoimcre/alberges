const selfsigned = require('selfsigned');
const fs = require('fs');

const attrs = [{ value: '*.cruzroja.com' }];
const pems = selfsigned.generate(null, {
  keySize: 2048,
  days: 30,
  algorithm: 'sha256',
});

Object.keys(pems).forEach( key =>  {
  const element = pems[key];
  fs.writeFileSync(`./docker/platform/nginx/cert/${key}`, element);
});