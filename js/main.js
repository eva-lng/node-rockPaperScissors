if (!localStorage.getItem('player score')) {
  localStorage.setItem('player score', '0');
};
if (!localStorage.getItem('opponent score')) {
  localStorage.setItem('opponent score', '0');
};
window.addEventListener('DOMContentLoaded', () => {
  const initialPlayerScore = localStorage.getItem('player score');
  document.querySelector('#playerScore').textContent = initialPlayerScore;
  const initialOppScore = localStorage.getItem('opponent score');
  document.querySelector('#oppScore').textContent = initialOppScore;
});
document.querySelector('#clickMe').addEventListener('click', makeReq);
document.querySelector('#reset').addEventListener('click', resetScores);

function resetScores() {
  localStorage.setItem('player score', '0');
  localStorage.setItem('opponent score', '0');
  document.querySelector('#playerScore').textContent = localStorage.getItem('player score');
  document.querySelector('#oppScore').textContent = localStorage.getItem('opponent score');
  document.querySelector('#resultMsg').textContent = '';
  document.querySelector('#playerTurn').textContent = '';
  document.querySelector('#opponentTurn').textContent = '';
}

async function makeReq() {
  const userInput = document.querySelector('#userInput').value;
  const res = await fetch(`/api?player=${userInput}`);
  const data = await res.json();

  console.log(data);
  document.querySelector('#playerTurn').textContent = `Your turn: ${data.playerTurn}`;
  document.querySelector('#opponentTurn').textContent = `Opponent turn: ${data.opponentTurn}`;
  document.querySelector('#resultMsg').textContent = data.result;

  const currentPlayerScore = Number(localStorage.getItem('player score'));
  const updatedPlayerScore = currentPlayerScore + data.playerScore;
  document.querySelector('#playerScore').textContent = updatedPlayerScore;
  localStorage.setItem('player score', updatedPlayerScore);

  const currentOppScore = Number(localStorage.getItem('opponent score'));
  const updatedOppScore = currentOppScore + data.opponentScore;
  document.querySelector('#oppScore').textContent = updatedOppScore;
  localStorage.setItem('opponent score', updatedOppScore);
}