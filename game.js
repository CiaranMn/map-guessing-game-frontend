const game = function (difficulty) {

  const options = []
  const winner = {}
  const gameDifficulty = difficulty
  let inProgress = false

  let timer
  let seconds = 30
  let scoreTick
  let score = 1000 * difficultyMultiplier()

  API.getRandomLocation()
    .then(data => { 
      options.push(...data)
      Object.assign(winner, options[randomNum(options.length)])
      let lat = winner.latitude
      let lon = winner.longitude
      let zoom
      switch (gameDifficulty) {
        case "easy":
          zoom = 14
          break
        case "medium":
          zoom = 16
          break
        case "hard":
          zoom = 17
          break
      }
      nameDisplay.innerText = nameInput.value
      updateMap(lat, lon, zoom)
      squares.forEach(square => square.style.opacity = 1)
      mapOnWelcomeOff()
      readyText.style.display='block'
      scoreDisplay.innerText = score
      setTimeout(startGame, 2500)
    })

  function startGame() {
    removeFirstSquare()
    options.forEach(renderGuess)
    readyText.style.display='none'
    setTimeout(() => { 
      timer = setInterval(countDown, 1000)
      let tick = 30 / difficultyMultiplier()
      scoreTick = setInterval(scoreDown, tick, 1) 
      inProgress = true
    }, 1000)
    fadeRandomSquare()
  }

  function stopGame() {
    inProgress = false
    clearInterval(timer)
    clearInterval(scoreTick)
    guesses.style.display = 'none'
    highScores.style.display = 'block'
    squares.forEach(square => square.style.opacity = 0)
    postScore()
    answerText.classList.add('blink')
    answerText.innerHTML = `
      <p>${winner.constituency}</p>
      <p>${winner.postcode}</p>
      <p id="play-again">PLAY AGAIN?</p>
    `
    answerText.style.display='block'
    setTimeout(() => answerText.classList.remove('blink'), 2000)
    timeDisplay.classList.remove('blink')
    mapContainer.style.cursor='pointer'
    mapContainer.addEventListener('click', mapOffWelcomeOn)
    document.addEventListener('keyup', keyRestart)
  }

  function gameOn() {
    return inProgress
  }

  function postScore() {
    let userScore = {}
    userScore['area_id'] = winner.id
    userScore['username'] = nameDisplay.innerText
    userScore['difficulty'] = gameDifficulty
    userScore['score'] = score
    API.postUserScore(userScore)
      .then(response => {
        response['list'].forEach(score => renderScore(score, response['score']))
        console.log(response['list'], response['score'])
      })
  }

  function renderGuess (option) {
    optionEl = document.createElement('tr')
    optionEl.innerHTML = `
      <td class="guess hvr-bounce-in" data-constituency="${option.constituency}">
        ${option.constituency}
      </td>
    `
    optionEl.addEventListener('click', event => {
      if (inProgress && event.target.dataset.constituency === winner.constituency) {
        console.log('User guessed correctly')
        stopGame()
      } else {
        flashRed(scoreDisplay)
        scoreDown(100*difficultyMultiplier())
        event.target.style.color = 'red'
      }
    })
    document.getElementById("guess-table").appendChild(optionEl)
  }

  function countDown() {
    seconds--
    timeDisplay.innerText = `${seconds}s`
    if (seconds === 10) {
      timeDisplay.classList.add('blink')
    } else if (seconds === 0) {
      scoreDisplay.innerText = score
      timeDisplay.classList.remove('blink')
      stopGame()
    }
  }

  function scoreDown (n) {
    score -= n
    scoreDisplay.innerText = score
  }

  function flashRed (text) {
    text.style.color='red'
    setTimeout(() => text.style.color='chartreuse', 200)
  }

  function difficultyMultiplier() {
    switch (gameDifficulty) {
      case "easy":
        return 1
      case "medium":
        return 1.5
      case "hard":
        return 2
    }
  }

  return {
    gameOn
  }
  
}

