// get input values
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
  books.push(book);
  loop();
}
// Remove books
function removeBook() {
  const btnRemove = document.querySelector(".book-remove");
  btnRemove.addEventListener("click", () => {});
}

// CARDS
// cards container
const cardsContainer = document.querySelector(".container--cards");

function loop() {
  books.forEach((book) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <h2>${book.title}</h2>
    <h3>${book.author}</h3>
    <p>${book.pages}</p>
    <p>${book.read}</p>
    <button class="book-remove">Remove</button>
    `;
    // IF the books is not already in the screen, add it.
    if (!cardsContainer.innerHTML.includes(book.title)) {
      cardsContainer.appendChild(card);
    }
  });
}
// Envent listener
const sendBtn = document.querySelector("#addBook");
sendBtn.addEventListener("click", () => {
  addBook();
});
