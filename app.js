// as we refresh it should show the previous notes
shownotes();
// if user add a notes,add it to the local storage

let addbtn = document.getElementById("addBtn");
addbtn.addEventListener("click", function () {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes"); //here notes is a key(a string)
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
  };
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  shownotes();
});

// function to show notes

function shownotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    let textarea2 = document.getElementById("addTxt2");
    html += `  <div class="card my-2 mx-2 noteCard" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text">${element.text}</p>
      <button id="${index}" onclick="delnote(this.id)" class="btn btn-primary">Delete Note</button>
    </div>
  </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Add a note to see here`;
  }
}

// function to delete notes
function delnote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();
  }
}

// function for search bar
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

