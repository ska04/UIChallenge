const inputDropdownEl = document.getElementById("inputDropdown");
const backColorEl = document.getElementById("backgroundColor");
const textColorEl = document.getElementById("textColor");
const labelTextEl = document.getElementById("label");

const lengthContainerEl = document.getElementById("lengthContainer");
const maxLengthEl = document.getElementById("maxLength");
const minLengthEl = document.getElementById("minLength");

const optionsContainerEl = document.getElementById("optionsContainer");
const groupNameEl = document.getElementById("groupName");

const dateContainerEl = document.getElementById("dateContainer");
const minDateEl = document.getElementById("minDate");
const maxDateEl = document.getElementById("maxDate");

const inputInfoListContianerEl = document.getElementById("inputList");
const renderDataContainerEl = document.getElementById("renderDataContainer");

window.onload = () => {
  optionsContainerEl.classList.add("hidden");
  dateContainerEl.classList.add("hidden");
};

function inputSelectionHandler() {
  const inputType = inputDropdownEl.value;
  if (inputType === "Checkbox" || inputType === "Radio") {
    lengthContainerEl.classList.add("hidden");
    dateContainerEl.classList.add("hidden");

    optionsContainerEl.classList.remove("hidden");
  } else if (inputType === "Date") {
    lengthContainerEl.classList.add("hidden");
    optionsContainerEl.classList.add("hidden");

    dateContainerEl.classList.remove("hidden");
  } else if (
    inputType === "Text" ||
    inputType === "Password" ||
    inputType === "Email"
  ) {
    dateContainerEl.classList.add("hidden");
    optionsContainerEl.classList.add("hidden");

    lengthContainerEl.classList.remove("hidden");
  }
}

function renderData() {
  createPayloadAndRenderInputs();
}

function createPayloadAndRenderInputs() {
  const inputTypeVal = inputDropdownEl.value;
  const metaData = {
    inputType: inputTypeVal,
    backColor: backColorEl.value,
    textColor: textColorEl.value,
    labelText: labelTextEl.value,
  };

  if (
    inputTypeVal === "Text" ||
    inputTypeVal === "Password" ||
    inputTypeVal === "Email"
  ) {
    metaData.minLength = minLengthEl.value;
    metaData.maxLength = maxLengthEl.value;

  } else if (inputTypeVal === "Checkbox" || inputTypeVal === "Radio") {
    metaData.groupNameEl = groupNameEl.value;
  } else if (inputTypeVal === "Date") {
    metaData.minDate = minDateEl.value;
    metaData.maxDate = maxDateEl.value;
  }

  let inputContainer = createInputs(metaData);
  renderDataContainerEl.appendChild(inputContainer);

  let inputPropertiesContainer = fetchInputProperties(metaData);
  inputInfoListContianerEl.appendChild(inputPropertiesContainer);

  console.log(JSON.stringify(metaData));
  console.log(metaData);
}

function createInputs(metaData) {
  const containerDiv = document.createElement("div");
  containerDiv.classList.add('margin-10');

  const labelEl = document.createElement("label");
  labelEl.style.color = metaData.textColor;
  labelEl.textContent = metaData.labelText;

  const inputEl = document.createElement("input");
  inputEl.style.backgroundColor = metaData.backColor;
  inputEl.style.color = metaData.textColor;
  inputEl.type = metaData.inputType;

  if (
    metaData.inputType === "Text" ||
    metaData.inputType === "Password" ||
    metaData.inputType === "Email"
  ) {
    inputEl.minLength = metaData.minLength;
    inputEl.maxLength = metaData.maxLength;
  } else if (metaData.inputType === "Date") {
    inputEl.min = metaData.minDate;
    inputEl.max = metaData.maxDate;
  } else if (
    metaData.inputType === "Checkbox" ||
    metaData.inputType === "Radio"
  ) {
    inputEl.id = "checkRadioInput";
    inputEl.name = metaData.groupNameEl;
    labelEl.setAttribute("for", "checkRadioInput");
  }

  containerDiv.appendChild(labelEl);
  containerDiv.appendChild(inputEl);
  return containerDiv;
}

function fetchInputProperties(metaData) {
  const paragraphEl = document.createElement("p");

  paragraphEl.textContent = `Type: ${metaData.inputType}; BG-Color: ${metaData.backColor}; 
  Text-Color: ${metaData.textColor}; `;
  
  if (
    metaData.inputType === "Text" ||
    metaData.inputType === "Password" ||
    metaData.inputType === "Email"
  ) {
    paragraphEl.textContent += `Min-Length: ${metaData.minLength}; Max-Length: ${metaData.maxLength}`;
  } else if (metaData.inputType === "Date") {
    paragraphEl.textContent += `Min-Date: ${metaData.minDate}; Max-Date: ${metaData.maxDate}`;
  } 

  return paragraphEl;
}

inputDropdownEl.addEventListener("change", inputSelectionHandler);
