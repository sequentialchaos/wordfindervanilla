import { getJSONs, isObject } from './helpers'
import Query from './models/query'
import DatamuseQuery from './models/datamuseQuery'
import DictionaryApiQuery from './models/dictionaryApiQuery'
import Query from './models/query'

export const state = {
  current: {},
  search: {
    query: '',
    results: [],
  },
  history: [],
}

const createQueries = function (word) {
  const datamuseQueries = DatamuseQuery.possibleParameters.map(
    (parameter) => new DatamuseQuery({ [parameter]: word })
  )
  const dictionaryApiQuery = new DictionaryApiQuery(word)
  return datamuseQueries.concat(dictionaryApiQuery)
}

export const getWordData = async function (word) {
  const queries = createQueries(word)
  return await Query.executeMany(queries)
}

export const loadWord = async function (word) {
  const data = await getWordData(word)
  data.forEach((entry) => {
    const { parameters } = entry
    if (isObject(parameters)) {
      const key = Object.keys(parameters)[0]
      state.current[key] = entry.data
    } else {
      state.current.definitions = entry.data
    }
  })
  // return data
}
