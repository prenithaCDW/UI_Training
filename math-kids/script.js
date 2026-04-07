const nxtBtnAreaOne = document.querySelector(".area-one-btn");
const shapesContainer = document.getElementById("shapesContainer");
const chooseShape = document.getElementById("chooseShape");
const calculateMeasure = document.getElementById("calculateMeasure");
const displayMeasurement = document.getElementById("displayMeasurement");
const calculateMeasureTitle = document.querySelector("#calculateMeasure .area-title");
const calculateMethodBtn = document.querySelector(".area-two-btn");
const calculateInputOfShape = document.querySelector("#calculateMeasure .input");
const displayMeasurementShape = document.querySelector("#displayMeasurement .area-shape");
const displayMeasurementTitle = document.querySelector("#displayMeasurement .area-title");
const leftSideLabel = document.querySelector('#side .left-side');
const leftSideLabelShort = document.querySelector('#side .formula');
const sideCalculate = document.querySelector("#side .calculate");
const areaFormula = document.querySelector("#area .formula");
const areaCalculate = document.querySelector('#area .calculate');
const perimeterFormula = document.querySelector('#perimeter .formula');
const perimeterCalculate = document.querySelector('#perimeter .calculate');
const restartBtn = document.querySelector('.area-three-btn');

calculateMeasure.style.display = "none";
displayMeasurement.style.display = "none";

const shapesObjectData = {
  circle: {
    name: "Circle",
    className: "circle",
    style: `    
    width: 9.6875rem;
    height: 9.6875rem;
    border-radius: 50%;
    background-color: #43967d;
    cursor: pointer;
    `,
    title: "2. Enter Radius",
    area: (r) => Math.PI * r * r,
    perimeter: (r) => 2 * Math.PI * r,
    side: (s) => `${s}`,
    formulaArea: "πr²",
    formulaPerimeter: "2πr",
    sideLabel: "RADIUS",
    sideLabelShort: 'r'
  },

  triangle: {
    name: "Equilateral Triangle",
    className: "triangle",
    style: `    
    width: 9.9rem;
    height: 9.8rem;
    background-color: #e996cb;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    cursor: pointer;
    `,
    title: "2. Enter Side (Base & Height)",
    area: (a) => (Math.sqrt(3) / 4) * a * a,
    perimeter: (a) => 3 * a,
    formulaArea: "0.433 × s x s",
    formulaPerimeter: "3 × s",
    sideLabel: "SIDE",
    sideLabelShort: 's'
  },

  square: {
    name: "Square",
    className: "square",
    style: `
    width: 9.6875rem;
    height: 9.6875rem;
    background-color: #e0e0e0;
    cursor: pointer;
    `,
    title: "2. Enter Side",
    area: (s) => s * s,
    perimeter: (s) => 4 * s,
    formulaArea: "s × s",
    formulaPerimeter: "4 × s",
    sideLabel: "SIDE",
    sideLabelShort: 's'
  },
//   hexagon: {
//   name: "Hexagon",
//   className: "hexagon",
//   style: `
//     width: 170px;
//     height: 155px;
//     background: orange;
//     clip-path: polygon(
//       25% 0%, 75% 0%, 
//       100% 50%, 75% 100%, 
//       25% 100%, 0% 50%
//     );
//   `,
//   title:"2.Enter Side",
//   area: (s) => (3 * Math.sqrt(3) / 2) * s * s,
//   perimeter: (s) => 6 * s,
//   formulaArea: "((3√3)/2)s²",
//   formulaPerimeter: "6s",
//   sideLabel: "SIDE",
//   sideLabelShort: "s"
// }
};

let selectedShape = "null";
Object.entries(shapesObjectData).forEach(([key, shape]) => {
  const shapeElement = document.createElement("span");
  shapeElement.classList.add("shape", shape.className);
  shapeElement.style.cssText = shape.style;

  const tick = document.createElement("span");
  tick.classList.add("tick");
  shapeElement.appendChild(tick);

  shapeElement.addEventListener("click", () => {
    document.querySelectorAll(".shape").forEach(s => s.classList.remove("selected"));
    shapeElement.classList.add("selected");
    selectedShape = key;
    nxtBtnAreaOne.style.display = "inline-block";
  })
  shapesContainer.appendChild(shapeElement);
});

nxtBtnAreaOne.addEventListener("click", () => {
  chooseShape.style.display = "none";
  calculateMeasure.style.display = "flex";
  calculateMeasureTitle.textContent = shapesObjectData[selectedShape].title;
});

calculateMethodBtn.addEventListener("click", () => {
  const shapeValue = calculateInputOfShape.value;
  if (shapeValue === "" || shapeValue === null) {
    alert("Enter Valid Input");
    return;
  }
  const side = Number(shapeValue);
  if (isNaN(side)) {
    alert("Input must be a number");
    return;
  }
  if (side <= 0) {
    alert("Input must be above zero");
    return;
  }

  calculateMeasure.style.display = "none";
  displayMeasurement.style.display = "flex";
  displayMeasurementShape.className = "area-shape";
  displayMeasurementShape.style.cssText = shapesObjectData[selectedShape].style;
  displayMeasurementTitle.textContent = shapesObjectData[selectedShape].name;
  leftSideLabel.textContent = shapesObjectData[selectedShape].sideLabel;
  leftSideLabelShort.textContent = shapesObjectData[selectedShape].sideLabelShort;
  sideCalculate.textContent = side + " cm";
  areaFormula.textContent = shapesObjectData[selectedShape].formulaArea;
  areaCalculate.textContent = shapesObjectData[selectedShape].area(side).toFixed(2) + "sq cm";
  perimeterFormula.textContent = shapesObjectData[selectedShape].formulaPerimeter;
  perimeterCalculate.textContent = shapesObjectData[selectedShape].perimeter(side).toFixed(2) + "cm";
  if (selectedShape === "triangle") {
    areaFormula.style.padding = "0.8rem 1.0625rem",
      areaFormula.style.fontSize = "1.05rem";
  };
});

restartBtn.addEventListener("click", () => {
  document.querySelectorAll(".shape").forEach(shape => { shape.classList.remove("selected"); });
  calculateInputOfShape.value = "";
  side = "";
  selectedShape = null;
  displayMeasurement.style.display = 'none';
  chooseShape.style.display = "flex";
});
