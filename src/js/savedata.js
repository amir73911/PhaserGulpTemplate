// Store the necessary data as object properties
var SaveData = {};

function SaveGameData(gameName) {

    if (typeof(Storage) !== "undefined") {

        localStorage.setItem(gameName + '_SaveData_49353464236244863490683', JSON.stringify(SaveData));
    }
};

function LoadGameData(gameName) {

    if (typeof(Storage) !== "undefined") {

        var data = localStorage.getItem(gameName + '_SaveData_49353464236244863490683');

        if (data != null && data != undefined) {

            SaveData = JSON.parse(data);
        }
    }
};