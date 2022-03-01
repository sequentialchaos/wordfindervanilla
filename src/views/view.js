export default class View {
  _parentElement
  _data
  _errorMessage
  _message = ``

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError()

    this._data = data
    const markup = this._generateMarkup()
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  update(data) {
    this._data = data
    const newMarkup = this._generateMarkup()

    const newDOM = document.createRange().createContextualFragment(newMarkup)
    const newElements = Array.from(newDOM.querySelectorAll('*'))
    const curElements = Array.from(this._parentElement.querySelectorAll('*'))

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i]

      // Updates changed TEXT.
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent
      }

      // Updates changed ATTRIBUTES.
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        )
      }
    })
  }

  // renderSpinner() {
  //   const markup = `
  //     <div class="spinner">
  //       <svg>
  //         <use href="${icons}#icon-loader"></use>
  //       </svg>
  //     </div>
  //   `;
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <p>${message}</p>
      </div>
    `
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <p>${message}</p>
      </div>
    `
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  _clear() {
    this._parentElement.innerHTML = ''
  }
}
