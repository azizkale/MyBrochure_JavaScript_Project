//adds text to image
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

  // for touchable screens======
  textBox.setAttribute("draggable", true);
  textBox.addEventListener("touchstart", touchHandler, true);
  textBox.addEventListener("touchmove", touchHandler, true);
  textBox.addEventListener("touchend", touchHandler, true);
  textBox.addEventListener("touchcancel", touchHandler, true);
  //=================
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

  //makes TextBoxeS width flexible while inputing text
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
    div.style.color = item.style.color;
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
