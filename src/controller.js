import wordView from "./views/wordView"
import searchView from "./views/searchView"
import * as model from "./model"

const controlWord = async function () {
  try {
    // 1) Get query.
    const query = window.location.hash.slice(1)
    if (!query) return

    // 2) Load word.
    await model.loadWord(query)
    console.log(model.state.current)
    // 3) Render word.
    wordView.render(model.state.current)
  } catch (err) {
    console.error(err)
  }
}

const controlSearch = function () {
  // 1) Get query.
  const query = searchView.getQuery()
  if (!query) return

  // 2) Update hash.
  window.location.hash = query
}

export const init = function () {
  document.querySelector("#search-input").focus()
  wordView.addHandlerRender(controlWord)
  searchView.addHandlerSearch(controlSearch)
}
