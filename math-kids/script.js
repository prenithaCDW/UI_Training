const shapes = document.querySelectorAll(".shape"); 
const nxtBtnAreaOne = document.querySelector(".area-one-btn");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const step2Title = document.querySelector("#step2 .area-title");
const calculateMethodBtn = document.querySelector(".area-two-btn");
const calculateInputOfShape = document.querySelector("#step2 .input");
const step3Shape=document.querySelector("#step3 .area-shape");
const step3Title = document.querySelector("#step3 .area-title");
const leftSideLabel = document.querySelector('#side .left-side');
const leftSideLabelShort = document.querySelector('#side .formula');
const sideCalculate=document.querySelector("#side .calculate");
const areaFormula = document.querySelector("#area .formula");
const areaCalculate=document.querySelector('#area .calculate');
const perimeterFormula=document.querySelector('#perimeter .formula');
const perimeterCalculate=document.querySelector('#perimeter .calculate');
const restartBtn=document.querySelector('.area-three-btn');

step2.style.display = "none";
step3.style.display = "none";

const shapesObjectData = {
  circle: {
    name: "Circle",
    title: "2. Enter Radius",
    area: (r) => Math.PI * r * r,
    perimeter: (r) => 2 * Math.PI * r,
    side: (s) => `${s}`,
    formulaArea: "πr²",
    formulaPerimeter: "2πr",
    sideLabel:"RADIUS",
    sideLabelShort:'r'
  },

  square: {
    name: "Square",
    title: "2. Enter Side",
    area: (s) => s * s,
    perimeter: (s) => 4 * s,
    formulaArea: "s × s",
    formulaPerimeter: "4 × s",
    sideLabel:"SIDE",
    sideLabelShort:'s'
  },

  triangle: {
    name: "Equilateral Triangle",
    title: "2. Enter Side (Base & Height)",
    area: (a) => (Math.sqrt(3) / 4) * a * a,
    perimeter: (a) => 3 * a,
    formulaArea: "0.433 × s x s",
    formulaPerimeter: "3 × s",
    sideLabel:"SIDE",
    sideLabelShort:'s'
  },
};

let selectedShape="null";
shapes.forEach(shape => {
    shape.addEventListener("click", () => {
        shapes.forEach(s => s.classList.remove("selected"));
        shape.classList.add("selected");
        selectedShape=shape.className.split(" ")[1];
        nxtBtnAreaOne.style.display = "inline-block";
    });
});

nxtBtnAreaOne.addEventListener("click",()=>{
    step1.style.display="none";
    step2.style.display="flex";
    step2Title.textContent = shapesObjectData[selectedShape].title;
});

calculateMethodBtn.addEventListener("click",()=>{
    const shapeValue=calculateInputOfShape.value;
    if(shapeValue===""||shapeValue===null){
        alert("Enter Valid Input");
        return;
    }

    const side = Number(shapeValue);
    step2.style.display = "none";
    step3.style.display = "flex"; 
    step3Shape.className = "area-shape " + selectedShape;
    step3Title.textContent = shapesObjectData[selectedShape].name;
    leftSideLabel.textContent = shapesObjectData[selectedShape].sideLabel;
    leftSideLabelShort.textContent = shapesObjectData[selectedShape].sideLabelShort;
    sideCalculate.textContent = side + " cm";
    areaFormula.textContent=shapesObjectData[selectedShape].formulaArea;
    areaCalculate.textContent=shapesObjectData[selectedShape].area(side).toFixed(2)+"sq cm";
    perimeterFormula.textContent=shapesObjectData[selectedShape].formulaPerimeter;
    perimeterCalculate.textContent=shapesObjectData[selectedShape].perimeter(side).toFixed(2)+"cm";
    if(selectedShape === "triangle"){
        areaFormula.style.padding = "0.8rem 1.0625rem"};
        areaFormula.style.fontSize = "1.05rem";
});

restartBtn.addEventListener("click",()=>{
    shapes.forEach((shape)=>{shape.classList.remove("selected")});
    calculateInputOfShape.value="";
    side="";
    selectedShape=null;
    step3.style.display='none';
    step1.style.display="flex";
});
