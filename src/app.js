import WordGame from './components/wordGame.js'

const getDeviceType = () => {
  const ua = navigator.userAgent
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return 'mobile'
  }
  return 'desktop'
}

const device = getDeviceType()

//Peli
//Valitse sana - sitten toisesta kielestä vastine
//Jos valitsee saman kielisen sanan se muutetaan päävalinnaksi
//Kun valitsee toisen kielen sanan tarkistetaan onko pari oikein
let gameboard = new WordGame(device)
gameboard.render()
