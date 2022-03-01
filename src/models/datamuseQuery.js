import Query from "./query"

export default class DatamuseQuery extends Query {
  _baseURL = "https://api.datamuse.com/words?"
  _maxResults = 10

  toString() {
    return super.toString() + `&max=${this._maxResults}`
  }

  set maxResults(newMax) {
    this._maxResults = newMax
  }

  get _isValid() {
    return true
  }

  static get possibleParameters() {
    return ["sp", "ml", "sl"].concat(
      [
        "jja",
        "jjb",
        "syn",
        "trg",
        "ant",
        "spc",
        "gen",
        "com",
        "par",
        "bga",
        "bgb",
        "rhy",
        "nry",
        "hom",
        "cns",
      ].map((s) => "rel_" + s)
    )
  }
}
