const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  function readWrite(path, contentType) {
    fs.readFile(path, function(err, data) {
      if (contentType) {
        res.writeHead(200, {'Content-Type': contentType});
      }
      res.write(data);
      res.end();
    });
  }
  function genOppTurn() {
    let num = Math.ceil(Math.random() * 100);
    return num > 66 ? 'rock' : num > 33 ? 'paper' : 'scissors';
  }
  function playRPS(player, opp) {
    if (player === opp ) {
      return 'Draw';
    } else if ((player === 'rock' && opp === 'scissors') || (player === 'paper' && opp === 'rock') || (player === 'scissors' && opp === 'paper')) {
      return 'You win';
    } else {
      return 'You lose';
    }
  }
  if (page == '/') {
    readWrite('index.html', 'text/html')
  }
  else if (page == '/api') {
    if (params['player'] === 'rock' || params['player'] === 'paper' || params['player'] === 'scissors') {
      let oppTurn = genOppTurn();
      let gameResult = playRPS(params['player'], oppTurn);
      let pScore = 0;
      let oScore = 0;
      if (gameResult === 'You win') {
        pScore += 1;
      } else if (gameResult === 'You lose') {
        oScore += 1;
      }
      const objToJson = {
        playerTurn: params['player'],
        opponentTurn: oppTurn,
        result: gameResult,
        playerScore: pScore,
        opponentScore: oScore
      }
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(objToJson));
    }
  }
  else if (page == '/css/style.css') {
    readWrite('css/style.css')
  }
  else if (page == '/js/main.js') {
    readWrite('js/main.js', 'text/javascript')
  }
  else {
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
