This is a project demo that uses Vanilla JS to build a Single Page Application.

first install missing modules with "npm i"
then run the command "npm start"

the project consists of these files :
index.html // html file
index.css // css file
app.js // contains application logic
server.js // which contains the server logic and api calls work
data.json // contains rectangles data

to test the application API I used this code
var rect = new getRectById(1);
console.log(
"setting the size... " +
(await rect.setSize(100, 100).then((data) => JSON.stringify(data)))
);
console.log(
"setting positon... " +
(await rect.setPosition(10, 10).then((data) => JSON.stringify(data)))
);
console.log(
"setting corner radius... " +
(await rect.setCornerRadius(5).then((data) => JSON.stringify(data)))
);
console.log(
"the json is... " +
(await rect.toJSON().then((data) => JSON.stringify(data)))
);

In this application i used express js html css and javascript
the application should let the user to:

1. Edit corner radius by dragging corner handle
2. Move rectangles around by dragging them
