let main

document.addEventListener("DOMContentLoaded", () => {
//There must be a div with the class name main in your index.html file. All components will be appended to this div
  main = document.querySelector(".main")
  
  //Replace the url in the fetch with the url your google docs csv url
fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQJDT-oVtwSXpiRvZ_vwJsBn95DlT7UMpXZqSwlwJvc0yjyWe2-JrosJsJzg2A-Me3F7V2QBc06o6mY/pub?gid=0&single=true&output=csv")
    .then(response => response.text())
    .then(csvData => {
      Papa.parse(csvData, {
        header: true, // Treat the first row as column headers
        skipEmptyLines: true, // Ignore empty rows
        complete: function(results) {
          results.data.forEach(row => {
            displayComponent(row);
          });
        }
      });
    });
});

function displayComponent(row){
  let component = document.createElement("div")
  component.classList.add("cat-component")

  let name = document.createElement("p")
  name.textContent = row.name
  name.classList.add("name")
  main.append(component)
  component.append(name)

  let image = document.createElement("img")
  image.src = "images/" + row.image
  image.classList.add("cat-image")
  component.append(image)

  let color = document.createElement("p")
  color.textContent = row.color
  color.classList.add("color")
  component.append(color)
  
  let description = document.createElement("p")
  description.textContent = row.description
  description.classList.add("description")
  component.append(description)
}