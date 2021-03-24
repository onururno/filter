const filter = document.getElementById("filter");
const dropdown = document.getElementById("myDropdown");
const filterContainer = document.getElementById("filter-container");

// data
const dropdownArr = ["Köln", "Düsseldorf", "Dortmund", "Essen", "Duisburg", "Bochum",
 "Wuppertal", "Bielefeld", "Bonn", "Münster", "Mönchengladbach", "Gelsenkirchen",
  "Aachen", "Krefeld", "Oberhausen", "Hagen", "Hamm" , "Mülheim an der Ruhr", "Leverkusen", 
  "Solingen", "Herne", "Neuss", "Paderborn", "Bottrop", "Bergisch Gladbach"];

let filterArr = [];
let idHolderArr = [];
let selectedEl = 0;


// create an element for dropdown
function createEl(){
  for(let i = 0; i < dropdownArr.length; i++){
    let className = dropdownArr[i];
    let El = document.createElement("a");
    El.appendChild(document.createTextNode(dropdownArr[i]));
    dropdown.appendChild(El);
    El.classList.add("stadt");
    El.setAttribute("id", `stadt${className}`);
  }
}


createEl();
const links = dropdown.querySelectorAll(".stadt");


// fill the input with text by clicking
links.forEach(link => {
  link.addEventListener("click", () => {
    
    filter.value = link.innerHTML;
    
  });
});
  
// Filter possts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  filterArr = [];
  
  // Wenn term  gleich leer dann gib alle städte
  if (term.length <= 0) {

    links.forEach(link  => {
      const linkFilter = link.innerText.toUpperCase();
      
      if(linkFilter.indexOf(term) > -1) {
          link.style.display = "flex";
          filterArr.push(link.innerHTML);
      } else {
          link.style.display = "none";
      }  
      
  });
  } else {
    links.forEach(link  => {
        const linkFilter = link.innerText.toUpperCase();
        
        if(linkFilter.indexOf(term) > -1) {
            link.style.display = "flex";
            filterArr.push(link.innerHTML);
        } else {
            link.style.display = "none";
        }  
    });
  }
  // background wird farblich zurück gesetzt und die zeile wird farblich makiert
  console.log(filterArr +  " = filter");
  links.forEach(link => {
    link.style.backgroundColor = "#f1f1f1";
});
document.getElementById(`stadt${filterArr[selectedEl]}`).style.backgroundColor = "lightblue";
  
}

filter.addEventListener('focus', filterPosts);


// key function
document.onkeydown = checkKey;
function checkKey(e) {

  const elementn = 0;
  const elementl = filterArr.length -1;
  
     if (e.keyCode == '8') {
        // back
        // dropdown liste wird gezeigt wenn sie aus ist
        if(dropdown.classList.contains("show") === false){
          dropdown.classList.add("show");
        }
        // index array wird auf 0 gesetzt
        selectedEl = 0;
        
        
    }
  
    if (e.keyCode == '13') {
        // enter
        filter.value = filterArr[selectedEl];
        dropdown.classList.remove("show");
        
    }

    if (e.keyCode == '40') {
        // down arrow
        if(selectedEl >= elementl){
          selectedEl = elementl;
        }else{
          selectedEl++
        }
    }
    
    if (e.keyCode == '38') {
        // up arrow
        if(selectedEl <= elementn){
          selectedEl = elementn;
        }else{
          selectedEl--;
        }
    }
  // background wird farblich zurück gesetzt und die zeile wird farblich makiert
  links.forEach(link => {
    link.style.backgroundColor = "#f1f1f1";
});
document.getElementById(`stadt${filterArr[selectedEl]}`).style.backgroundColor = "lightblue";
console.log(selectedEl);
console.log(filterArr[selectedEl]);
console.log(filterArr);
};



// toggle dropdown
function dropdownFunction(){
  dropdown.classList.add("show");
  links.forEach(link => {
    link.style.backgroundColor = "#f1f1f1";
});
  document.getElementById(`stadt${filterArr[0]}`).style.backgroundColor = "lightblue";
  selectedEl = 0;
}

// close dropdown list by clicking outside the dropdown
window.onclick = function(event) {
  if (!event.target.matches('.filter')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};


// EventListener
filter.addEventListener("click", dropdownFunction);
filter.addEventListener("input", filterPosts);