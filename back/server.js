const http = require('http');

let number = getRandomInt(1, 100);
let numbers = [];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

const requestListener = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    if (req.url !== "/api/game") {
        res.writeHead(404);
        res.end();
        return;
    }
    console.log(req.method);
    if (req.method === "GET") {
        res.writeHead(200);
        res.end(JSON.stringify({numbers: numbers}));
        return;
    } else if (req.method === "POST") {
        let body = '';
        req.on('data', kusochek => {
            body += kusochek.toString();
        });
        req.on('end', () => {
            let num = +JSON.parse(body).answer;
            numbers.push(num);
            if (num === number) {
                number = getRandomInt(1, 100);
                numbers = [];
                res.writeHead(200);
                res.end(JSON.stringify({result: "YOU WIN!"}));
            } else if (num < number) {
                res.writeHead(200);
                res.end(JSON.stringify({result: "MORE"}));
            } else if (num > number) {
                res.writeHead(200);
                res.end(JSON.stringify({result: "LESS"}));
            }
        });
        return;
    } else {
        res.writeHead(200);
        res.end();
        return;
    }
}

const server = http.createServer(requestListener);
server.listen(4000);
