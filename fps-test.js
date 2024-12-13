const fpsBox = document.createElement('div');
fpsBox.style.backgroundColor = 'rgb(140, 138, 148)';
fpsBox.style.borderColor = 'rgb(192, 192, 192)';
fpsBox.style.borderStyle = 'ridge';
fpsBox.style.borderWidth = '5px';
fpsBox.style.height = '100px';
fpsBox.style.width = '400px';
fpsBox.style.position = 'absolute';
fpsBox.style.zIndex = 999;
fpsBox.id = 'fps-box';
document.body.appendChild(fpsBox);
function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	elmnt.onmousedown = dragMouseDown;

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
dragElement(document.getElementById('fps-box'));
