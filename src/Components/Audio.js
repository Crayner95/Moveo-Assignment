import React from 'react';

function App() {
  let audio = new Audio("../Sounds/fire.mp3")

  const start = () => {
    audio.play()
  }

  return (
    < div >
      <button onClick={start}>Play</button>
    </div >
  );
}

export default App;
