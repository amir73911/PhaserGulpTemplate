function SaveGameData(name, gameData) {

    if (typeof(Storage) !== "undefined") {

        localStorage.setItem(name + '_SaveData', JSON.stringify(gameData));
    }
}

function LoadGameData(name) {

    if (typeof(Storage) !== "undefined") {

        var data = localStorage.getItem(name + '_SaveData');

        return (data != null && data != undefined) ? JSON.parse(data) : null;
    }
}