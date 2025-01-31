import './App.css';

// Secoue le tél, ça remet à 0
// Message Victoire IA

// Affiche la localisation de l'utilisateur dans le message de victoire
// Générer une musique de victoire



const App = () => {
  let lastX = 0, lastY = 0, lastZ = 0;
  const shakeThreshold = 15; // Adjust as needed
  let lastTime = 0;

  window.addEventListener("devicemotion", function(event) {
    const acceleration = event.accelerationIncludingGravity;
    if (!acceleration) return;

    const currentTime = new Date().getTime();
    if ((currentTime - lastTime) > 100) { // Check every 100ms
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const deltaX = Math.abs(acceleration.x - lastX);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const deltaY = Math.abs(acceleration.y - lastY);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const deltaZ = Math.abs(acceleration.z - lastZ);

      if (deltaX + deltaY + deltaZ > shakeThreshold) {
        const cells = document.getElementsByClassName('cell') as HTMLCollection
        Array.from(cells).forEach(element => {
          element.textContent = ""
        });

        const message = document.getElementById("message")
        message.innerText = ``;
        document.getElementById("alban")!.innerHTML = ''


      }

      lastX = acceleration.x;
      lastY = acceleration.y;
      lastZ = acceleration.z;
      lastTime = currentTime;
    }
  });

  let currentPlayer = "X";

  function onClick(event: any) {
    if (event.target.classList.contains("cell") && event.target.textContent === "") {
      // Modify display
      event.target.textContent = currentPlayer;

      // check winner
      checkWin()

      // Change player
      currentPlayer = currentPlayer === "X" ? "O" : "X";
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
          displayAlban()
        }
        return true;
      }
      return false;
    }

  }

  function displayAlban() {
    document.getElementById("alban")!.innerHTML = '<img src="https://media.licdn.com/dms/image/v2/D4E35AQHbe-uHn9SYnQ/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1731970161778?e=1738947600&v=beta&t=GgvBnOFpfPtI-FNsbYlDBf1_4n983Y7MQqTgqvUzI3I"/>'
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

      <div id="alban"></div>
    </div>
  );
};

export default App;
