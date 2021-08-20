const inputDropdownEl = document.getElementById("inputDropdown");
const backColorEl = document.getElementById("backgroundColor");
const textColorEl = document.getElementById("textColor");
const labelTextEl = document.getElementById("label");

const lengthContainerEl = document.getElementById("lengthContainer");
const maxLengthEl = document.getElementById("maxLength");
const minLengthEl = document.getElementById("minLength");

const optionsContainerEl = document.getElementById("optionsContainer");
const option1El = document.getElementById("option1");
const option2El = document.getElementById("option2");

const dateContainerEl = document.getElementById("dateContainer");
const minDateEl = document.getElementById("minDate");
const maxDateEl = document.getElementById("maxDate");

const inputListContianerEl = document.getElementById("inputList");
const renderDataContainerEl = document.getElementById("renderDataContainer");

let orderId = 0;

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
  }

  if (inputType === "Date") {
    lengthContainerEl.classList.add("hidden");
    optionsContainerEl.classList.add("hidden");

    dateContainerEl.classList.remove("hidden");
  }

  if (
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
    orderId++;
    createPayloadAndRenderInput();
}

function createPayloadAndRenderInput() {
  let renderInnerHTML;
  let listInnerHTML;

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

    renderInnerHTML = createInputForDateTextTypes(metaData, 'minlength','maxlength', metaData.minLength, metaData.maxLength);

    listInnerHTML = `<p class="input-list-child">Type: ${metaData.inputType} &nbsp;&nbsp; Max Length: ${metaData.maxLength}
    &nbsp;&nbsp; Min Length: ${metaData.minLength} &nbsp;&nbsp;BG Color: ${metaData.backColor}
    &nbsp;&nbsp; Text Color: ${metaData.textColor} &nbsp;&nbsp; OrderId: ${orderId}</p>`;
  } else if (inputTypeVal === "Checkbox" || inputTypeVal === "Radio") {
    metaData.option1Text = option1El.value;
    metaData.option2Text = option2El.value;

    renderInnerHTML = `<label style="color:${metaData.textColor}">${metaData.labelText}:</label>
    <input id='checkRadioInput' type="${metaData.inputType}" name="selectinos"/>
    <label for="checkRadioInput" style="color:${metaData.textColor}">${metaData.option1Text}</label>
    <input id='checkRadioInput' type="${metaData.inputType}" name="selectinos"/>
    <label for="checkRadioInput" style="color:${metaData.textColor}">${metaData.option2Text}</label>`;

    listInnerHTML = `<p class="input-list-child">Type: ${metaData.inputType} &nbsp;&nbsp; 
    BG Color: ${metaData.backColor} &nbsp;&nbsp; Text Color: ${metaData.textColor} 
    &nbsp;&nbsp; OrderId: ${orderId}</p>`;
  } else if (inputTypeVal === "Date") {
    metaData.minDate = minDateEl.value;
    metaData.maxDate = maxDateEl.value;


    renderInnerHTML = createInputForDateTextTypes(metaData,'min','max', metaData.minDate, metaData.maxDate);

    listInnerHTML = `<p class="input-list-child">Type: ${metaData.inputType} &nbsp;&nbsp; Max Date: ${metaData.maxDate}
    &nbsp;&nbsp; Min Date: ${metaData.minDate} &nbsp;&nbsp;BG Color: ${metaData.backColor}
    &nbsp;&nbsp; Text Color: ${metaData.textColor} &nbsp;&nbsp; OrderId: ${orderId}</p>`;
  }

  const renderEl = document.createElement("div");
  renderEl.classList.add('margin-10');
  renderEl.innerHTML = renderInnerHTML;
  renderDataContainerEl.appendChild(renderEl);

  const listEl = document.createElement("div");
  listEl.innerHTML = listInnerHTML;
  inputListContianerEl.appendChild(listEl);
  console.log(JSON.stringify(metaData));
  console.log(metaData);
}

function createInputForDateTextTypes(metaData, attrName1, attrName2, attrValue1, attrValue2){
    const renderInnerHTML = `<label style="color:${metaData.textColor}">${metaData.labelText}:</label>
    <input style="background-color:${metaData.backColor}; 
    color:${metaData.textColor};" 
    type="${metaData.inputType}"
    ${attrName1}="${attrValue1}"
    ${attrName2}="${attrValue2}"/>`;

    return renderInnerHTML;
}

inputDropdownEl.addEventListener("change", inputSelectionHandler);
