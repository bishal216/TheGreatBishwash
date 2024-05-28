var jsonData = [
  {
    imageURL: "images/logo.png",
    title: "Title 1",
    text: "Some sample text about the article this hexagon leads to",
  },
  {
    imageURL: "images/logo.png",
    title: "Title 2",
    text: "Some sample text about another article",
  },
];

// Function to add elements to the hexGrid ul
function addElementsToHexGrid(data) {
  var hexGrid = document.getElementById("hexGrid");

  // Iterate over the JSON data
  data.forEach(function (item) {
    // Create elements
    var li = document.createElement("li");
    li.classList.add("hex");

    var div1 = document.createElement("div");
    div1.classList.add("hexIn");

    var a = document.createElement("a");
    a.classList.add("hexLink");
    a.href = "#";

    var div2 = document.createElement("div");
    div2.classList.add("img");
    div2.style.backgroundImage = "url(" + item.imageURL + ")";

    var h1 = document.createElement("h1");
    h1.classList.add("demo1");
    h1.textContent = item.title;

    var p = document.createElement("p");
    p.classList.add("demo2");
    p.textContent = item.text;

    // Append elements
    a.appendChild(div2);
    a.appendChild(h1);
    a.appendChild(p);
    div1.appendChild(a);
    li.appendChild(div1);
    hexGrid.appendChild(li);
  });
}

// Call the function with the JSON data
addElementsToHexGrid(jsonData);
