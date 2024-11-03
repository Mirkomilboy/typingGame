const Home = ({ onGame }) => {
  return (
    <div className="home">
      <div className="title">TYPING GAME</div>
      <div className="author">Developed by <a href="https://github.com/Mirkomilboy" target="_blank">MIrkomilboy</a></div>
      <button className="btnPlay" onClick={() => onGame('playGame')}>Play Game</button>
      <p className="note"><i>Note:</i> game will continue for 60 seconds</p>
    </div>
  )
}

export default Home
