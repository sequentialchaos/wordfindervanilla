import View from './view'

class SearchView extends View {
  _parentElement = document.querySelector('#search-form')

  getQuery() {
    const query = this._parentElement.querySelector('#search-input').value
    this._clearInput()
    return query
  }

  _clearInput() {
    this._parentElement.querySelector('#search-input').value = ''
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault()
      handler()
    })
  }

  _generateMarkup() {
    return `
      <div>hi</div>
    `
  }
}

export default new SearchView()
