const canvas = document.getElementById("canvas");
const resetButton = document.getElementById("reset");
const eraseButton = document.getElementById("erase");
const paintButton = document.getElementById("paint");
const select = document.getElementById("select");
const colorPicker = document.getElementById("color");
const getColorButton = document.getElementById("getColor");
let grid = [];
const state = [];

// need to build a color saver and undo/redo
// also want to add an option to fill background
// eventually would like to add change canvas size

const buttons = [resetButton, eraseButton, paintButton, getColorButton];

let lastSize = 8;
let paintActive = false;
let paintColor = "#ff0000";
let erase = false;
let getColor = false;

class Square {
  constructor() {
    this.backgroundColor = "#ffffff";
    this.borderColor = "lightgrey";
  }
}

const createGrid = (size) => {
  grid = [];
  canvas.innerHTML = "";
  canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for (i = 0; i < size ** 2; i++) {
    let square = new Square();
    grid.push(square);
  }
  grid.forEach((square) => {
    let pixel = document.createElement("div");
    pixel.classList.add("square");
    pixel.addEventListener("click", (event) => {
      if (getColor) {
        paintColor = square.backgroundColor;
        colorPicker.value = square.backgroundColor;
      } else {
        square.backgroundColor = erase ? "#ffffff" : paintColor;
        square.borderColor = erase ? "lightgrey" : paintColor;
        pixel.style.backgroundColor = square.backgroundColor;
        pixel.style.borderColor = square.borderColor;
        // state.push([...grid]);
      }
    });
    pixel.addEventListener("mouseover", (event) => {
      if (paintActive) {
        square.backgroundColor = erase ? "#ffffff" : paintColor;
        square.borderColor = erase ? "lightgrey" : paintColor;
        pixel.style.backgroundColor = square.backgroundColor;
        pixel.style.borderColor = square.borderColor;
      }
      if (!erase && !paintActive && !getColor) {
        pixel.style.backgroundColor = paintColor;
        // BUG want to see a diff border if preview and color match
        if (pixel.style.backgroundColor == paintColor) {
          pixel.style.borderColor = "lightgrey";
        } else {
          pixel.style.borderColor = paintColor;
        }
      }
    });
    pixel.addEventListener("mouseout", (event) => {
      if (paintActive) {
        square.backgroundColor = erase ? "#ffffff" : paintColor;
        square.borderColor = erase ? "lightgrey" : paintColor;
        pixel.style.backgroundColor = square.backgroundColor;
        pixel.style.borderColor = square.borderColor;
      }
      if (!erase && !paintActive && !getColor) {
        pixel.style.backgroundColor = square.backgroundColor;
        pixel.style.borderColor = square.borderColor;
      }
    });
    canvas.appendChild(pixel);
  });
  state.push([...grid])
};

select.addEventListener("change", (event) => {
  let size = event.target.value;
  createGrid(size);
  lastSize = size;
});

canvas.addEventListener("mousedown", (event) => {
  if (!getColor) paintActive = true;
  event.preventDefault();
});

document.addEventListener("mouseup", (event) => {
  paintActive = false;
  state.push([...grid]);
  console.log(state);
});

resetButton.addEventListener("click", () => {
  createGrid(lastSize);
  paintColor = colorPicker.value;
  buttons.forEach((button) => button.classList.remove("active"));
  paintButton.classList.add("active");
  erase = false;
  getColor = false;
});

eraseButton.addEventListener("click", () => {
  buttons.forEach((button) => button.classList.remove("active"));
  eraseButton.classList.add("active");
  paintColor = "white";
  erase = true;
  getColor = false;
});

paintButton.addEventListener("click", () => {
  buttons.forEach((button) => button.classList.remove("active"));
  paintButton.classList.add("active");
  paintColor = colorPicker.value;
  erase = false;
  getColor = false;
  canvas.style.cursor = "url(./icons/artist.png)";
});

getColorButton.addEventListener("click", () => {
  buttons.forEach((button) => button.classList.remove("active"));
  getColorButton.classList.add("active");
  getColor = true;
  paintActive = false;
  erase = false;
});

colorPicker.addEventListener("change", (event) => {
  paintColor = event.target.value;
});

createGrid(8);
