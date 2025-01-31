import './App.css';

// Secoue le tél, ça remet à 0
// Message Victoire IA

// Affiche la localisation de l'utilisateur dans le message de victoire
// Générer une musique de victoire

window.addEventListener("devicemotion", function(event) {
      console.log("Shake detected!");
      alert("Shake detected!");
});

const App = () => {

  let currentPlayer = "X";

  function onClick(event: any) {
    if (event.target.classList.contains("cell") && event.target.textContent === "") {
      // Modify display
      event.target.textContent = currentPlayer;

      // Change player
      currentPlayer = currentPlayer === "X" ? "O" : "X";

      // check winner
      checkWin()
    }

    function checkWin() {
      const message = document.getElementById("message")

      const cells = document.getElementsByClassName('cell') as HTMLCollection
      const cellsTextContent: string[] = []
      Array.from(cells).forEach(element => {
        cellsTextContent.push(element.textContent as string)
      });

      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];

      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cellsTextContent[a] && cellsTextContent[a] === cellsTextContent[b] && cellsTextContent[a] === cellsTextContent[c]) {
          if (message) {
            message.innerText = `Le joueur ${currentPlayer} a gagné !`;
          }
          return true;
        }
      }
      if (!cellsTextContent.includes("")) {
        if (message) {
          message.innerText = "Match nul !";
        }
        return true;
      }
      return false;
    }

  }

  return (
    <div>
      <div onClick={onClick} id="grid">
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
      </div>

      <div id="message"></div>
    </div>
  );
};

export default App;
