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
  let spotCoordinates1;
  let spotCoordinates2;

  // checkIfInside(spotCoordinates1);
  // checkIfInside(spotCoordinates2);

  let radius = 25;
  let airportName = 'KSFO';
  
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
  let usersIn = [];
  // next is to find out when new users enter your airspace or something else idk
  function radiusCheck(multiplayerObject) {
    usersIn = [];
    for (const [key, value] of Object.entries(multiplayerObject)) {
      if (value.lastUpdate.co) {
        if (checkUser(value.lastUpdate.co, value.lastUpdate.cs)) {
          // console.log(key)
          // usersIn.push(value.lastUpdate.cs)
          usersIn.push(key);
        }
      }
    }
    return usersIn;
  }
  let stillIn = [];
  function recheck(a) {
    stillIn = [];
    a.forEach((element) => {
      if (checkUser(multiplayer.users[element].lastUpdate.co)) {
        stillIn.push(element);
      }
    })
  }
  
  async function performRadiusCheck() {
    try {
      const result = await radiusCheck(multiplayer.users);
      console.log('Radius check successful:', result);
      // Call another function after radiusCheck
      recheck(result);
    } catch (error) {
      console.error('Radius check failed:', error);
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
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }

  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  const style = document.createElement("style");
  style.innerHTML = `
    .atc-visible {
        display: block !important;
        position: absolute;
        opacity: 0.5;
    }

    .atc-toggle-panel {
        display: none;
    }

    .atc-opacity {
        opacity: 1 !important;
    }
`;
  document.head.appendChild(style);

  function createButton(text, onClick, identifier) {
    const button = document.createElement("button");
    button.innerText = text;
    button.style.position = "relative";
    button.style.opacity = "1";
    button.style.zIndex = 1000; // Raise the z-index
    button.addEventListener("click", onClick);
    button.classList.add("mdl-button");
    button.style.filter = "opacity(1)";
    button.style.color = "rgba(0, 0, 0, 1)";
    button.id = identifier;
    return button;
  }

  function createHeader(identifier) {
    const header = document.createElement("div");
    header.style.position = "relative";
    header.style.bottom = "0px";
    header.style.backgroundColor = "red";
    header.style.width = "180px";
    header.style.height = "20px";
    header.style.zIndex = 1000;
    header.style.color = "red";
    header.classList.add("ext-toggle-panel"); // Correct class assignment
    header.id = identifier;
    header.innerText = "Buttons";
    return header;
  }
  function createBox(identifier) {
    const box = document.createElement("div");
    box.style.position = 'absolute'
    box.style.backgroundColor = 'white';
    box.style.width = '180px';
    box.style.height = '300px';
    box.style.zIndex = 999; // Raise the z-index
    box.classList.add('ext-toggle-panel');
    box.id = identifier; // Correct method to set the id
    return box;
  }
  function createInput(identifier) {
    const inputBox = document.createElement("input");
    inputBox.style.position = "relative";
    inputBox.style.width = "90px";
    inputBox.style.left = "0px";
    inputBox.style.bottom = "0px";
    inputBox.id = identifier;
    inputBox.classList.add('geofs-stopKeyboardPropagation');
    inputBox.classList.add('geofs-stopKeyupPropagation');
    return inputBox;
  }

  function toggleATC() {
    atcPanel.classList.toggle("atc-visible");
    atcHeader.classList.toggle("atc-visible");
  }
  let mode;
  function toVis() {
    mode = 0;
    console.log(mode)
  }
  function toCoord() {
    mode = 1;
    console.log(mode)
  }
  const submitAirport = function () {
    if (document.getElementById('airport-input').value) {
      userInput = document.getElementById('airport-input').value.toUpperCase();
      if (geofs.mainAirportList[userInput]) {
        airportName = userInput;
      } else {
        ui.notification.show(`${userInput} is not a valid airport`);
      }
    }
    document.getElementById('airport-input').value = null;
  }
  
  const atcToggler = createButton("ATC", toggleATC, "atc-toggle");
  const atcPanel = createBox("atc-panel")
  const atcHeader = createHeader("atc-header");
  const airportInput = createInput('airport-input');
  const airportSubmit = createButton('SUBMIT', submitAirport, "airport-submit")
  const visRadar = createButton('USE VISIBLE', toVis, "visible-radar")
  const coordRadar = createButton('USE COORDS', toCoord, "coordinate-radar")
  
  const container = document.querySelector(".geofs-ui-bottom");

  container.appendChild(atcToggler);
  document.body.appendChild(atcPanel);
  atcPanel.appendChild(atcHeader);
  atcPanel.appendChild(airportInput);
  atcPanel.appendChild(airportSubmit);
  atcPanel.appendChild(visRadar);
  atcPanel.appendChild(coordRadar);

  const hoverMouse = () => {
        const atcHeader = document.getElementById("atc-header");
            if (atcHeader) { // Check if the element exists
                atcHeader.addEventListener("mouseover", (event) => {
                // Change the cursor to grab on mouseover
                event.target.style.cursor = "grab";
            });
                atcHeader.addEventListener("mousedown", (event) => {
                // Change the cursor to grabbing on mousedown
                event.target.style.cursor = "grabbing";
            });
                atcHeader.addEventListener("mouseup", (event) => {
                // Change the cursor back to grab on mouseup
                event.target.style.cursor = "grab";
            });
        } else {
        console.error("Element with ID 'atc-header' not found.");
        }
    };

    // Call the function to add the event listener
    hoverMouse();

    dragElement(document.getElementById("atc-panel"));

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
})();

// multiplayer.visibleUsers
// console.trace()
