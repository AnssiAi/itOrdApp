//Tila onko sanapari valmis
//Luo kaksi elementtiä, jotka sekoitetaan pelissä?
//Vain yksi sana?
//Merkataan onko valmis vai ei. Päällä / pois.

export default class Word {
  constructor(word) {
    this.word = word
    this.match = null
  }
  getWord = () => {
    return this.word
  }
  getMatch = () => {
    return this.match
  }
  setMatch = match => {
    this.match = match
  }
}
