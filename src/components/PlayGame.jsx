import { useEffect, useRef, useState } from "react"

const PlayGame = ({ onChangeScore }) => {
  const [defaultData] = useState('It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout The point of using Lorem Ipsum is that it has a more or less normal distribution of letters as opposed to using Content here content here making it look like readable English Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text and a search for will uncover many web sites still in their infancy Various versions have evolved over the years sometimes by accident sometimes on purpose injected humour and the like')
  const [dataTyping, setDataTyping] = useState([])
  const [textTyping, setTextTyping] = useState({
    value: '',
    position: 0
  })
  const [timeLeft, setTimeLeft] = useState(60)
  const inputRef = useRef(null)

  useEffect(() => {
    const addWord = (quantity = 60) => {
      const arrayDefaultDB = defaultData.split(' ')
      const dataTypingTest = []
      for (let i = 0; i < quantity; i++) {
        const position = Math.floor(Math.random() * arrayDefaultDB.length)
        dataTypingTest.push({
          value: arrayDefaultDB[position],
          status: null
        })
      }
      setDataTyping(dataTypingTest)
    }
    if (dataTyping.length === 0 || textTyping.position >= dataTyping.length) {
      addWord()
      setTextTyping({ ...textTyping, position: 0 })
    }
  }, [textTyping.position])

  const handleChangeTyping = e => {
    const valueInput = e.target.value
    if (!valueInput.includes(' ')) {
      setTextTyping({
        ...textTyping,
        value: valueInput
      })
    } else if (textTyping.value !== '') {
      checkResult()
    }
  }

  const checkResult = () => {
    const dataCheck = dataTyping;
    const wordCheck = dataCheck[textTyping.position].value
    if (textTyping.value === wordCheck) {
      dataCheck[textTyping.position].status = true
      onChangeScore('right')
    } else {
      dataCheck[textTyping.position].status = false
      onChangeScore('wrong')
    }
    setDataTyping(dataCheck)
    setTextTyping({
      value: '',
      position: textTyping.position + 1
    })
  }

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)

      return () => clearInterval(timerId)
    }
  }, [timeLeft])

  useEffect(() => {
    inputRef.current.focus()
  })

  return (
    <div className="playing">
      <p className="time-left">Remaining time: {timeLeft}</p>
      <ul className="list">
        {
          dataTyping.map((word, index) => (
            <li
              key={index}
              className={word.status === true ? 'true' : word.status === false ? 'false' : ''}
            >
              {word.value}
            </li>
          ))
        }
      </ul>
      <div className="inputForm">
        <input
          type="text"
          value={textTyping.value}
          onChange={handleChangeTyping}
          ref={inputRef}
        />
      </div>
      <a href="/" className="exit-game">Exit Game</a>
    </div>
  )
}

export default PlayGame
