import wordView from './views/wordView'
import searchView from './views/searchView'
import * as model from './model'

const controlWord = async function (word) {
  try {
    // 1) Get query.
    // const query = searchView.getQuery()
    // if (!query) return

    const query = window.location.hash.slice(1)
    if (!query) return

    // 2) Load word.
    await model.loadWord(query)

    // 3) Render word.
    wordView.render(model.state.current)
    console.log(model)
  } catch (err) {
    console.error(err)
  }
}

const controlSearch = function () {}

export const init = function () {
  document.querySelector('#search-input').focus()
  wordView.addHandlerRender(controlWord)
  // searchView.addHandlerSearch(controlWord)
}
