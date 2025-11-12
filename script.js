let player1 = '';
let player2 = '';
let currentPlayer = '';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

const submitBtn = document.getElementById('submit');
const inputSection = document.getElementById('input-section');
const gameSection = document.getElementById('game-section');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

submitBtn.addEventListener('click', () => {
  player1 = document.getElementById('player1').value.trim();
  player2 = document.getElementById('player2').value.trim();

  if (player1 === '' || player2 === '') {
    alert('Please enter names for both players.');
    return;
  }

  inputSection.classList.add('hidden');
  gameSection.classList.remove('hidden');

  currentPlayer = player1;
  messageDiv.textContent = `${currentPlayer}, you're up`;
  gameActive = true;
});

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = parseInt(cell.id) - 1;

    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer === player1 ? 'X' : 'O';
    cell.textContent = board[index];

    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer} congratulations you won!`;
      gameActive = false;
      return;
    }

    if (!board.includes('')) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageDiv.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}
