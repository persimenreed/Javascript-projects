"use strict";
//------------------------------------------------------------------------------------------------------------------
//------ Variables, Constants and Objects
//------------------------------------------------------------------------------------------------------------------
const EButtonSate = {Normal: 0, Hover: 1, Active: 2};
const EContainerType = {Action: 1, Color: 2, Toggle: 3};
const cvs = document.getElementById("cvs"); //Menu CVS
const ctx = cvs.getContext("2d"); //Menu context
ctx.font = "10px Verdana";
const paintObjectList = document.getElementById("paintObjectList");
const menuMousePos = new TPosition(0, 0);
let objectIndex = null;
let objectList = [];


const PaintSheet = {
    // Draw Color Buttons
    ColorButton: {
        Black: {x: 0, y: 0, w: 40, h: 40, count: 3},
        White: {x: 0, y: 40, w: 40, h: 40, count: 3},
        Gray: {x: 0, y: 80, w: 40, h: 40, count: 3},
        Burgundy: {x: 0, y: 120, w: 40, h: 40, count: 3},
        Red: {x: 0, y: 160, w: 40, h: 40, count: 3},
        Yellow: {x: 0, y: 200, w: 40, h: 40, count: 3},
        Green: {x: 0, y: 240, w: 40, h: 40, count: 3},
        Azure: {x: 0, y: 280, w: 40, h: 40, count: 3},
        Blue: {x: 0, y: 320, w: 40, h: 40, count: 3},
        Purple: {x: 0, y: 360, w: 40, h: 40, count: 3}
    },
    // Stroke thickness Buttons
    StrokeSizeButton: {
        Thin: {x: 0, y: 400, w: 40, h: 40, count: 3,},
        Medium: {x: 0, y: 440, w: 40, h: 40, count: 3},
        Thick: {x: 0, y: 480, w: 40, h: 40, count: 3}
    },
    // Shape type buttons
    ShapeTypeButton: {
        Line: {x: 0, y: 520, w: 40, h: 40, count: 3},
        Pen: {x: 0, y: 560, w: 40, h: 40, count: 3},
        Circle: {x: 0, y: 600, w: 40, h: 40, count: 3},
        Oval: {x: 0, y: 640, w: 40, h: 40, count: 3},
        Rectangle: {x: 0, y: 680, w: 40, h: 40, count: 3},
        Polygon: {x: 0, y: 720, w: 40, h: 40, count: 3}
    },
    // Action Buttons
    ActionButton: {
        // New Button
        New: {x: 0, y: 880, w: 40, h: 40, count: 3},
        // Eraser button
        Eraser: {x: 0, y: 760, w: 40, h: 40, count: 3},
        // Stack move up button
        MoveUp: {x: 0, y: 800, w: 40, h: 40, count: 3},
        // Stack move down button
        MoveDown: {x: 0, y: 840, w: 40, h: 40, count: 3}
    }
};

const EColorType = {
    Black: "#000000",
    White: "#ffffff",
    Gray: "#7f7f7f",
    Burgundy: "#880015",
    Red: "#ed1c24",
    Yellow: "#fff200",
    Green: "#22b14c",
    Azure: "#00a2e8",
    Blue: "#3f48cc",
    Purple: "#a349a4"
};

const EStrokeSizeType = {
    Thin: 3,
    Medium: 8,
    Thick: 12
};

const EShapeType = {
    Line: 1,
    Pen: 2,
    Circle: 3,
    Oval: 4,
    Rectangle: 5,
    Polygon: 6
};

const EActionType = {
    New: 1,
    Eraser: 2,
    MoveUp: 3,
    MoveDown: 4
};


const ContainerButtons = {
    Action: {
        caption: "   New      Delete      Up     Down   ",
        buttons: PaintSheet.ActionButton,
        Type: EContainerType.Action,
        pos: {x: 0, y: 0},
        valueList: EActionType
    },
    StrokeColor: {
        caption: "Stroke Color",
        buttons: PaintSheet.ColorButton,
        Type: EContainerType.Color,
        pos: {x: 190, y: 0},
        valueList: EColorType
    },
    StrokeSize: {
        caption: "Stroke Size",
        buttons: PaintSheet.StrokeSizeButton,
        Type: EContainerType.Toggle,
        pos: {x: 633, y: 0},
        valueList: EStrokeSizeType
    },
    ShapeType: {
        caption: "Draw Shape",
        buttons: PaintSheet.ShapeTypeButton,
        Type: EContainerType.Toggle,
        pos: {x: 0, y: 55},
        valueList: EShapeType
    },
    FillColor: {
        caption: "Fill Color",
        buttons: PaintSheet.ColorButton,
        Type: EContainerType.Toggle,
        pos: {x: 275, y: 55},
        valueList: EColorType
    }

};


const containers = [];

//------------------------------------------------------------------------------------------------------------------
//------ Classes
//------------------------------------------------------------------------------------------------------------------

function TContainerButton(aContainerInfo, aClickFunction) {
    const ci = aContainerInfo;
    let onClick = aClickFunction;
    const frame = 5, gap = 3;
    let width = 0, height = 0;
    const buttons = [];
    const caption = {text: ci.caption, x: 0, y: 0, width: ctx.measureText(ci.caption).width, height: 10};
    let activeButton = null;
    let keys = Object.keys(ci.buttons);
    let clickObject = this;
    for (let i = 0; i < keys.length; i++) {
        const spi = ci.buttons[keys[i]];
        const ptnPos = new TPosition(
            ci.pos.x + frame + (buttons.length * spi.w) + (buttons.length * gap),
            ci.pos.y + frame
        );
        const button = new TButton(ptnPos, spi, aClickFunction);
        buttons.push(button);
        width = ptnPos.x - ci.pos.x + spi.w + frame;
        height = ptnPos.y - ci.pos.y + spi.h + frame + caption.height;
        caption.x = ci.pos.x + (width / 2) - (caption.width / 2);
        caption.y = ci.pos.y + height - frame;
    }
    ;

    this.draw = function () {
        //ctx.strokeRect(ci.pos.x, ci.pos.y, width, height);
        ctx.fillStyle = "black";
        ctx.fillText(caption.text, caption.x, caption.y);
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].draw();
        }
    };


    this.mouseOver = function () {
        for (let i = 0; i < buttons.length; i++) {
            if (activeButton !== buttons[i]) {
                if (buttons[i].mouseOver()) {
                    buttons[i].setState(EButtonSate.Hover);
                } else {
                    buttons[i].setState(EButtonSate.Normal);
                }
            }
        }
    };

    //hardkodet inn  aktive knapper så brukeren kan starte å tegne med en gang.
    function onLoad(){
            if((ci.Type != EContainerType.Action) && (ci.Type != EContainerType.Toggle)){
                buttons[0].setState(EButtonSate.Active);
                activeButton = buttons[0];
            }else if (ci.Type != EContainerType.Action){
                buttons[1].setState(EButtonSate.Active);
                activeButton = buttons[1];
            }
    };
   onLoad();

    this.click = function () {
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].mouseOver()) {
                if (ci.Type === EContainerType.Action) {
                    buttons[i].setState(EButtonSate.Active);
                    doClick(i);
                    return true;
                } else {
                    if (activeButton !== buttons[i]) {
                        if (activeButton) {
                            activeButton.setState(EButtonSate.Active);
                        }
                        activeButton = buttons[i];
                        activeButton.setState(EButtonSate.Active);
                        doClick(i);
                        return true;
                    }
                }
            }
        }
        return false;
    };


    function doClick(aButtonIndex) {
        if (onClick) {
            const containerIndex = containers.indexOf(clickObject);
            const containerKey = Object.keys(ContainerButtons)[containerIndex];
            const cb = ContainerButtons[containerKey];
            const buttonKey = Object.keys(cb.buttons)[aButtonIndex];
            const buttonValue = cb.valueList[keys[aButtonIndex]];
            onClick(containerKey, buttonKey, buttonValue);
        }
    }

} // end of TContainerButton


function TButton(aPos, aSpriteInfo, aClickFunction) {
    const bounds = new TBoundsRectangle(aPos, aSpriteInfo);
    const sp = new TSprite(imgSheet, aSpriteInfo, aPos);
    //sp.setScale({x:0.5, y:0.5});
    let state = EButtonSate.Normal;
    let onClick = aClickFunction;
    const clickObject = this;

    this.draw = function () {
        sp.setIndex(state);
        sp.draw();
    };

    this.setState = function (aState) {
        state = aState;
        this.draw();
    };

    this.mouseOver = function () {
        return bounds.hitPos(menuMousePos);
    };

    this.click = function () {
        if (onClick) {
            onClick(clickObject);
        }
    };
} // end of TButton

//------------------------------------------------------------------------------------------------------------------
//------ Function and Events
//------------------------------------------------------------------------------------------------------------------

function createMenu(aClickFunction) {
    const keys = Object.keys(ContainerButtons);
    for (let i = 0; i < keys.length; i++) {
        containers.push(new TContainerButton(ContainerButtons[keys[i]], aClickFunction));
    }
    drawMenu();
}

function drawMenu() {
    paintObjectList.innerHTML = "";
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    for (let i = 0; i < containers.length; i++) {
        containers[i].draw();
    }
}

function setMenuMousePos(aEvent) {
    const bounds = cvs.getBoundingClientRect();
    menuMousePos.x = aEvent.clientX - bounds.left;
    menuMousePos.y = aEvent.clientY - bounds.top;
}

function cvsMenuMouseMove(aEvent) {
    // Mouse move over canvas
    setMenuMousePos(aEvent);
    for (let i = 0; i < containers.length; i++) {
        containers[i].mouseOver();
    }
}

function cvsMenuClick() {
    for (let i = 0; i < containers.length; i++) {
        containers[i].click();
    }
}

function paintObjectClick(aObject) {
    objectList = [];
    const children = paintObjectList.children;
    for (let i = 0; i < children.length; i++) {
        objectIndex = i;
        const child = children[i];
        if (child === aObject) {
            objectList.push(objectIndex);
            if (child.classList.contains("selected")) {
                child.className = "paintObject";
            } else {
                child.className = "paintObject selected";
            }
        } else {
            child.className = "paintObject";
        }
    }
}

function menuAddPaintObject(aText) {
    paintObjectList.innerHTML += "<div class=\"paintObject\" onclick=\"return paintObjectClick(this)\">" + aText + "</div>\n";
}

function menuRemovePaintObject(aText) {
    const children = paintObjectList.children;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.innerText === aText) {
            paintObjectList.removeChild(child);
            return;
        }
    }
}


cvs.addEventListener("mousemove", cvsMenuMouseMove);
cvs.addEventListener("click", cvsMenuClick);

