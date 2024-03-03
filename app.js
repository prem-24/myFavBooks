// book constructor function
const Book = function (title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
};

// UI constructor function
function UI() {}

// Adding method to UI prototype
UI.prototype.addBookToList = function (book) {
  const list = document.querySelector("#book-list");
  const row = document.createElement("tr");

  row.innerHTML = `
    <th class="align-middle">${book.title}</th>
    <td class="align-middle">${book.author}</td>
    <td class="align-middle">${book.isbn}</td>
    <td class="align-middle"><button class="btn btn-danger close">Delete</button></td>
  `;

  list.appendChild(row);

  if (list.getElementsByTagName("tr").length === 0) {
    const noListMessage = document.createElement("tr");
    noListMessage.innerHTML = `
      <td colspan="4" class="text-center">NO LIST</td>
    `;
    list.appendChild(noListMessage);
  }
};

// remove methods

UI.prototype.deleteBook = function (target) {
  if (target.className === "btn btn-danger close") {
    target.parentElement.parentElement.remove();
  }
};

// remove methods

// UI.prototype.deleteBook = function (target) {
//   if (target.classList.contains("close")) {
//     target.parentElement.parentElement.remove();
//   }
// };

// Clear fields method
UI.prototype.clearFields = function () {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#ISBN").value = "";
};

// elements accessing using dom

const bookForm = document.querySelector("#book-form");
const deletee = document.querySelector("#book-list");

// load my events
function loadEventListeners() {
  // form submit event
  bookForm.addEventListener("submit", addBook);

  //   delete list
  deletee.addEventListener("click", deleteBook);

  // getTask from local storage
  document.addEventListener("DOMContentLoaded", getBookLocalStorage);
}

loadEventListeners();

//   addBook

function addBook(e) {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#ISBN").value;

  // caling UI func
  if (isbn.length > 4) {
    alert("ISBN should not exceed 4 digits.");
    document.querySelector("#ISBN").value = ""; // Clear the ISBN input field
    return; // Exit the function
  }

  const ui = new UI();

  // Validation
  if (title === "" || author === "" || isbn === "") {
    if (title === "") {
      alert("Please fill all the title field ✍🏻 ");
    }
    if (author === "") {
      alert("Please fill all the author field 🥸");
    }
    if (isbn === "") {
      alert("Please fill all the isbn field 🌟");
    }
  } else {
    const newBook = new Book(title, author, isbn);
    ui.addBookToList(newBook);

    storeLocalValue(newBook);
    ui.clearFields();
  }
}

// deleteBook

function deleteBook(e) {
  e.preventDefault();

  const ui = new UI();

  ui.deleteBook(e.target);
  removeLocalValue(e.target);
}

// store local values
function storeLocalValue(newBook) {
  let books;

  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  books.push(newBook);
  localStorage.setItem("books", JSON.stringify(books));
}

// getBookLocalStorage

function getBookLocalStorage() {
  let books;

  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  const ui = new UI();

  for (let i = 0; i < books.length; i++) {
    const newBook = new Book(books[i].title, books[i].author, books[i].isbn);
    ui.addBookToList(newBook);
  }
}

// remove local storage


function removeLocalValue(target) {
    let books;
  
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
  
    // Get the ISBN of the book to be deleted
    const isbnToDelete = target.parentElement.previousElementSibling.textContent;
  
    // Filter out the book with the specified ISBN
    books = books.filter((book) => book.isbn !== isbnToDelete);
  
    // Set the local storage item with the corrected array of books
    localStorage.setItem("books", JSON.stringify(books));
  }
  