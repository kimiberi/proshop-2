const http = require('http');

const server = http.createServer((req, res) => {
    // console.log(req);
    const { headers, url, method } = req;
    console.log(headers, url, method);
    res.end();
});

const PORT = 3001;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));