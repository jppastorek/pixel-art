const canvas = document.getElementById("canvas");
const resetButton = document.getElementById("reset");
const eraseButton = document.getElementById("erase");
const paintButton = document.getElementById("paint");
const select = document.getElementById("select");

const buttons = [resetButton, eraseButton, paintButton];

let lastSize = 8;
let paintActive = false;
let paintColor = "black";
let erase = false;

class Square {
  constructor() {
    this.backgroundColor = "white";
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
      square.backgroundColor = paintColor;
      square.borderColor = erase ? "lightgrey" : "black";
      pixel.style.backgroundColor = square.backgroundColor;
      pixel.style.borderColor = square.borderColor;
    });
    pixel.addEventListener("mouseover", (event) => {
      if (paintActive) {
        square.backgroundColor = paintColor;
        square.borderColor = erase ? "lightgrey" : "black";
        pixel.style.backgroundColor = square.backgroundColor;
        pixel.style.borderColor = square.borderColor;
      }
    });
    pixel.addEventListener("mouseout", (event) => {
      if (paintActive) {
        square.backgroundColor = paintColor;
        square.borderColor = erase ? "lightgrey" : "black";
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
  paintActive = true;
  event.preventDefault();
});

document.addEventListener("mouseup", (event) => {
  paintActive = false;
});

resetButton.addEventListener("click", () => {
  createGrid(lastSize);
  paintColor = "black";
  buttons.forEach(button => button.classList.remove("active"));
  paintButton.classList.add("active");
  erase = false;
});

eraseButton.addEventListener("click", () => {
  buttons.forEach((button) => button.classList.remove("active"));
  eraseButton.classList.add("active");
  paintColor = "white";
  erase = true;
});

paintButton.addEventListener("click", () => {
  buttons.forEach((button) => button.classList.remove("active"));
  paintButton.classList.add("active");
  paintColor = "black";
  erase = false;
});

createGrid(8);
