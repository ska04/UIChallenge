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

const INPUT_TYPES = {
  CHECKBOX: 'Checkbox',
  DATE: 'Date',
  EMAIL: 'Email',
  PASSWORD: 'Password',
  RADIO: 'Radio',
  TEXT: 'Text'
}

window.onload = () => {
  optionsContainerEl.classList.add("hidden");
  dateContainerEl.classList.add("hidden");
};

// Handles the visibility of form-fields based on the input type selection
function inputSelectionHandler() {
  const inputType = inputDropdownEl.value;
  if (inputType === INPUT_TYPES.CHECKBOX || inputType === INPUT_TYPES.RADIO) {
    lengthContainerEl.classList.add("hidden");
    dateContainerEl.classList.add("hidden");

    optionsContainerEl.classList.remove("hidden");
  } else if (inputType === INPUT_TYPES.DATE) {
    lengthContainerEl.classList.add("hidden");
    optionsContainerEl.classList.add("hidden");

    dateContainerEl.classList.remove("hidden");
  } else if (
    inputType === INPUT_TYPES.TEXT ||
    inputType === INPUT_TYPES.PASSWORD ||
    inputType === INPUT_TYPES.EMAIL
  ) {
    dateContainerEl.classList.add("hidden");
    optionsContainerEl.classList.add("hidden");

    lengthContainerEl.classList.remove("hidden");
  }
}

// Add button click handler
function renderUI() {
  const inputTypeVal = inputDropdownEl.value;
  let isFormValid = false;
  if (
    inputTypeVal === INPUT_TYPES.TEXT ||
    inputTypeVal === INPUT_TYPES.PASSWORD ||
    inputTypeVal === INPUT_TYPES.EMAIL
  ) {
    isFormValid = checkRequired([labelTextEl, maxLengthEl, minLengthEl]);

  } else if (inputTypeVal === INPUT_TYPES.CHECKBOX || inputTypeVal === INPUT_TYPES.RADIO) {
    isFormValid = checkRequired([labelTextEl, groupNameEl]);
  } else if (inputTypeVal === INPUT_TYPES.DATE) {
    isFormValid = checkRequired([labelTextEl, minDateEl, maxDateEl]);
  }

  if(isFormValid){
    createMetaDataAndRenderInputs();
  }
}

function createMetaDataAndRenderInputs() {
  const inputTypeVal = inputDropdownEl.value;

  // Prepare metadata for input element as entered by user
  const metaData = {
    inputType: inputTypeVal,
    backColor: backColorEl.value,
    textColor: textColorEl.value,
    labelText: labelTextEl.value,
  };

  if (
    inputTypeVal === INPUT_TYPES.TEXT ||
    inputTypeVal === INPUT_TYPES.PASSWORD ||
    inputTypeVal === INPUT_TYPES.EMAIL
  ) {
    metaData.minLength = minLengthEl.value;
    metaData.maxLength = maxLengthEl.value;

  } else if (inputTypeVal === INPUT_TYPES.CHECKBOX || inputTypeVal === INPUT_TYPES.RADIO) {
    metaData.groupNameEl = groupNameEl.value;
  } else if (inputTypeVal === INPUT_TYPES.DATE) {
    metaData.minDate = minDateEl.value;
    metaData.maxDate = maxDateEl.value;
  }

  // Add input element to rendering section of the page
  let inputContainer = createInputElements(metaData);
  renderDataContainerEl.appendChild(inputContainer);

  // Add input element's properties to display list
  let inputPropertiesContainer = fetchInputProperties(metaData);
  inputInfoListContianerEl.appendChild(inputPropertiesContainer);

  // Outputting the meatada to console
  console.log(JSON.stringify(metaData));
  console.log(metaData);
}

// Create input element based on details provided by user
function createInputElements(metaData) {
  const containerDiv = document.createElement("div");
  containerDiv.classList.add('margin-10');

  // Create label for input element
  const labelEl = document.createElement("label");
  labelEl.style.color = metaData.textColor;
  labelEl.style.marginRight = '5px';
  labelEl.textContent = metaData.labelText;

  // Create input element
  const inputEl = document.createElement("input");
  inputEl.style.backgroundColor = metaData.backColor;
  inputEl.style.color = metaData.textColor;
  inputEl.type = metaData.inputType;

  if (
    metaData.inputType === INPUT_TYPES.TEXT ||
    metaData.inputType === INPUT_TYPES.PASSWORD ||
    metaData.inputType === INPUT_TYPES.EMAIL
  ) {
    inputEl.minLength = metaData.minLength;
    inputEl.maxLength = metaData.maxLength;
  } else if (metaData.inputType === INPUT_TYPES.DATE) {
    inputEl.min = metaData.minDate;
    inputEl.max = metaData.maxDate;
  } else if (
    metaData.inputType === INPUT_TYPES.CHECKBOX ||
    metaData.inputType === INPUT_TYPES.RADIO
  ) {
    inputEl.id = "checkRadioInput";
    inputEl.name = metaData.groupNameEl;
    labelEl.setAttribute("for", "checkRadioInput");
  }

  containerDiv.appendChild(labelEl);
  containerDiv.appendChild(inputEl);
  return containerDiv;
}

// Fetch properties of input element to display in the list of paragraph
function fetchInputProperties(metaData) {
  const paragraphEl = document.createElement("p");

  paragraphEl.textContent = `Type: ${metaData.inputType}; BG-Color: ${metaData.backColor}; 
  Text-Color: ${metaData.textColor}; `;
  
  if (
    metaData.inputType === INPUT_TYPES.TEXT ||
    metaData.inputType === INPUT_TYPES.PASSWORD ||
    metaData.inputType === INPUT_TYPES.EMAIL
  ) {
    paragraphEl.textContent += `Min-Length: ${metaData.minLength}; Max-Length: ${metaData.maxLength}`;
  } else if (metaData.inputType === INPUT_TYPES.DATE) {
    paragraphEl.textContent += `Min-Date: ${metaData.minDate}; Max-Date: ${metaData.maxDate}`;
  } 

  return paragraphEl;
}

// Check required fields
function checkRequired(inputArr) {
  let isValid = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      isValid = false;
      showError(input, `${getFieldName(input)} is required`);
    } else {
      isValid = true;
      showSuccess(input);
    }
  });

  return isValid;
}

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Attach event handler for dropdown
inputDropdownEl.addEventListener("change", inputSelectionHandler);
