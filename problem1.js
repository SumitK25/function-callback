const fs = require('fs');
const createAndDeleteJSON = (callback) => {
    callback;
};
const directoryCreator = () => {
    let dir = './FS Callback/DataStorage/';
    if (fs.existsSync(dir)) {
        console.log('Directory exists!');
    } else {
        fs.mkdir('./FS Callback/DataStorage/', { recursive: true }, (err) => {
            if (err) {
                throw err;
            }
            else {
                console.log("Directory Created.")
            }
        });
    }
};
const creatingJSON = (fileName = fileNameCreator(), data) => {
    fs.writeFile("./FS Callback/DataStorage/" + fileName.toString() + ".json", data, function (err) {
        if (err) {
            console.log('error', err);
        }
        else {
            console.log("JSON Created", fileName);
        }
    });
};
const directoryDeleator = () => {
    fs.readdir('./FS Callback/DataStorage/', (err, files) => {
        if (err)
            console.log(err);
        else {
            console.log("\nCurrent directory filenames:");
            files.forEach(file => {
                deleteJSON(file);
            })
        }
    })
};
const deleteJSON = (fileName) => {
    fs.unlink("./FS Callback/DataStorage/" + fileName.toString(), (err) => {
        if (err) {
            throw err;
        }
        else {
            console.log("Deleted ./FS Callback/DataStorage/" + fileName.toString());
        }
    });
};
function fileNameCreator() {
    var text = "";
    var possible = "";
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
module.exports = { createAndDeleteJSON, directoryCreator, creatingJSON, directoryDeleator }