import { useEffect, useRef, useState } from "react"

const PlayGame = ({ onChangeScore }) => {
  const [defaultData] = useState('Apple sat quietly beneath sunlight near garden Pond where lively cat chased shadows while bird chirped sweetly Dog trotted along grassy path past blooming flowers and buzzing Bees exploring blossoms by blue lake Mountain view stretched endlessly toward distant horizon framed by majestic Trees and golden leaves dancing gently as wind whispered Old man watched world unfold beside sparkling Stream flowing smoothly over round stones Nearby squirrel darted up sturdy tree holding Nut tightly between paws while butterfly floated past like fragile Art in soft morning breeze Village children ran barefoot across field laughing as they discovered hidden path Young artist sat sketching beauty of changing Season under sprawling ancient oak tree as leaves carpeted ground in vibrant hues Beyond forest edge river met calm Valley where sheep grazed among bright meadows their wool shining under warm sunlight Farther down hillside cowbell echoed across distant fields as farmer Walked steadily carrying baskets filled with ripe produce Birds swooped above clear blue Water reflecting sky blending softly with pink clouds stretching across gentle hills Child gathered smooth stones along shore creating tiny Monument to peaceful morning unfolding quietly Garden nearby blossomed with lavender scent filling air with sweet Memories Across lane horse trotted by swinging tail against breeze as sunlit sparkles danced upon Horizons edge Farmers wife knelt harvesting fresh herbs carefully weaving fragrant bundle with twine Lantern glowed warmly on worn wooden table casting Light through farmhouse window illuminating simple life embraced by calm that follows daylight softly fading beyond horizon Stars began emerging quietly one by one in black Sky ushering night across sleeping earth waiting calmly for tomorrow')
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
