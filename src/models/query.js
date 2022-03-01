import { getJSON } from '../helpers'

export default class Query {
  _baseURL = ''

  constructor(parameters) {
    this.parameters = parameters
  }

  async execute() {
    if (!this._isValid) {
      return
    }

    try {
      const data = await getJSON(this.toString())
      return { parameters: this.parameters, url: this.toString(), data: data }
    } catch (err) {
      throw err
    }
  }

  static async executeMany(queries) {
    try {
      const data = await Promise.allSettled(
        queries.map((query) => query.execute())
      )
      console.log(data)
      return data
    } catch (err) {
      throw err
    }
  }

  toString() {
    return (
      this._baseURL +
      Object.entries(this.parameters)
        .map((parameter) => parameter.join('='))
        .join('&')
    )
  }

  get _isValid() {
    return false
  }
}
