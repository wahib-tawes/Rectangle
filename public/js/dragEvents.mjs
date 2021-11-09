import { sendPostRequest } from "./app.mjs";

export function dragRectangle(e, div, isResizing) {
  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  let prevX = e.clientX;
  let prevY = e.clientY;

  function mousemove(e) {
    if (isResizing === false) {
      let newX = prevX - e.clientX;
      let newY = prevY - e.clientY;

      const rect = div.getBoundingClientRect();

      div.style.left = rect.left - newX + "px";
      div.style.top = rect.top - newY + "px";

      prevX = e.clientX;
      prevY = e.clientY;
    }
  }

  function mouseup(e) {
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
    const newRect = {
      id: Number(e.target.id),
      x: e.x,
      y: e.y,
    };
    sendPostRequest("/setPosition/", newRect);
  }
}

//resize function not working perfectly
export function changeRectangleRadius(div, isResizing) {
  const resizer = div.querySelector(`.resizer`);
  resizer.addEventListener("mousedown", mousedown);

  function mousedown(e) {
    isResizing = true;

    let prevX = e.clientX;
    let prevY = e.clientY;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    // just updated the values here but it's not what we are looking for
    function mousemove(e) {
      div.style.borderRadius = "100px";
      div.style.borderRadius = "100px";

      prevX = e.clientX;
      prevY = e.clientY;
    }

    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
      isResizing = false;
      //can't update data because here because i didn't find the solution yet
      /* const newRect = {
        id: Number(e.target.id),
        x: e.x,
        y: e.y,
      };
      sendPostRequest("/setCornerRadius/", newRect);  */
    }
  }
}
