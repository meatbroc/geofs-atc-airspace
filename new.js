// Flight data
const flights = [
    { flightNumber: "AA123", origin: "JFK", destination: "LAX", status: "On Time" },
    { flightNumber: "DL456", origin: "ATL", destination: "ORD", status: "Delayed" },
    { flightNumber: "UA789", origin: "SFO", destination: "SEA", status: "Boarding" },
    { flightNumber: "SW101", origin: "BWI", destination: "MIA", status: "Cancelled" },
];

// Create styles for the flight strip panel
const style = document.createElement('style');
style.innerHTML = `
    body {
        font-family: Arial, sans-serif;
    }
    .flight-strip-panel {
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        position: fixed;
        top: 20px;
        right: 20px;
        width: 300px;
        z-index: 1000;
    }
    .flight-list {
        margin-top: 15px;
    }
    .flight-strip {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
    .flight-strip:last-child {
        border-bottom: none;
    }
    .flight-info {
        flex: 1;
    }
    .flight-status {
        font-weight: bold;
    }
`;
document.head.appendChild(style);

// Create the main flight strip panel
const flightStripPanel = document.createElement('div');
flightStripPanel.className = 'flight-strip-panel';

// Create header
const header = document.createElement('h1');
header.innerText = 'Flight Progress Strip Panel';
flightStripPanel.appendChild(header);

// Create flight list container
const flightList = document.createElement('div');
flightList.className = 'flight-list';
flightStripPanel.appendChild(flightList);

// Function to display flights
function displayFlights() {
    flights.forEach(flight => {
        const flightStrip = document.createElement('div');
        flightStrip.className = 'flight-strip';

        const flightInfo = document.createElement('div');
        flightInfo.className = 'flight-info';
        flightInfo.innerHTML = `${flight.flightNumber} - ${flight.origin} to ${flight.destination}`;

        const flightStatus = document.createElement('div');
        flightStatus.className = 'flight-status';
        flightStatus.innerText = flight.status;

        flightStrip.appendChild(flightInfo);
        flightStrip.appendChild(flightStatus);
        flightList.appendChild(flightStrip);
    });
}

// Display flights in the panel
displayFlights();

// Append the flight strip panel to the body
document.body.appendChild(flightStripPanel);
