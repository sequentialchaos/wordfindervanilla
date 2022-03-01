import Query from './query'

export default class DictionaryApiQuery extends Query {
  _baseURL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

  toString() {
    return this._baseURL + this.parameters
  }

  get _isValid() {
    return true
  }
}
