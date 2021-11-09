"use strict";
import { dragRectangle, changeRectangleRadius } from "./dragEvents.mjs";

if (typeof window !== "undefined") {
  //call drawRectangles() on window load
  window.onload = async function drawRectangles() {
    let rectanglesData;
    //return data from json file
    await sendGetRequest("/rectanglesData").then(
      (data) => (rectanglesData = data)
    );
    //draw the rectangles with the fetched data
    rectanglesData.map((data) => {
      let rectangleDiv = document.createElement("div");
      rectangleDiv.style.width = data.width + "px";
      rectangleDiv.style.height = data.height + "px";
      rectangleDiv.style.position = "absolute";
      rectangleDiv.style.left = data.x + "px";
      rectangleDiv.style.top = data.y + "px";
      rectangleDiv.style.borderRadius = data.radius + "px";
      rectangleDiv.style.backgroundColor = "red";
      rectangleDiv.setAttribute("id", data.id.toString());
      document.body.appendChild(rectangleDiv);
      rectangleDiv.innerHTML += '<div class="resizer nw"></div>';
    });
    //launch the mousedown event for the selected rectangle
    document.addEventListener("mousedown", mousedown);
    function mousedown(e) {
      let selectedDiv;
      e.target.id !== ""
        ? (selectedDiv = document.getElementById(e.target.id))
        : (selectedDiv = document.getElementById(e.target.parentElement.id));
      let isResizing = false;
      dragRectangle(e, selectedDiv, isResizing);
      changeRectangleRadius(selectedDiv, isResizing);
    }
  };
}
//sendGetRequest send POST request to backend
export async function sendPostRequest(path, newRect) {
  const options = {
    path: path,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRect),
  };
  let response;
  await fetch(path, options)
    .then((response) => response.json())
    .then((data) => (response = data))
    .catch((err) => console.log(err));
  return response;
}

//sendGetRequest send GET request to backend
async function sendGetRequest(path) {
  const options = {
    path: path,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let response;
  await fetch(path, options)
    .then((response) => response.json())
    .then((data) => (response = data))
    .catch((err) => console.log(err));
  return response;
}

//here you find the api logic
export class getRectById {
  constructor(id) {
    this.id = id;
  }
  newRect = {};
  async setSize(width, height) {
    let updatedRectangle;
    this.newRect.width = width;
    this.newRect.height = height;
    this.newRect.id = this.id;
    await sendPostRequest("/setSize/", this.newRect).then(
      (data) => (updatedRectangle = data)
    );
    return updatedRectangle;
  }
  async setPosition(x, y) {
    let updatedRectangle;
    this.newRect.x = x;
    this.newRect.y = y;
    this.newRect.id = this.id;
    await sendPostRequest("/setPosition/", this.newRect).then(
      (data) => (updatedRectangle = data)
    );
    return updatedRectangle;
  }
  async setCornerRadius(radius) {
    let updatedRectangle;
    this.newRect.radius = radius;
    this.newRect.id = this.id;
    await sendPostRequest("/setCornerRadius/", this.newRect).then(
      (data) => (updatedRectangle = data)
    );
    return updatedRectangle;
  }
  async toJSON() {
    let updatedRectangle;
    await sendGetRequest(`/rectanglesData/${this.id}`).then(
      (data) => (updatedRectangle = data)
    );
    return updatedRectangle;
  }
}
