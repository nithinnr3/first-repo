const resultText = document.getElementById('resultText');
const scoreBoard = document.getElementById('scoreBoard');
const buttons = document.querySelectorAll('[data-choice]');

async function updateStats() {
  const res = await fetch('/api/stats');
  const stats = await res.json();
  scoreBoard.innerHTML = `
    <span>Total games: ${stats.total || 0}</span>
    <span>Wins: ${stats.win || 0}</span>
    <span>Losses: ${stats.lose || 0}</span>
    <span>Ties: ${stats.tie || 0}</span>
  `;
}

async function play(choice) {
  const res = await fetch('/api/play', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ player: choice }),
  });
  const data = await res.json();
  if (data.error) {
    resultText.textContent = data.error;
    return;
  }
  const phrase = data.result === 'win'
    ? 'You win!'
    : data.result === 'lose'
      ? 'You lose.'
      : 'It is a tie.';
  resultText.textContent = `You chose ${data.player}. Computer chose ${data.computer}. ${phrase}`;
  updateStats();
}

buttons.forEach((button) => {
  button.addEventListener('click', () => play(button.dataset.choice));
});
updateStats();
