let begin = require('@architect/functions')
let faunadb = require('faunadb')

let client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET
})

function route(req, res) {
  let request = JSON.stringify(req, null, 2)

  // TODO change defaultJS
  let defaultJS = `console.log('Hello frontend! ', ${request})`

  return client.query("Hello FaunaDB").then((result)=> {
    console.log('Hello backend! ', request)
    res({
      js: defaultJS,
      result
    })
  })

}

exports.handler = begin.js.get(route)
