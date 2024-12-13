// Create the main fpsBox div
const fpsBox = document.createElement('div');

// Style the main fpsBox
fpsBox.style.backgroundColor = 'rgb(140, 138, 148)';
fpsBox.style.borderColor = 'rgb(192, 192, 192)';
fpsBox.style.borderStyle = 'ridge';
fpsBox.style.borderWidth = '5px';
fpsBox.style.height = '400px'; // Set a fixed height for the scrollable box
fpsBox.style.width = '800px';
fpsBox.style.position = 'absolute';
fpsBox.style.zIndex = 999;
fpsBox.style.overflow = 'auto'; // Enable scrolling when content overflows
fpsBox.id = 'fps-box';

// Function to create columns
function createColumn(columnNumber) {
    const column = document.createElement('div');
    column.style.flex = '1'; // Each column takes equal space
    column.style.padding = '10px'; // Padding inside each column
    column.style.boxSizing = 'border-box'; // Include padding in width
    column.style.border = '1px solid #ccc'; // Border for each column
    column.style.backgroundColor = '#e0e0e0'; // Light gray background for columns
    column.style.textAlign = 'center'; // Center the text
    column.style.position = 'relative'; // Position relative for absolute items

    // Create a title for each column
    const title = document.createElement('h3');
    title.textContent = `Column ${columnNumber}`;
    column.appendChild(title);

    // Create a button to add a new row specifically for this column
    const addRowButton = document.createElement('button');
    addRowButton.textContent = `Add Row ${columnNumber}`;
    addRowButton.onclick = function() {
        appendNewRow(column); // Append a new row under this column
    };
    column.appendChild(addRowButton);

    // Create a container for rows within the column
    const rowContainer = document.createElement('div');
    rowContainer.style.marginTop = '20px'; // Add some space above rows
    rowContainer.style.height = '300px'; // Fixed height for row container
    rowContainer.style.overflowY = 'auto'; // Enable vertical scrolling if rows exceed height
    column.appendChild(rowContainer); // Append row container to column

    // Store the row container for later use
    column.rowContainer = rowContainer;

    return column; // Return the created column
}

// Create initial columns
const columnsContainer = document.createElement('div');
columnsContainer.style.display = 'flex'; // Use Flexbox to arrange columns
fpsBox.appendChild(columnsContainer);

const columnCount = 3; // Number of columns
for (let i = 1; i <= columnCount; i++) {
    columnsContainer.appendChild(createColumn(i));
}

// Function to create a row
function createRow() {
    const row = document.createElement('div');
    row.style.display = 'flex'; // Use Flexbox for horizontal layout of the row
    row.style.padding = '10px'; // Padding inside each row
    row.style.boxSizing = 'border-box'; // Include padding in width
    row.style.border = '1px solid #ccc'; // Border for each row
    row.style.backgroundColor = '#e0e0e0'; // Light background for rows
    row.style.marginBottom = '10px'; // Space between rows
    row.style.position = 'relative'; // Make relative to position button
    row.style.width = '100%'; // Make row take full width of column

    // Create an input field for the row number
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Row Name'; // Placeholder text
    input.style.border = 'none'; // No border
    input.style.borderBottom = '2px solid #a0a0a0'; // Darker bottom border
    input.style.width = '100%'; // Full width of the row
    input.style.outline = 'none'; // Remove outline on focus
    input.style.fontSize = '16px'; // Font size
    input.style.backgroundColor = 'transparent'; // Transparent background

    row.appendChild(input); // Append the input field to the row

    // Create a button to remove the row
    const removeButton = document.createElement('button');
    removeButton.textContent = `x`;
    removeButton.onclick = function() {
        row.remove(); // Remove the row from the DOM
    };

    // Style the button to position it at the top right corner
    removeButton.style.position = 'absolute';
    removeButton.style.top = '10px';
    removeButton.style.right = '10px';

    row.appendChild(removeButton);

    return row; // Return the created row
}

// Function to append a new row to a specific column
function appendNewRow(column) {
    column.rowContainer.appendChild(createRow()); // Append new row to the column's row container
}

// Append the fpsBox to the body
document.body.appendChild(fpsBox);

// Drag functionality
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Initialize dragging on the fpsBox
dragElement(fpsBox);
