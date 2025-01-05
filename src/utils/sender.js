const dgram = require('dgram');
const os = require('os')



// Create a UDP socket to send the broadcast message
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





// Define the UDP port for communication
const discoveryPort = 41234;
const broadcastAddress = getBroadcastAddress(); // Broadcast to all machines on the network


console.log(broadcastAddress)

// The discovery message to send
const discoveryMessage = 'Who has the database?';

// Send the discovery message
client.bind(() => {
    client.setBroadcast(true); // Enable broadcasting

    // Send the discovery message to the broadcast address
    const messageBuffer = Buffer.from(discoveryMessage);
    client.send(messageBuffer, 0, messageBuffer.length, discoveryPort, broadcastAddress, (err) => {
        if (err) {
            console.error('Error sending broadcast message:', err);
        } else {
            console.log('Broadcast message sent');
        }
    });
});

// Listen for responses from the database server
client.on('message', (msg, rinfo) => {
    const response = JSON.parse(msg.toString());
    console.log(`Received database server IP: ${response.host} from ${rinfo.address}:${rinfo.port}`);
    client.close(); // Close the client after receiving a response
});

// Timeout for waiting for the response
setTimeout(() => {
    console.log('No response received within timeout period.');
    client.close();
}, 50000); // 5-second timeout