
//adds text to image
var arrayTextBoxes = [];
function addText() {
    var mousePosition;
    var offset = [0, 0];
    var textBox;
    var isDown = false;

    //yazı create
    textBox = document.createElement("input");
    textBox.style.position = "absolute";
    textBox.style.left = "120px";
    textBox.style.top = "0px";
    textBox.style.width = "auto";
    textBox.style.backgroundColor = "transparent";
    textBox.style.border = "none";
    textBox.style.fontSize = "30px";    
    textBox.value = "my text";
    textBox.className = "allTexes";
    arrayTextBoxes.push(textBox);

    arrayTextBoxes.map(function (item) {
        item.style.border = "0px solid black";
    });
    textBox.style.border = "1px solid black";

    document.getElementById('idCerceve').appendChild(textBox);

    //Yazıyı mouse la hareket ettirme
    {
        textBox.addEventListener('mousedown', function (e) {
            isDown = true;
            offset = [
                textBox.offsetLeft - e.clientX,
                textBox.offsetTop - e.clientY
            ];
        }, true);
        document.addEventListener('mouseup', function () {
            isDown = false;
        }, true);
        document.addEventListener('mousemove', function (event) {
            event.preventDefault();
            if (isDown) {
                mousePosition = {
                    x: event.clientX,
                    y: event.clientY
                };
                textBox.style.left = (mousePosition.x + offset[0]) + 'px';
                textBox.style.top = (mousePosition.y + offset[1]) + 'px';
            }
        }, true);
    }
   
    //makes TextBoxeS width flexible while inputed text
    {
        textBox.addEventListener('input', resizeInput); // bind the "resizeInput" callback on "input" event
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
        sizeList = document.getElementById('idFontSize');
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
    var mevcutFontlar = ["Times New Roman", "Georgia", "Helvetica", "Comic Sans MS", "Agency FB", "Albertina", "Architect", "Arial", "BankFuturistic", "BankGothic", "Blackletter", "Swis721 BT", "Cabin", "Kunstler Script"];

    //populates the select tag of Font Family
    for (var i = 0; i < mevcutFontlar.length; i++) {
        fontList = document.getElementById('idFontFamily');
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
        styleList = document.getElementById('idFontStyle');
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
        weightList = document.getElementById('idFontWeight');
        weightList.options[i] = new Option(i*100, i*100); // text and value
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

//All Texte's  Rotation
{
    function clickUp() {
        arrayTextBoxes.map(function (item, index) {            
            var top = parseInt(item.style.top) - 10;
            if (top>0) {
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
                $('#blah').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
    }
    $("#imgInp").change(function () {
        readURL(this);
    });
}


//Dragable and Resizable Image Area
{
    var element = document.getElementById('blah')
    var x = 0; var y = 0

    interact(element)
        .draggable({
            modifiers: [
                interact.modifiers.snap({
                    targets: [
                        interact.createSnapGrid({ x: 30, y: 30 })
                    ],
                    range: Infinity,
                    relativePoints: [{ x: 0, y: 0 }]
                }),
                interact.modifiers.restrict({
                    restriction: element.parentNode,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
                    endOnly: true
                })
            ],
            inertia: true
        })
        .on('dragmove', function (event) {
            x += event.dx
            y += event.dy

            event.target.style.webkitTransform =
                event.target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)'
        }).resizable({
            // resize from all edges and corners
            edges: { left: true, right: true, bottom: true, top: true },

            listeners: {
                move(event) {
                    var target = event.target
                    var x = (parseFloat(target.getAttribute('data-x')) || 0)
                    var y = (parseFloat(target.getAttribute('data-y')) || 0)

                    // update the element's style
                    target.style.width = event.rect.width + 'px'
                    target.style.height = event.rect.height + 'px'

                    // translate when resizing from top or left edges
                    x += event.deltaRect.left
                    y += event.deltaRect.top

                    target.style.webkitTransform = target.style.transform =
                        'translate(' + x + 'px,' + y + 'px)'

                    target.setAttribute('data-x', x)
                    target.setAttribute('data-y', y)
                    target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
                }
            },
            modifiers: [
                // keep the edges inside the parent
                interact.modifiers.restrictEdges({
                    outer: 'parent'
                }),

                // minimum size
                interact.modifiers.restrictSize({
                    min: { width: 100, height: 50 }
                })
            ],

            inertia: true
        })
}

//Resiazble Preview Area
{
    var previewArea = document.getElementById("idCerceve");
    interact(previewArea).resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        listeners: {
            move(event) {
                var target = event.target
                var x = (parseFloat(target.getAttribute('data-x')) || 0)
                var y = (parseFloat(target.getAttribute('data-y')) || 0)

                // update the element's style
                target.style.width = event.rect.width + 'px'
                target.style.height = event.rect.height + 'px'

                // translate when resizing from top or left edges
                x += event.deltaRect.left
                y += event.deltaRect.top

                target.style.webkitTransform = target.style.transform =
                    'translate(' + x + 'px,' + y + 'px)'

                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)
                //target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
            }
        },
        modifiers: [
            // keep the edges inside the parent
            interact.modifiers.restrictEdges({
                outer: 'parent'
            }),

            // minimum size
            interact.modifiers.restrictSize({
                min: { width: 100, height: 50 }
            })
        ],

        inertia: true
    });    
}

//Preview Function
function clickPreview() {
    //to delete border of preview area when clicked preview button
    document.getElementById("idCerceve").style.border = "none";
    //to delete border of textboxes when clicked preview button
    arrayTextBoxes.map(function (item) {
        item.style.border = "0px solid black";
    });

    //preview function
    html2canvas(document.getElementById("idCerceve"), {
        onrendered: function (canvas) {
            document.getElementById("previewImage").append(canvas);
            getCanvas = canvas;
        }
    });
   
    //to block dismiss of preview modal when clicked outside
    $('#exampleModalCenter').modal({ backdrop: 'static', keyboard: false })  
    //to set position of preview modal
    $("#exampleModalCenter").css({ "left": - ($(window).width() - $("#idCerceve img").width()) / 2 });
   
}

//Download function
function clickDownload() {
    var imgageData = getCanvas.toDataURL("image/png");
    // Now browser starts downloading it instead of just showing it
    var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
    $("#btn-Convert-Html2Image").attr("download", "afis.png").attr("href", newData);

    //to give border again to preview area
    document.getElementById("idCerceve").style.border = "1px dotted black";

}

//Clear Preview div
function clickOnizlemeyiTemizle() {
    document.getElementById("previewImage").innerHTML = "";

    //to give border again to preview area
    document.getElementById("idCerceve").style.border = "1px dotted black";

}