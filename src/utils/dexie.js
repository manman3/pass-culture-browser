import Dexie from 'dexie'

import { fetchData } from './request'

export const db = new Dexie("pass_culture")
db.version(1).stores({
  userMediations: 'id'
})

export async function bulkData (method, path, data) {
  let dbMethod = method.toLowerCase()
  dbMethod = `bulk${dbMethod[0].toUpperCase()}${dbMethod.slice(1)}`
  const collectionName = path.split('?')[0]
  const table = db[collectionName]
  return table && table[dbMethod](data)
}

export async function clear () {
  Promise.all(db.tables.map(async table => table.clear()))
}

export async function sync () {
  Promise.all(db.tables.map(async table => {
    const method = 'PUT'
    const path = table.name
    const result = await fetchData(method, path)
    if (result.data) {
      return bulkData(method, path, result.data)
    }
  }))
}