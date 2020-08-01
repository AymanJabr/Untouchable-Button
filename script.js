//gets button element
const untouchableBtn = document.getElementById("untouchable-button");
const VOFFSET = 100;
const HOFFSET = 80; //how far away will the button start escaping.
const SPEED = 10; //sets how fast the button moves

//closes the window if you manage to click on the button
untouchableBtn.addEventListener("click", () => {
  alert("Impressive, you actually clicked me!");
  window.close();
});

document.addEventListener("mousemove", (e) => {
  //e stands for event
  const x = e.pageX;
  const y = e.pageY; //get the x and y positions of the mouse

  //get dimensions of the button
  const buttonBox = untouchableBtn.getBoundingClientRect(); //gets the x and y positions of the box

  const disX = distanceFromCenter(buttonBox.x, x, buttonBox.width);
  const disY = distanceFromCenter(buttonBox.y, y, buttonBox.height);

  const horizontalOffset = buttonBox.width / 2 + HOFFSET;
  const verticalOffset = buttonBox.height / 2 + VOFFSET;

  //moves the button if the mouse is close to it
  if (Math.abs(disX) <= horizontalOffset && Math.abs(disY) <= verticalOffset) {
    setButtonPosition(
      buttonBox.x + (horizontalOffset / disX) * SPEED,
      buttonBox.y + (verticalOffset / disY) * SPEED
    );
  }
});

//changes button position
function setButtonPosition(left, top) {
  const windowBox = document.body.getBoundingClientRect();
  const buttonBox = untouchableBtn.getBoundingClientRect();

  if (distanceFromCenter(left, windowBox.left, buttonBox.width) < 0) {
    left = windowBox.right - buttonBox.width - HOFFSET / 4;
  }
  if (distanceFromCenter(left, windowBox.right, buttonBox.width) > 0) {
    left = windowBox.left + HOFFSET / 4;
  }
  if (distanceFromCenter(top, windowBox.top, buttonBox.height) < 0) {
    top = windowBox.bottom - buttonBox.height - VOFFSET / 4;
  }
  if (distanceFromCenter(top, windowBox.bottom, buttonBox.height) > 0) {
    top = windowBox.top + VOFFSET / 4;
  }

  //changes the position of the buttons given the inputs
  untouchableBtn.style.left = `${left}px`;
  untouchableBtn.style.top = `${top}px`;
}

//retursn the distance of the mouse from the centre
function distanceFromCenter(boxPosition, mousePosition, boxSize) {
  return boxPosition - mousePosition + boxSize / 2;
}
