// Create the main FPS box
const fpsBox = document.createElement('div');
fpsBox.style.backgroundColor = 'rgb(140, 138, 148)';
fpsBox.style.borderColor = 'rgb(192, 192, 192)';
fpsBox.style.borderStyle = 'ridge';
fpsBox.style.borderWidth = '5px';
fpsBox.style.height = '400px'; 
fpsBox.style.width = '800px';
fpsBox.style.position = 'absolute';
fpsBox.style.zIndex = 999;
fpsBox.style.overflow = 'auto'; 
fpsBox.id = 'fps-box';

// Create the title for the FPS box
const fpsBoxTitle = document.createElement('div');
fpsBoxTitle.textContent = "Flight Progress Strips";
fpsBoxTitle.style.cursor = 'move'; 
fpsBoxTitle.style.backgroundColor = '#b0b0b0'; 
fpsBoxTitle.style.padding = '10px';
fpsBoxTitle.style.textAlign = 'center';
fpsBoxTitle.style.fontWeight = 'bold';

// Append title to the FPS box
fpsBox.appendChild(fpsBoxTitle);

// Create a divider line styled to match the fpsBox border
const divider = document.createElement('div');
divider.style.height = '5px'; // Height of the line to match border width
divider.style.borderTop = '5px ridge rgb(192, 192, 192)'; // Match the border style
divider.style.margin = '0'; // Remove default margin
divider.style.width = '100%'; // Full width of the FPS box
fpsBox.appendChild(divider); // Append the line after the title

// Function to create a column
function createColumn(text) {
    const column = document.createElement('div');
    column.style.flex = '1'; 
    column.style.padding = '10px'; 
    column.style.boxSizing = 'border-box'; 
    column.style.border = '1px solid #ccc'; 
    column.style.backgroundColor = '#e0e0e0'; 
    column.style.textAlign = 'center'; 
    column.style.position = 'relative'; 

    const title = document.createElement('div');
    title.textContent = text;
    title.style.top = '0px';
    title.style.color = '#5b7b9f';
    column.appendChild(title);

    const addRowButton = document.createElement('button');
    addRowButton.textContent = `+`;
    addRowButton.style.marginTop = '10px'; 
    addRowButton.onclick = function() {
        appendNewRow(column); 
    };
    column.appendChild(addRowButton);

    const rowContainer = document.createElement('div');
    rowContainer.style.marginTop = '20px'; 
    rowContainer.style.height = '300px'; 
    rowContainer.style.overflowY = 'auto'; 
    column.appendChild(rowContainer); 

    column.rowContainer = rowContainer;

    return column; 
}

// Create the columns container
const columnsContainer = document.createElement('div');
columnsContainer.style.display = 'flex'; 
fpsBox.appendChild(columnsContainer);

// Append columns
columnsContainer.appendChild(createColumn('Arrivals'));
columnsContainer.appendChild(createColumn('Departures'));
columnsContainer.appendChild(createColumn('Ground'));

// Function to create a row
function createRow() {
    const row = document.createElement('div');
    row.style.display = 'flex'; 
    row.style.padding = '10px'; 
    row.style.boxSizing = 'border-box'; 
    row.style.border = '1px solid #ccc'; 
    row.style.backgroundColor = '#e0e0e0'; 
    row.style.marginBottom = '10px'; 
    row.style.position = 'relative'; 
    row.style.width = '100%'; 

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Row Name'; 
    input.style.border = 'none'; 
    input.style.borderBottom = '2px solid #a0a0a0'; 
    input.style.width = '80%'; 
    input.style.outline = 'none'; 
    input.style.fontSize = '16px'; 
    input.style.backgroundColor = 'transparent'; 
    input.style.marginRight = '10px'; 

    row.appendChild(input); 

    const removeButton = document.createElement('button');
    removeButton.textContent = `x`;
    removeButton.onclick = function() {
        row.remove(); 
    };

    removeButton.style.position = 'absolute';
    removeButton.style.top = '10px';
    removeButton.style.right = '10px';
    removeButton.style.backgroundColor = '#ff4c4c'; 
    removeButton.style.color = '#ffffff'; 
    removeButton.style.border = 'none'; 
    removeButton.style.padding = '5px 10px'; 
    removeButton.style.cursor = 'pointer'; 
    removeButton.style.borderRadius = '5px'; 

    row.appendChild(removeButton);

    return row; 
}

// Function to append a new row to the selected column
function appendNewRow(column) {
    column.rowContainer.appendChild(createRow()); 
}

// Append FPS box to the body
document.body.appendChild(fpsBox);

// Function to make the FPS box draggable
function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const title = elmnt.firstChild; 

    title.onmousedown = dragMouseDown;

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

// Initialize dragging functionality
dragElement(fpsBox);
