import { wordList } from './WordList.js'
import { getRandomInt, shuffle } from './utils.js'
import Word from './word.js'

export default class WordGame {
  constructor() {
    this.element = document.querySelector('.game')
    this.words = wordList
    this.listLen = this.words.length
    this.gameWords = []
    this.state = {}
  }

  //Valitaan 5 sanaa, voidaan myöhemmin skaalata vaihtuville sanamäärille
  pickWords = (list, listLen) => {
    let randomWords = []

    for (let i = 0; i < 5; i++) {
      const randIndex = getRandomInt(listLen)

      randomWords = randomWords.concat(list[randIndex])
    }
    return randomWords
  }

  setup = list => {
    this.state.finWords = []
    this.state.sveWords = []

    list.forEach(word => {
      const fin = new Word(word.fin)
      const sve = new Word(word.sve)
      fin.setMatch(word.sve)
      sve.setMatch(word.fin)

      this.state.finWords = this.state.finWords.concat(fin)
      this.state.sveWords = this.state.sveWords.concat(sve)
    })
  }

  setChoice = (button, index) => {
    const list = this.state.finWords.concat(this.state.sveWords)
    if (!this.state.hasOwnProperty('word1')) {
      this.state.word1 = list[index]
      this.state.button1 = button
      this.state.button1.style.backgroundColor = '#2D936C'
    } else {
      this.state.word2 = list[index]
      this.state.button2 = button
      this.state.button2.style.backgroundColor = '#2D936C'
      this.checkMatch()
    }
  }

  checkMatch = () => {
    const finSve = this.state.word1.getMatch()
    const sveWord = this.state.word2.getWord()

    //tarkastetaan ovatko match
    //Asetetaan oikein tai väärin
    if (finSve !== sveWord) {
      this.state.button1.style.backgroundColor = 'red'
      this.state.button1.style.borderColor = 'red'
      this.state.button2.style.backgroundColor = 'red'
      this.state.button2.style.borderColor = 'red'
      setTimeout(() => {
        this.state.button1.style.backgroundColor = null
        this.state.button1.style.borderColor = null
        this.state.button2.style.backgroundColor = null
        this.state.button2.style.borderColor = null
      }, 1000)
    }
    //Siivotaan state
    const { word1, word2, ...rest } = this.state
    this.state = rest
  }

  newGame = () => {
    this.gameWords = []
    this.state = {}
    this.render()
  }

  render() {
    this.gameWords = this.pickWords(this.words, this.listLen)
    this.setup(this.gameWords)

    this.state.finWords = shuffle(this.state.finWords)
    this.state.sveWords = shuffle(this.state.sveWords)

    this.element.innerHTML = `
    <div class="word__list">
    <ul id="fin__words">
    ${this.state.finWords
      .map(word => {
        return `
      <li><button aria-label="choose"}>${word.word}</button></li>
      `
      })
      .join('')}
    </ul>
    <ul id="sve__words">
    ${this.state.sveWords
      .map(word => {
        return `
      <li><button aria-label="choose"}>${word.word}</button></li>
      `
      })
      .join('')}
    </ul>
    </div>
    `
    this.element.querySelectorAll('button').forEach((button, index) => {
      button.addEventListener('click', () => {
        this.setChoice(button, index)
      })
    })

    const newBtn = document.createElement('button')
    //Asetetaan napille ominaisuudet
    newBtn.setAttribute('id', 'newGame')
    newBtn.innerHTML = 'uusi peli'
    newBtn.addEventListener('click', () => {
      this.newGame()
    })

    //Lisätään div bodyyn
    this.element.append(newBtn)
  }
}
