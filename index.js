require('dotenv').config();  // For stashing secret


const server = require('./server');

const port = process.env.PORT = 5001;

server.listen(port, () => {
    console.log(`\n $$$$ webauth-iii_Challenge on http://localhost${port} \n`);
})