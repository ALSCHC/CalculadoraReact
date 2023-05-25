function appendValue(newValue) {
  const opers = ["+", "-", "*", "/", ".", "%"];
  const typed = document.getElementById("typed");
  const currentLastChar = typed.value.slice(-1);
  const currentLastCharIsOper = opers.indexOf(currentLastChar) > -1;
  const newValueIsOper = opers.indexOf(newValue) > -1;
  const hidden = document.getElementById("hidden-input");

  if (hidden.value !== "") {
    typed.value = "";
    hidden.value = "";
  }

  if (currentLastCharIsOper && newValueIsOper) typed.value = typed.value.slice(0, -1) + newValue;
  else if (typed.value === "0") typed.value = newValue;
  else typed.value += newValue;
}

function calculate() {
  const result = document.getElementById("result");
  const typed = document.getElementById("typed");
  const hidden = document.getElementById("hidden-input");
  result.value = eval(typed.value);
  hidden.value = result.value;
}

function clearDisplay() {
  document.getElementById("typed").value = "";
  document.getElementById("result").value = "0";
}

function changeSign() {
  calculate();
  const result = document.getElementById("result");
  const typed = document.getElementById("typed");
  result.value = -1 * result.value;
  typed.value = result.value;
}

function deleteLastChar() {
  const result = document.getElementById("typed");
  result.value.length === 1 ? clearDisplay() : (result.value = result.value.slice(0, -1));
}

function addNode(fatherNode, tag, classes = [], attrs = {}) {
  const childNode = document.createElement(tag);
  classes.forEach((_class) => childNode.classList.add(_class));
  for (let k in attrs) childNode.setAttribute(k, attrs[k]);
  fatherNode.appendChild(childNode);
  return childNode;
}

function handleEvent(value) {
  const numsAndOpers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/", "%"];
  numsAndOpers.indexOf(value) > -1 && appendValue(value);
  (value === "." || value === ",") && appendValue(".");
  (value === "backspace" || value === "⌫") && deleteLastChar();
  (value === "escape" || value === "AC") && clearDisplay();
  (value === "enter" || value === "=") && calculate();
  value === "±" && changeSign();
}

function createApp() {
  const app = document.getElementById("app");

  const title = addNode(app, "h1", ["title"]);
  const title2 = addNode(app, "h1", ["title2"]);
  title.textContent = "Nuestra Calculadora";
  title2.textContent = "☭";
  const calculator = addNode(app, "div", ["calculator"]);

  const display = addNode(calculator, "div", ["display"], { id: "display" });
  const typed = addNode(display, "input", [], { id: "typed", type: "text", value: "", disabled: "" });
  const result = addNode(display, "input", [], { id: "result", type: "number", value: "0", disabled: "", step: "0.001" });

  const btnGrid = addNode(calculator, "div", [], { id: "btn-grid" });
  const buttons = [
    ["AC", "±", "%", "/"], ["7", "8", "9", "*"], ["4", "5", "6", "-"], ["1", "2", "3", "+"], ["0", ".", "⌫", "="],
  ];

  buttons.forEach((rowItems, rowIndex) => {
    const rowDiv = addNode(btnGrid, "div", ["row"], { id: `row${rowIndex}` });
    rowItems.forEach((item, itemIndex) => {
      if (rowIndex === 0 || itemIndex === 3) {
        addNode(rowDiv, "input", ["btn", "operator"], { type: "button", value: item, id: `item${rowIndex}${itemIndex}` });
      } else {
        addNode(rowDiv, "input", ["btn"], { type: "button", value: item, id: `item${rowIndex}${itemIndex}` });
      }
    });
  });

  document.getElementById("item00").classList.add("ac");
  document.getElementById("item42").classList.add("borrar");
  document.getElementById("item43").classList.add("igual");

  addNode(app, "input", ["theme-dark"], { type: "hidden", value: "", id: "hidden-input" });

  btnGrid.addEventListener("click", ({ target: { type, value } }) => type === "button" && handleEvent(value));

  document.addEventListener("keydown", ({ key }) => handleEvent(key.toLowerCase()));
}

createApp();
