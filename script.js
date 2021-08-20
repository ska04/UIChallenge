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
  createPayload();
}

function createPayload() {
  let renderInnerHTML;
  let listInnerHTML;

  const inputTypeVal = inputDropdownEl.value;
  const payload = {
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
    payload.minLength = minLengthEl.value;
    payload.maxLength = maxLengthEl.value;

    renderInnerHTML = `<label style="color:${payload.textColor}">${payload.labelText}:</label>
    <input style="background-color:${payload.backColor}; 
    color:${payload.textColor};" 
    type="${payload.inputType}"
    minlength="${payload.minLength}"
    maxlength="${payload.maxLength}"/>`;

    listInnerHTML = `<p class="input-list-child">Type: ${payload.inputType} &nbsp;&nbsp; Max Length: ${payload.maxLength}
    &nbsp;&nbsp; Min Length: ${payload.minLength} &nbsp;&nbsp;BG Color: ${payload.backColor}
    &nbsp;&nbsp; Text Color: ${payload.textColor}
    </p>`;
  } else if (inputTypeVal === "Checkbox" || inputTypeVal === "Radio") {
    payload.option1Text = option1El.value;
    payload.option2Text = option2El.value;

    renderInnerHTML = `<label style="color:${payload.textColor}">${payload.labelText}:</label>
    <input id='checkRadioInput' type="${payload.inputType}" name="selectinos"/>
    <label for="checkRadioInput" style="color:${payload.textColor}">${payload.option1Text}</label>
    <input id='checkRadioInput' type="${payload.inputType}" name="selectinos"/>
    <label for="checkRadioInput" style="color:${payload.textColor}">${payload.option2Text}</label>`;

    listInnerHTML = `<p class="input-list-child">Type: ${payload.inputType} &nbsp;&nbsp; 
    BG Color: ${payload.backColor} &nbsp;&nbsp; Text Color: ${payload.textColor}</p>`;
  } else if (inputTypeVal === "Date") {
    payload.minDate = minDateEl.value;
    payload.maxDate = maxDateEl.value;

    renderInnerHTML = `<label style="color:${payload.textColor}">${payload.labelText}:</label>
    <input style="background-color:${payload.backColor}; 
    color:${payload.textColor};" 
    type="${payload.inputType}"
    min="${payload.minDate}"
    max="${payload.maxDate}"/>`;

    listInnerHTML = `<p class="input-list-child">Type: ${payload.inputType} &nbsp;&nbsp; Max Date: ${payload.maxDate}
    &nbsp;&nbsp; Min Date: ${payload.minDate} &nbsp;&nbsp;BG Color: ${payload.backColor}
    &nbsp;&nbsp; Text Color: ${payload.textColor}
    </p>`;
  }

  const renderEl = document.createElement("div");
  renderEl.classList.add('margin-10');
  renderEl.innerHTML = renderInnerHTML;
  renderDataContainerEl.appendChild(renderEl);

  const listEl = document.createElement("div");
  listEl.innerHTML = listInnerHTML;
  inputListContianerEl.appendChild(listEl);
  console.log(JSON.stringify(payload));
  console.log(payload);
}

inputDropdownEl.addEventListener("change", inputSelectionHandler);
