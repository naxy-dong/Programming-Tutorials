const fs = require("fs");

/*
    fs stands for file system, it's a module to manipulate files(read files, delete files, and rename files)

    here are some common usage/method of the fs module

    1. read files
        fs.readFile(filename, callback)
            //it just reads the filename and returns the data
    2. create files
        fs.appendFile(filename, content, callback)
            //if the filename does not exist, it will create a new file
        fs.open(filename, flag, callback)
            //flag(very similar in python) "w" is for writing, "r" is for reading
        fs.writeFile(filename, content, callback)
            //if the filename does not exist, it will create a new file
    3. update files
        fs.appendFile(filename, content, callback)
        fs.writeFile(filename, content, callback)
            // ******Important difference: 
                the appendFile will ADD content to an file
                the writeFile will REPLACE content to an file
    4. delete files
        fs.unlink(filename, callback)
    5. rename files
        fs.rename(originalFilename, newFilename, callback)
*/