const EndGame = ({ score, onGame }) => {
  return (
    <div className="endGame">
      <div className="result">
        <div>
          <div className="title">Right words:</div>
          <div className="number">{score.right}</div>
        </div>
        <div>
          <div className="title">Wrong words:</div>
          <div className="number">{score.wrong}</div>
        </div>
      </div>
      <button className="btnPlay" onClick={() => onGame('playGame')}>Play Again</button>
      <a href="/" className="btnHome">Home</a>
    </div>
  )
}

export default EndGame
