// -----------------------------------------------------------------
let radius = 25;
let airportName = 'PHNL';
function checkUser(spotCoordinates) {
    let newRadius = distanceInKmBetweenEarthCoordinates(
        spotCoordinates[0],
        spotCoordinates[1],
        geofs.mainAirportList[airportName][0],
        geofs.mainAirportList[airportName][1],
    );
    // console.log(`${spotCoordinates[0]} ${spotCoordinates[0]}`)

    if (newRadius < radius) {
        //point is inside the circle
        return true
        // console.log(`${callsign} is in`)
    } else if (newRadius > radius) {
        //point is outside the circle
        return false
    } else {
        //point is on the circle
        return true
        // console.log(`${callsign} is in`)
    }
}
function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}
if (Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;
        // if the argument is the same array, we can be sure the contents are same as well
    if (array === this)
        return true;
        // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;
        for (var i = 0, l = this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i]))
                    return false;
                } else if (this[i] != array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });
function check (mObj) {
    let internalArr = [];
    for (const [key, value] of Object.entries(mObj)) {
        try {
            if (value.lastUpdate.co) {
                if (checkUser(value.lastUpdate.co, value.lastUpdate.cs)) {
                    // console.log(key)
                    // usersIn.push(value.lastUpdate.cs)
                    internalArr.push(key);
                }
            }
        }
        catch (error) {
            console.log("Key:" + key + "Value:" + value)
        }
    }
    return internalArr;    
}
let airspace = {};
let a;
let b;
let sonarSound = new Audio('https://raw.githubusercontent.com/meatbroc/geofs-atc-airspace/main/sonar.mp3');
function action () {
    console.log(a);
    console.log(b);
    sonarSound.play();
}
airspace.init = function () {
    a = check(multiplayer.users)
    b = check(multiplayer.users)
    function c () {
        if (!a.equals(b)) {
            action()
        }
        a = b;
        b = check(multiplayer.users)
    }
    airspace.interval = setInterval(c, 200)
}
airspace.stop = function () {
    clearInterval(airspace.interval);
    a = undefined;
    b = undefined;
}
