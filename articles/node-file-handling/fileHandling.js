const fileSystem = require('fs')
const textToBeWritten = 'Hopefully, you enjoyed going through the article'
fileSystem.writeFile('./newFileCreated1.txt', textToBeWritten, (err,data)=>{
    console.log("inside file 1")
})
console.log("Creating and Writing to File DONE! :)111111")
const textToBeWritten2 = 'Hopefully, you enjoyed going through the blog'
fileSystem.writeFile('./newFileCreated2.txt', textToBeWritten2, (err,data)=>{
    console.log("inside file 2")
})
console.log("Creating and Writing to File DONE! :)2222222")
