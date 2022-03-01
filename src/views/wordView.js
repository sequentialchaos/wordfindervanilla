import View from './view'

class WordView extends View {
  _parentElement = document.querySelector('#word')

  addHandlerRender(handler) {
    ;['hashchange', 'load'].forEach((ev) =>
      window.addEventListener(ev, handler)
    )
  }

  _generateMarkup() {
    const keys = Object.keys(this._data)
    return `
      <div>
        ${keys.map((key) => this._generateMarkupSection(key)).join('')}
      </div>
    `
  }

  _generateMarkupSection(key) {
    if (!this._data[key]) return ''
    console.log(key, this._data[key])
    return `
      <div>
        <div class="section-title">${key}</div>
        ${this._data[key]
          .map((entry) => this._wordLinkMarkup(entry.word))
          .join(', ')}
      </div>
    `
  }

  _wordLinkMarkup(word) {
    return `<a href="#${word}">${word}</a>`
  }
}

export default new WordView()
