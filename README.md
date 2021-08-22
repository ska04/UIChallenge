# Dynamic Web Form

This application is built with native **JavaScript**, **HTML5** and **CSS3**. I have used external JavaScript and CSS files and added referneces of both of the files in index.html.

## Folder Sturcture:

It contains below files/folders:

1. Index.html --> This file contains the **HTML Code** of the apploication.
2. style.css  --> This file contains the **Styling/CSS** for the index.html.
3. script.js  --> This file contains the **javascript code** for the application.
4. README.md  --> This file contains instructions about the application.
5. assets     --> This folder contains the **screenshots** for better understanding of the application.

## How to run

We can run this application without a server also. Just we need to open index.html in the browser and we can use the application. Also we can serve this appilcation with server also(e.g. Live Server in VS Code)

## Adding inputs:

It supports 6 types of inputs : Text, Date, Password, Email, Checkbox, Radio(We can group radio buttons to make only one selection at a time). Based on the selection of input form input selection dropdown respectives options will be loaded dynamically for that particular inputs .

## Attributes/properties we can set fot inputs

**Email**, **Password** and **Text** inputs have same Attributes/properties
**Checkbox**, **Radiobuttons** inputs have same Attributes/properties.

- Text/Password/Email
    1. Background Color
    2. Text Color
    3. Label -- (Basic required validation is added, we need to fill this otherwise we can't procced.)
    4. Min Length -- (Basic required validation is added, we need to fill this otherwise we can't procced.)
    5. Max Length -- (Basic required validation is added, we need to fill this otherwise we can't procced.)

- Date
    1. Background Color
    2. Text Color
    3. Label -- (Basic required validation is added, we need to fill this otherwise we can't procced.)
    4. Min Date -- (Basic required validation is added, we need to fill this otherwise we can't procced.)
    5. Max Date -- (Basic required validation is added, we need to fill this otherwise we can't procced.)

- ChaeckBox/RadioButton:
    1. Background Color
    2. Text Color
    3. Label -- (Basic required validation is added, we need to fill this otherwise we can't procced.)
    4. Group Name -- (Basic required validation is added, we need to fill this otherwise we can't procced.)
