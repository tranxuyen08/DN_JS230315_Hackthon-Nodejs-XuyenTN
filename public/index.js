

 function handleCreateGame(e) {
  // const dbJson = path.join(__dirname, '../data/data-player.json')
  let randomID = Math.random().toString(36).substr(2, 9)
  const player1 = document.getElementById('player1').value;
  const player2 = document.getElementById('player2').value;
  const player3 = document.getElementById('player3').value;
  const player4 = document.getElementById('player4').value;

  if (player1 === '' || player2 === '' || player3 === '' || player4 === '') {
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'block';
    return;
  }

  fetch("http://localhost:8000/add-player", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        id: randomID,
        player1: player1,
        player2: player2,
        player3: player3,
        player4: player4
      }
    )
  })
  window.location.href = `http://localhost:8000/playing-game/${randomID}`
}

const form = document.getElementById('score-form');
form.addEventListener('submit', (e) => {
  e.preventDefault()
  handleCreateGame()
});