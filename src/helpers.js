import { TIMEOUT_SECONDS } from './config'

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`))
    }, s * 1000)
  })
}

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)])
    const data = await res.json()

    if (!res.ok) throw new Error(data.message)
    return data
  } catch (err) {
    throw err
  }
}

export const getJSONs = async function (urls) {
  try {
    const responses = await Promise.all(urls.map((url) => fetch(url)))
    const data = await Promise.all(responses.map((response) => response.json()))
    return data
  } catch (err) {
    throw err
  }
}

export const isObject = (obj) => (obj ?? false)?.constructor?.name === 'Object'
