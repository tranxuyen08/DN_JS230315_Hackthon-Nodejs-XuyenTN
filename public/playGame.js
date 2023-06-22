async function renderPlayer() {
  const url = window.location.href
  const parts = url.split("/")
  const id = parts[parts.length - 1];
  const response = await fetch(`http://localhost:8000/playing-game/${id}`);
  const jsonData = await response.json();
  const converData = JSON.parse(jsonData)
  const players = converData[0].players;
  const player1 = players[0].player1;
  const player2 = players[1].player2;
  const player3 = players[2].player3;
  const player4 = players[3].player4;
  const render = document.querySelector('.player')
  const htmlPlayer = `
  <tr>
            <th>#</th>
            <th>${player1}</th>
            <th>${player2}</th>
            <th>${player3}</th>
            <th>${player4}</th>
            </tr>
  `
  render.innerHTML += htmlPlayer
}