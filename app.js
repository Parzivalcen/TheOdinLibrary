// get input values
let books = [
  { title: "david", author: "steven", pages: 111, read: "on" },
  {
    title: "The gulag archipielago",
    author: "alexander",
    pages: 222,
    read: "on",
  },
];
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
    `;
    // console.log(books[key].title);
    cardsContainer.appendChild(card);
  });
}
