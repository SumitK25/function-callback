const fs = require('fs');
const workingDir = __dirname + "/";

const problemFunction = () => {
    normalToUpper("lipsum.txt", () => {
        upperToLower(undefined, () => {
            sortLowerCase(undefined, () => {
                deleteUnwantedFile();
            });
        });
    });

};

const normalToUpper = (fileName = 'lipsum.txt', callback = () => { }, newFileName = "UpperCase.txt") => {
    let path = (workingDir + fileName);
    fs.readFile(path, (err, data) => {
        if (err) {
            throw err;
        }
        else {
            dataString = data.toString();
            fs.writeFile(workingDir + newFileName, dataString.toUpperCase(), function (err) {
                if (err)
                    console.log('error', err);
                else {
                    console.log("Upper Case File Created");
                    fileNameUpdater(newFileName, callback);
                }
            });
        }
    });
}

const upperToLower = (fileName = "UpperCase.txt", callback = () => { }, newFileName = "LowerCase.txt") => {
    fs.readFile(workingDir + fileName, (err, data) => {
        if (err) throw err;
        dataString = data.toString();
        fs.writeFile(workingDir + newFileName, dataString.toLowerCase().split(".").map((eachLine) => { return eachLine.trim() }).join('\n').trim(), function (err) {
            if (err)
                console.log('error', err);
            else {
                console.log("Lower Case File Created");
                fileNameUpdater(newFileName, callback);
            }
        });
    });
}

const sortLowerCase = (fileName = "LowerCase.txt", callback = () => { }, newFileName = "SortedLowerCase.txt") => {
    fs.readFile(workingDir + fileName, (err, data) => {
        if (err) throw err;
        let dataString = data.toString();
        fs.writeFile(workingDir + newFileName, dataString.split("\n").sort().join("\n"), function (err) {
            if (err)
                console.log("error", err);
            else {
                console.log("Sorted Lower Case File Created");
                fileNameUpdater(newFileName, callback);
                //callback();
            }
        });
    });
}

const deleteUnwantedFile = (fileName = "filenames.txt") => {
    fs.readFile(workingDir + fileName, (err, data) => {
        if (err)
            console.log("error", err);
        else {
            fileList = data.toString().trim().split("\n")
            fileList.forEach(element => {
                fs.unlink(workingDir + element, (err) => {
                    if (err) throw err;
                    console.log("Deleted " + workingDir + element);
                });
            });
        }
    });
}

const fileNameUpdater = (fileName, callbacks = () => { }) => {
    fs.appendFile(workingDir + 'filenames.txt', fileName + "\n", 'utf8', (err) => {
        if (err) {
            throw err;
        }
        else {
            console.log("The " + fileName + " was appended to file!");
            callbacks();
        }
    });

}

module.exports = { problemFunction }