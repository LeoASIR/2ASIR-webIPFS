const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI5MTYxZWRBRGQ1ZDQ3MTUxNWFiQjZhODVlRUY1ODUyNzRGM0UxQjEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTQ4MTQ4ODY4MTcsIm5hbWUiOiJjYWNhIn0.7DlggjiMXhiPenFAH7il_cw4BaISb1UsoHRA08vFePk"

const { Web3Storage, File, getFilesFromPath } = require('web3.storage')
const fs = require("fs")


function makeStorageClient () {
    return new Web3Storage({ token })
  }

async function storeFiles (files) {
    const client = makeStorageClient()
    const cid = await client.put(files)
    console.log('stored files with cid:', cid)
    return cid
  }

  
async function getFiles (path) {
    const files = await getFilesFromPath(path)
    console.log(`read ${files.length} file(s) from ${path}`)
    return files
  }
  
const client = makeStorageClient()
const boot = async () => {
    const files = await getFiles(__dirname + '/build')
    await storeFiles(files)
}

boot()
