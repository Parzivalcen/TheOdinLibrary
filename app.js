// list of books
let books = [];
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  console.log(`${this.title}, by ${this.author}, ${this.pages}, ${this.read}`);
};

// cards container
const cardsContainer = document.querySelector(".container--cards");
// this will be on a button.
function addBook() {
  // Takes user input
  let title = document.querySelector("#btitle").value;
  let author = document.querySelector("#bauthor").value;
  let pages = document.querySelector("#bpages").value;
  let read = document.querySelector("#bread");
  if (read.checked) {
    read = "Book Read";
  } else {
    read = "Not read";
  }
  let book = new Book(title, author, pages, read);
  // check if book exist on the list
  if (!cardsContainer.innerHTML.includes(book.title)) {
    books.push(book);
    loop();
  }
}

// CARDS
let count = 0;
function loop() {
  books.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <h2>${book.title}</h2>
    <h3>${book.author}</h3>
    <p>${book.pages} pages</p>
    <button class="btn--read">${book.read}</button>
    <button class="book-remove">Remove</button>
    `;

    // IF the books is not already in the screen, add it.
    if (!cardsContainer.innerHTML.includes(book.title)) {
      cardsContainer.appendChild(card);
      card.dataset.index = `${count}`;
      count++;
    }
  });
}
// Envent listener
// add books
const sendBtn = document.querySelector("#addBook");
sendBtn.addEventListener("click", () => {
  addBook();
});

// Remove books
// task: get current array index

/*
- Selects the cards Container
- listens for click on the document
- if that click contains the book remvove class
- the card is removed from the list and the DOM
*/
document.querySelector(".container--cards").addEventListener("click", (e) => {
  if (e.target.classList.contains("book-remove")) {
    books.splice(e.target.parentElement.dataset.index, 1);
    e.target.parentElement.remove();
  }
  // Change read status

  if (e.target.classList.contains("btn--read")) {
    if (e.target.innerText == "Book Read") {
      e.target.innerText = "Not Read";
    } else {
      e.target.innerText = "Book Read";
    }
  }
});

// UI
const addBookForm = document.querySelector(".new-book-btn");
const booksAddContainer = document.querySelector(".add-Container");

// SHOW form to add books when add new book is clicked
addBookForm.addEventListener("click", () => {
  const visibilily = booksAddContainer.getAttribute("data-visible");
  if (visibilily == "false") {
    booksAddContainer.setAttribute("data-visible", true);
  }
});

// Make the form to add new book desappear when a new book is added.
sendBtn.addEventListener("click", () => {
  const visibilily = booksAddContainer.getAttribute("data-visible");
  if (visibilily == "true") {
    booksAddContainer.setAttribute("data-visible", false);
  }
});

// book1 = new Book("The scientist", "Coldplay", 21, "Book Read");
// books.push(book1);
// book2 = new Book("7 Habits", "IDK", 212, "Not Read");
// books.push(book2);
// book3 = new Book("12 rules", "JBP", 500, "Not Read");
// books.push(book3);
// book4 = new Book("DUNE", "Frank Herbert", 1200, "Read");
// books.push(book4);
// loop();
