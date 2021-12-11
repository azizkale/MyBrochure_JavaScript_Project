﻿//adds text to image
var arrayTextBoxes = [];
var arrayDivs = []; // to be able to show on canvas bigger
function addText() {
  var mousePosition;
  var offset = [0, 0];
  var textBox;
  var isDown = false;

  //yazı create
  textBox = document.createElement("input");
  textBox.style.position = "absolute";
  textBox.style.left = "120px";
  textBox.style.top = "40px";
  textBox.style.width = "200px";
  textBox.style.height = "auto";
  textBox.style.backgroundColor = "transparent";
  textBox.style.border = "none";
  textBox.style.fontSize = "30px";
  textBox.value = "my text";
  textBox.className = "allTexes";
  arrayTextBoxes.push(textBox);

  document.getElementById("idCerceve").appendChild(textBox);

  //Yazıyı mouse la hareket ettirme
  {
    textBox.addEventListener(
      "mousedown",
      function (e) {
        isDown = true;
        offset = [
          textBox.offsetLeft - e.clientX,
          textBox.offsetTop - e.clientY,
        ];
      },
      true
    );
    document.addEventListener(
      "mouseup",
      function () {
        isDown = false;
      },
      true
    );
    document.addEventListener(
      "mousemove",
      function (event) {
        event.preventDefault();
        if (isDown) {
          mousePosition = {
            x: event.clientX,
            y: event.clientY,
          };
          textBox.style.left = mousePosition.x + offset[0] + "px";
          textBox.style.top = mousePosition.y + offset[1] + "px";
        }
      },
      true
    );
  }

  //makes TextBoxeS width flexible while inputed text
  {
    textBox.addEventListener("input", resizeInput); // bind the "resizeInput" callback on "input" event
    resizeInput.call(textBox); // immediately call the function

    function resizeInput() {
      this.style.width = this.value.length + "ch";
    }
  }

  //click eventi
  textBox.addEventListener("click", function () {
    //makes all textboxes without border
    arrayTextBoxes.map(function (item) {
      item.style.border = "0px solid black";
    });
    //add border to textbox clicked
    this.style.border = "1px solid black";
  });
}

//Font size processes
{
  //populates the select tag of FontSize
  for (var i = 0; i < 200; i++) {
    sizeList = document.getElementById("idFontSize");
    sizeList.options[i] = new Option(i + 1, i + 1); // text and value
  }

  // the function which sets font size to text
  function fontSize() {
    var e = document.getElementById("idFontSize");
    var sizeValue = e.options[e.selectedIndex].value;
    arrayTextBoxes.map(function (item, index) {
      if (item.style.border == "1px solid black") {
        item.style.fontSize = sizeValue + "px";
      }
    });
  }
}

//Font Family processes
{
  var mevcutFontlar = [
    "Times New Roman",
    "Georgia",
    "Helvetica",
    "Comic Sans MS",
    "Agency FB",
    "Albertina",
    "Architect",
    "Arial",
    "BankFuturistic",
    "BankGothic",
    "Blackletter",
    "Swis721 BT",
    "Cabin",
    "Kunstler Script",
  ];

  //populates the select tag of Font Family
  for (var i = 0; i < mevcutFontlar.length; i++) {
    fontList = document.getElementById("idFontFamily");
    fontList.options[i] = new Option(mevcutFontlar[i], mevcutFontlar[i]); // text and value
  }

  function fontFamily() {
    var e = document.getElementById("idFontFamily");
    var family = e.options[e.selectedIndex].value;
    arrayTextBoxes.map(function (item, index) {
      if (item.style.border == "1px solid black") {
        item.style.fontFamily = family;
      }
    });
  }
}

//Font Style processes
{
  var styles = ["normal", "oblique", "italic", "Regular"];
  //populates the select tag of Font Style
  for (var i = 0; i < styles.length; i++) {
    styleList = document.getElementById("idFontStyle");
    styleList.options[i] = new Option(styles[i], styles[i]); // text and value
  }
  function fontStyle() {
    var e = document.getElementById("idFontStyle");
    var style = e.options[e.selectedIndex].value;
    arrayTextBoxes.map(function (item, index) {
      if (item.style.border == "1px solid black") {
        item.style.fontStyle = style;
      }
    });
  }
}

//Font Weight processes
{
  //populates the select tag of Font Weight
  for (var i = 0; i <= 9; i++) {
    weightList = document.getElementById("idFontWeight");
    weightList.options[i] = new Option(i * 100, i * 100); // text and value
  }
  function fontWeight() {
    var e = document.getElementById("idFontWeight");
    var style = e.options[e.selectedIndex].value;
    arrayTextBoxes.map(function (item, index) {
      if (item.style.border == "1px solid black") {
        item.style.fontWeight = style;
      }
    });
  }
}

//Font Colors processes
{
  function setColor() {
    var e = document.getElementById("idColor").value;
    arrayTextBoxes.map(function (item, index) {
      if (item.style.border == "1px solid black") {
        item.style.color = e;
      }
    });
  }
}

//All Texte's  Position
{
  function clickUp() {
    arrayTextBoxes.map(function (item, index) {
      var top = parseInt(item.style.top) - 10;
      if (top > 0) {
        item.style.top = top + "px";
      }
    });
  }
  function clickDown() {
    arrayTextBoxes.map(function (item, index) {
      var downn = parseInt(item.style.top) + 10;
      item.style.top = downn + "px";
    });
  }
  function clickLeft() {
    arrayTextBoxes.map(function (item, index) {
      var left = parseInt(item.style.left) - 10;
      item.style.left = left + "px";
    });
  }
  function clickRight() {
    arrayTextBoxes.map(function (item, index) {
      var right = parseInt(item.style.left) + 10;
      item.style.left = right + "px";
    });
  }
}

//Delete only the selected text
function deleteSelectedText() {
  arrayTextBoxes.map(function (item, index) {
    if (item.style.border == "1px solid black") {
      item.remove();
      arrayTextBoxes.splice(index, 1);
    }
  });
}

//Upload the Photo
{
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $("#blah").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }
  $("#imgInp").change(function () {
    readURL(this);
  });
}

//Dragable and Resizable Image
{
  //   var element = document.getElementById("blah");
  //   var x = 0;
  //   var y = 0;
  //   interact(element)
  //     .resizable({
  //       // resize from all edges and corners
  //       edges: { left: true, right: true, bottom: true, top: true },
  //       listeners: {
  //         move(event) {
  //           var target = event.target;
  //           var x = parseFloat(target.getAttribute("data-x")) || 0;
  //           var y = parseFloat(target.getAttribute("data-y")) || 0;
  //           // update the element's style
  //           target.style.width = event.rect.width + "px";
  //           target.style.height = event.rect.height + "px";
  //           // translate when resizing from top or left edges
  //           x += event.deltaRect.left;
  //           y += event.deltaRect.top;
  //           target.style.webkitTransform = target.style.transform =
  //             "translate(" + x + "px," + y + "px)";
  //           target.setAttribute("data-x", x);
  //           target.setAttribute("data-y", y);
  //           target.textContent =
  //             Math.round(event.rect.width) +
  //             "\u00D7" +
  //             Math.round(event.rect.height);
  //         },
  //       },
  //       modifiers: [
  //         // keep the edges inside the parent
  //         interact.modifiers.restrictEdges({
  //           outer: "parent",
  //         }),
  //         // minimum size
  //         interact.modifiers.restrictSize({
  //           min: { width: 100, height: 50 },
  //         }),
  //       ],
  //       inertia: true,
  //     })
  //     .draggable({
  //       // enable inertial throwing
  //       inertia: true,
  //       // keep the element within the area of it's parent
  //       modifiers: [
  //         interact.modifiers.restrictRect({
  //           restriction: "parent",
  //           endOnly: true,
  //         }),
  //       ],
  //       // enable autoScroll
  //       autoScroll: true,
  //       listeners: {
  //         // call this function on every dragmove event
  //         move: dragMoveListener,
  //         // call this function on every dragend event
  //         end(event) {
  //           var textEl = event.target.querySelector("p");
  //           textEl &&
  //             (textEl.textContent =
  //               "moved a distance of " +
  //               Math.sqrt(
  //                 (Math.pow(event.pageX - event.x0, 2) +
  //                   Math.pow(event.pageY - event.y0, 2)) |
  //                   0
  //               ).toFixed(2) +
  //               "px");
  //         },
  //       },
  //     });
  //   function dragMoveListener(event) {
  //     var target = event.target;
  //     // keep the dragged position in the data-x/data-y attributes
  //     var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  //     var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
  //     // translate the element
  //     target.style.webkitTransform = target.style.transform =
  //       "translate(" + x + "px, " + y + "px)";
  //     // update the posiion attributes
  //     target.setAttribute("data-x", x);
  //     target.setAttribute("data-y", y);
  //   }
  //   // this function is used later in the resizing and gesture demos
  //   window.dragMoveListener = dragMoveListener;
}

//Resiazble Preview Area
{
  //   var previewArea = document.getElementById("idCerceve");
  //   interact(previewArea).resizable({
  //     // resize from all edges and corners
  //     edges: { left: true, right: true, bottom: true, top: true },
  //     listeners: {
  //       move(event) {
  //         var target = event.target;
  //         var x = parseFloat(target.getAttribute("data-x")) || 0;
  //         var y = parseFloat(target.getAttribute("data-y")) || 0;
  //         // update the element's style
  //         target.style.width = event.rect.width + "px";
  //         target.style.height = event.rect.height + "px";
  //         // translate when resizing from top or left edges
  //         x += event.deltaRect.left;
  //         y += event.deltaRect.top;
  //         target.style.webkitTransform = target.style.transform =
  //           "translate(" + x + "px," + y + "px)";
  //         target.setAttribute("data-x", x);
  //         target.setAttribute("data-y", y);
  //         //target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
  //       },
  //     },
  //     modifiers: [
  //       // keep the edges inside the parent
  //       interact.modifiers.restrictEdges({
  //         outer: "parent",
  //       }),
  //       // minimum size
  //       interact.modifiers.restrictSize({
  //         min: { width: 100, height: 50 },
  //       }),
  //     ],
  //     inertia: true,
  //   });
}

//Preview Function
function clickPreview() {
  clickOnizlemeyiTemizle();
  //to delete border of preview area when clicked preview button
  document.getElementById("idCerceve").style.border = "none";
  //to delete border of textboxes when clicked preview button
  arrayTextBoxes.map(function (item) {
    item.style.border = "0px solid black";
  });

  // code below creates divs and make them with same features as inputs
  // and hides inputs and provides to show textes on canvas with divs
  // otherwise inputs can not display on canvas with their fontsize, bullshit
  arrayTextBoxes.forEach((item, index) => {
    let div = document.createElement("div");
    div.innerHTML = item.value;
    document.getElementById("idCerceve").append(div);
    div.style.top = item.style.top;
    div.style.bottom = item.style.bottom;
    div.style.right = item.style.right;
    div.style.left = item.style.left;
    div.style.fontSize = item.style.fontSize;
    div.style.position = "absolute";
    item.style.display = "none";
    arrayDivs.push(div);
  });

  html2canvas(document.getElementById("idCerceve")).then(function (canvas) {
    document.getElementById("previewImage").append(canvas);
    getCanvas = canvas;
  });

  //to block dismiss of preview modal when clicked outside
  $("#exampleModalCenter").modal({ backdrop: "static", keyboard: false });
}

//Download function
function clickDownload() {
  var imgageData = getCanvas.toDataURL("image/png");
  // Now browser starts downloading it instead of just showing it
  var newData = imgageData.replace(
    /^data:image\/png/,
    "data:application/octet-stream"
  );
  $("#btn-Convert-Html2Image")
    .attr("download", "afis.png")
    .attr("href", newData);

  //to give border again to preview area
  document.getElementById("idCerceve").style.border = "1px dotted black";
}

//Clear Preview div
function clickOnizlemeyiTemizle() {
  document.getElementById("previewImage").innerHTML = "";

  //to give border again to preview area
  document.getElementById("idCerceve").style.border = "1px dotted black";

  // code below removes all dives which created to be able to show texes on canvas better.
  arrayDivs.forEach((item, index) => {
    item.remove();
  });

  // code below shows all inputs again(make them visible)
  arrayTextBoxes.forEach((item, index) => {
    item.style.display = "inline";
  });
}
