// ==UserScript==
// @name         ATC Buttons
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds an atc radar button
// @author       meatbroc & meatbroc2
// @match        https://geo-fs.com/geofs.php*
// @match        https://*.geo-fs.com/geofs.php*
// @match        https://www.geo-fs.com/geofs.php?v=3.82
// @grant        none
// ==/UserScript==

(function () {
    let radius = 1;
    let airportName = "PHNL";
    function checkUser(spotCoordinates) {
        let newRadius = distanceInKmBetweenEarthCoordinates(
            spotCoordinates[0],
            spotCoordinates[1],
            geofs.mainAirportList[airportName][0],
            geofs.mainAirportList[airportName][1],
        );

        if (newRadius < radius) {
            //point is inside the circle
            return true;
        } else if (newRadius > radius) {
            //point is outside the circle
            return false;
        } else {
            //point is on the circle
            return true;
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
        console.warn(
            "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.",
        );
    // attach the .equals method to Array's prototype to call it on any array
    Array.prototype.equals = function (array) {
        // if the other array is a falsy value, return
        if (!array) return false;
        // if the argument is the same array, we can be sure the contents are same as well
        if (array === this) return true;
        // compare lengths - can save a lot of time
        if (this.length != array.length) return false;
        for (var i = 0, l = this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i])) return false;
            } else if (this[i] != array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    };
    // Hide method from for-in loops
    Object.defineProperty(Array.prototype, "equals", { enumerable: false });
    function check(mObj) {
        let internalArr = [];
        for (const [key, value] of Object.entries(mObj)) {
            try {
                if (value.lastUpdate.co !== undefined && value.lastUpdate.co !== null) {
                    if (checkUser(value.lastUpdate.co, value.lastUpdate.cs)) {
                        internalArr.push(key);
                    }
                }
            } catch (error) {
            }
        }
        return internalArr;
    }
    let airspace = {};
    let visible = {};
    let a;
    let b;
    let d;
    let e;
    let sonarSound = new Audio(
        "https://raw.githubusercontent.com/meatbroc/geofs-atc-airspace/main/sonar.mp3",
    );
    function action() {
        sonarSound.play();
        ui.notification.show(`someone entered ${airportName}'s airspace`);
    }
    airspace.init = function () {
        a = check(multiplayer.users);
        b = check(multiplayer.users);
        function c() {
            if (!a.equals(b)) {
                action();
            }
            a = b;
            b = check(multiplayer.users);
        }
        airspace.interval = setInterval(c, 200);
    };
    airspace.stop = function () {
        clearInterval(airspace.interval);
        a = undefined;
        b = undefined;
    };
    visible.init = function () {
        d = Object.keys(multiplayer.visibleUsers).map((key) => key);;
        e = Object.keys(multiplayer.visibleUsers).map((key) => key);;
        function f() {
            if (!d.equals(e)) {
                action();
            }
            d = e;
            e = Object.keys(multiplayer.visibleUsers).map((key) => key);
        }
        visible.interval = setInterval(f, 200);
        console.log('ohio')
    }
    visible.stop = function () {
        console.log('fanum tax')
        clearInterval(visible.interval);
        d = undefined;
        e = undefined;
    }
    const style = document.createElement("style");
    style.innerHTML = `
    .ext-autopilot-pad {
        width: 90px;
        margin: 0px 10px;
    }
    .ext-autopilot-bar {
        opacity: 0.5;
        margin-top: 5px;
        white-space: nowrap;
        display: flex;
        align-items: flex-start;
        pointer-events: all;
    }
    .ext-control-pad {
        border: 1px solid #888;
        background-color: #000;
        box-shadow: 0px 0px 5px #000;
        border-radius: 15px;
        cursor: pointer !important;
    }
    .ext-autopilot-controls {
        vertical-align: bottom;
        display: none;
        margin-right: 10px;
    }
    .ext-autopilot-control {
        position: relative;
        text-align: center;
        margin: 0px 5px;
        color: white;
        line-height: 25px;
        display: inline-block;
    }
    .ext-autopilot-control span {
        display: block;
        text-align: center;
        text-shadow: #000 1px 1px 3px;
        font-size: 12px;
        top: 2px;
        position: relative;
    }
    .ext-autopilot-bar .ext-autopilot-switch .ext-switchRight {
        border-radius: 0px 15px 15px 0px;
        left: 0px;
    }
    .ext-autopilot-bar .ext-autopilot-switch .ext-switchLeft {
        border-radius: 15px 0px 0px 15px;
        border-right: 5px;
        right: -3px;
    }
    .ext-autopilot-bar .ext-autopilot-switch a {
        user-select: none;
        -webkit-user-select: none;
        position: relative;
        display: inline-block;
        width: 35px;
        height: 17px;
        line-height: 19px;
        cursor: pointer;
        color: white;
        background: #000;
        margin: 2px 0px;
        display: inline-block;
        border: 1px solid white;
        box-shadow: 0px 0px 5px #000;
    }
    .ext-autopilot-bar .ext-autopilot-control {
        position: relative;
        text-align: center;
        margin: 0px 5px;
        color: white;
        line-height: 25px;
        display: inline-block;
    }
    .ext-autopilot-bar .ext-autopilot-course {
        width: 35px !important;
    }
    .ext-numberDown {
        border-radius: 15px 0px 0px 15px;
        line-height: 23px;
        right: -5px;
        position: relative !important;
    }
    .ext-numberUp {
        border-radius: 0px 15px 15px 0px;
        line-height: 26px;
        left: -5px;
        position: relative !important;
    }
    .ext-autopilot-control .ext-numberDown,.ext-autopilot-control .ext-numberUp {
        user-select: none;
        -webkit-user-select: none;
        vertical-align: top;
        cursor: pointer;
        text-align: center;
        color: white;
        background: #000;
        margin: 0px;
        width: 30px;
        display: inline-block;
        border: 1px solid white;
        height: 25px;
        box-shadow: 0px 0px 5px #000;
    }
    .ext-autopilot-control .ext-numberValue {
        font-family: 'LCD-Bold', monospace;
        font-size: 20px !important;
        letter-spacing: 1px;
        display: inline-block;
        vertical-align: top;
        padding: 0px 5px;
        margin: 0px;
        background: #000;
        border: 1px solid;
        border-radius: 0px;
        height: 25px;
        line-height: 26px;
        box-shadow: 0px 0px 5px #000;
        color: white;
        width: 80px;
        text-align: right;
    }
`;
    document.head.appendChild(style);
    const controlButton = document.createElement("div");
    controlButton.classList.add("ext-autopilot-bar");
    controlButton.innerHTML = `
                <div class="ext-control-pad ext-autopilot-pad" id="atc-button" tabindex="0">
                    <div class="control-pad-label transp-pad">AIRSPACE</div>
                    `;
    const container = document.getElementsByClassName("geofs-ui-top");
    container[0].appendChild(controlButton);
    const controlElmnt = document.createElement("div");
    controlElmnt.classList.add("ext-autopilot-controls");
    controlElmnt.style.display = "none";
    controlElmnt.innerHTML = `
                    <div class="ext-autopilot-control">
                        <span class="ext-autopilot-switch ext-autopilot-mode">
                            <a class="ext-switchLeft" data-method="setMode" value="HDG" id="radar-sel">RDR</a>
                            <a class="ext-switchRight" data-method="setMode" value="NAV" id="vis-sel">VIS</a>
                        </span>
                    </div>
    `;
    const radiusElmnt = document.createElement('div');
    radiusElmnt.classList.add('ext-autopilot-control');
    radiusElmnt.style.display = 'none';
    radiusElmnt.innerHTML = `
                        <a class="ext-numberDown" id="radius-selDown">-</a>
                        <input class="ext-numberValue ext-autopilot-course" min="0" max="359" data-loop="true" step="1" maxlength="3" value="1">
                        <a class="ext-numberUp" id="radius-selUp">+</a>
                        <span>RDR RADIUS</span>
    `;
    const container2 = document.getElementsByClassName("ext-autopilot-bar");
    container2[0].appendChild(controlElmnt);
    container2[0].appendChild(radiusElmnt);
    let extMode = 0;
    document
        .getElementById("atc-button")
        .addEventListener("click", function () {
            const autopilotState = this.classList.toggle("active");
            if (this.classList.contains("active")) {
                controlElmnt.style.display = "block";
                this.classList.add('green-pad')
                if (this.classList.contains("red-pad")) {
                    this.classList.remove("red-pad")
                }
            } else {
                controlElmnt.style.display = "none";
                radiusElmnt.style.display = "none";
                if (extMode === 1) {
                    airspace.stop()
                    document.getElementById("radar-sel").classList.remove('green-pad')
                } else if (extMode === 2) {
                    visible.stop()
                    document.getElementById("vis-sel").classList.remove('green-pad')
                }
                extMode = 0;
                this.classList.remove('green-pad')
                this.classList.add('red-pad')
                setTimeout(() => {
                    this.classList.remove('red-pad')
                }, 3000)
            }
        });
    document
        .getElementById("radar-sel")
        .addEventListener("click", function () {
            if (extMode === 0) {
                extMode = 1;
                airspace.init()
                this.classList.add('green-pad')
            }
            if (extMode === 2) {
                visible.stop()
                document.getElementById("vis-sel").classList.remove('green-pad')
                extMode = 1;
                airspace.init();
                this.classList.add('green-pad')
            }
            radiusElmnt.style.display = "block";
        });
    document
        .getElementById("vis-sel")
        .addEventListener("click", function () {
            if (extMode === 0) {
                extMode = 2;
                visible.init()
                this.classList.add('green-pad')
            }
            if (extMode === 1) {
                extMode = 2;
                airspace.stop()
                visible.init()
                document.getElementById("radar-sel").classList.remove('green-pad')
                this.classList.add('green-pad')
            }
            radiusElmnt.style.display = "none";
        });
    document
        .getElementById("radius-selUp")
        .addEventListener("click", function () {
            if (radiusElmnt.childNodes[3].value < 25) {
                radiusElmnt.childNodes[3].value++
            }
            radius = parseInt(radiusElmnt.childNodes[3].value)
        });
    document
        .getElementById("radius-selDown")
        .addEventListener("click", function () {
            if (radiusElmnt.childNodes[3].value > 1) {
                radiusElmnt.childNodes[3].value--
            }
            radius = parseInt(radiusElmnt.childNodes[3].value)
        });
})();
