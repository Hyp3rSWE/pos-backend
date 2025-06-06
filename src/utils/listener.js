const dgram = require('dgram');
const os = require('os');

function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const config of iface) {
      if (config.family === 'IPv4' && !config.internal) {
        return config.address;
      }
    }
  }
  return '127.0.0.1'; 
}

function handleMessage(msg) {
  if (msg.toString().trim() === 'Who has the database?') {
    return JSON.stringify({ ip: getLocalIPAddress() });
  }
  return 'Invalid message';
}

function startListener() {
  const server = dgram.createSocket('udp4');

  server.on('message', (msg, rinfo) => {
    console.log(`Received message: "${msg}" from ${rinfo.address}:${rinfo.port}`);

    const response = handleMessage(msg);
    server.send(response, rinfo.port, rinfo.address, (err) => {
      if (err) {
        console.error('Error sending response:', err);
      } else {
        console.log(`Response sent: "${response}"`);
      }
    });
  });

  server.bind(41234, () => {
    console.log('Responder listening on port 41234...');
  });
}

module.exports = { startListener };
