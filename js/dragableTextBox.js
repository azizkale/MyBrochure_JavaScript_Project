function handleDragStart(e) {
  this.style.opacity = "0.4";
  this.style.color = "red";
}

function handleDragEnd(e) {
  this.style.opacity = "1";
  this.style.color = "blue";
}

let items = document.getElementsByClassName("allTexes");
items.forEach(function (item) {
  item.addEventListener("dragstart", handleDragStart);
  item.addEventListener("dragend", handleDragEnd);
});
