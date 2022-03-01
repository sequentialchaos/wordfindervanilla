import { getJSON } from "../helpers"

export default class Query {
  _baseURL = ""

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
      const promises = await Promise.allSettled(
        queries.map((query) => query.execute())
      )
      return promises
        .filter((promise) => promise.status === "fulfilled")
        .map((promise) => promise.value)
    } catch (err) {
      console.log(err)
    }
  }

  toString() {
    return (
      this._baseURL +
      Object.entries(this.parameters)
        .map((parameter) => parameter.join("="))
        .join("&")
    )
  }

  get _isValid() {
    return false
  }
}
