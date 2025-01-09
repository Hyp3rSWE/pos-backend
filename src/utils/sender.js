const dgram = require('dgram');
const os = require('os');

const client = dgram.createSocket('udp4');

function getBroadcastAddress() {
    const interfaces = os.networkInterfaces();
    for (const ifaceName in interfaces) {
        const iface = interfaces[ifaceName];
        for (const details of iface) {
            if (details.family === 'IPv4' && !details.internal) {
                const ipParts = details.address.split('.').map(Number);
                const subnetParts = details.netmask.split('.').map(Number);
                const broadcastParts = ipParts.map((ip, i) => ip | (~subnetParts[i] & 255));
                return broadcastParts.join('.');
            }
        }
    }
    throw new Error('No suitable network interface found.');
}

const discoveryPort = 41234;
const broadcastAddress = getBroadcastAddress();
const discoveryMessage = 'Who has the database?';

function sendBroadcastMessage(callback) {
    const timeout = setTimeout(() => {
        console.log('No response received within timeout period.');
        callback(null, () => {}); // Passing an empty function as fallback
        client.close();
    }, 10000); // 10-second timeout

    client.bind(() => {
        client.setBroadcast(true);

        const interval = setInterval(() => {
            const messageBuffer = Buffer.from(discoveryMessage);
            client.send(messageBuffer, 0, messageBuffer.length, discoveryPort, broadcastAddress, (err) => {
                if (err) {
                    console.error('Error sending broadcast message:', err);
                } else {
                    console.log('Broadcast message sent');
                }
            });
        }, 2000); // Send broadcast every 2 seconds

        // Listen for responses
        client.on('message', (msg, rinfo) => {
            clearTimeout(timeout);
            clearInterval(interval); // Clear the interval when a message is received

            const response = JSON.parse(msg.toString());
            console.log(`Received database server IP: ${response.ip} from ${rinfo.address}:${rinfo.port}`);

            // Pass the IP address and the interval clearing function to the callback
            process.env.DB_HOST = response.ip;

            callback(response.ip, () => clearInterval(interval));  
            client.close();
        });
    });
}

module.exports = { sendBroadcastMessage };
