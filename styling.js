const style = document.createElement("style");
style.innerHTML = `
    .ext-autopilot-pad {
        width: 90px;
        margin: 0px 10px;
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
    }
    .ext-autopilot-bar .ext-autopilot-switch .ext-switchRight {
        border-radius: 0px 15px 15px 0px;
    }
    .geofs-autopilot-bar .geofs-autopilot-switch a {
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
    .ext-autopilot-bar {
        opacity: 0.5;
        margin-top: 5px;
        white-space: nowrap;
        display: flex;
        align-items: flex-start;
        pointer-events: all;
    }
`;
document.head.appendChild(style);
const controlButton = document.createElement("div");
controlButton.classList.add('ext-autopilot-bar')
controlButton.innerHTML = `
                <div class="ext-control-pad ext-autopilot-pad" id="atc-button" tabindex="0">
                    <div class="control-pad-label transp-pad">ATC</div>
                    `;
const container = document.getElementsByClassName("geofs-ui-top");
container[0].appendChild(controlButton);
const controlElmnt = document.createElement("div");
controlElmnt.classList.add('ext-autopilot-controls');
controlElmnt.style.display = 'none';
controlElmnt.innerHTML = `
                    <div class="ext-autopilot-control">
                        <span class="geofs-autopilot-switch geofs-autopilot-mode">
                            <a class="switchLeft geofs-autopilot-HDG green-pad" data-method="setMode" value="HDG">RDR</a>
                            <a class="switchRight geofs-autopilot-NAV" data-method="setMode" value="NAV">VIS</a>
                        </span>
                    </div>
`
const container2 = document.getElementsByClassName("ext-autopilot-bar");
container2[0].appendChild(controlElmnt);
document
    .getElementById("atc-button")
    .addEventListener("click", function () {
        const autopilotState = this.classList.toggle("active");
        if (this.classList.contains('active')) {
            controlElmnt.style.display = 'block';
        } else {
            controlElmnt.style.display = 'none';
        }
        console.log(this.classList)
        console.log(this)
    });
