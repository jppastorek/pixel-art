const canvas = document.getElementById("canvas");
const resetButton = document.getElementById("reset");
const eraseButton = document.getElementById("erase");
const paintButton = document.getElementById("paint");
const select = document.getElementById("select");
const colorPicker = document.getElementById("color");
const getColorButton = document.getElementById("getColor");

// need to build a color saver and undo/redo
// this will probably require moving to react to save state
// also need to optimize for mobile
// also want to add an option to fill background
// eventually would like to add change canvas size

const buttons = [resetButton, eraseButton, paintButton, getColorButton];

let lastSize = 8;
let paintActive = false;
let paintColor = "#000000";
let erase = false;
let getColor = false;

class Square {
  constructor() {
    this.backgroundColor = "#ffffff";
    this.borderColor = "lightgrey";
  }
}

let grid = [];

let square = new Square();

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
      }
    });
    pixel.addEventListener("mouseover", (event) => {
      if (paintActive) {
        square.backgroundColor = erase ? "#ffffff" : paintColor;
        square.borderColor = erase ? "lightgrey" : paintColor;
        pixel.style.backgroundColor = square.backgroundColor;
        pixel.style.borderColor = square.borderColor;
      }
    });
    pixel.addEventListener("mouseout", (event) => {
      if (paintActive) {
        square.backgroundColor = erase ? "#ffffff" : paintColor;
        square.borderColor = erase ? "lightgrey" : paintColor;
        pixel.style.backgroundColor = square.backgroundColor;
        pixel.style.borderColor = square.borderColor;
      }
    });
    canvas.appendChild(pixel);
  });
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
});

resetButton.addEventListener("click", () => {
  createGrid(lastSize);
  paintColor = paintColor;
  buttons.forEach((button) => button.classList.remove("active"));
  paintButton.classList.add("active");
  erase = false;
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
