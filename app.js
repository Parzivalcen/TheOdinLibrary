// list of books
let books = [];
// book object
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}
// add book to UI
class UI {
  static booksLSdisplay() {
    let books = StoreBook.getBooks();
    books.forEach((book) => {
      UI.addBookGrid(book);
    });
  }
  static addBookGrid(book) {
    const booksContainer = document.querySelector(".container--cards");
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");
    bookCard.innerHTML = `
    <h2 class="btitle">${book.title}</h2>
    <h3 class="bauthor">by ${book.author}</h3>
    <p class="bpages">${book.pages} pages</p>
    <button class="bread">${book.read}</button>
    <button class="remove-btn">remove</button>
    `;
    booksContainer.appendChild(bookCard);
    console.log("book Added to grid");
  }
  static removeBookGrid(el) {
    if (el.target.classList.contains("remove-btn")) {
      el.target.parentElement.remove();
      console.log("book removed from grid");
    }
  }
  // Change read status
  static ChageRead(e) {
    if (e.target.classList.contains("bread")) {
      if (e.target.innerHTML == "read") {
        e.target.innerHTML = "not read";
      } else {
        e.target.innerHTML = "read";
      }
      console.log();
    }
  }
}

// Store book in LOCAL STORAGE
class StoreBook {
  // Create a list of books to add to local storage
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    console.log("get Books called");
    return books;
  }
  // ADD LS
  static addBook(book) {
    let books = StoreBook.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  // REMOVE LS
  static removeBook(e) {
    if (e.target.classList.contains("remove-btn")) {
      let title =
        e.target.previousElementSibling.previousElementSibling
          .previousElementSibling.previousElementSibling.innerHTML;

      let books = StoreBook.getBooks();
      books.forEach((book, index) => {
        if (book.title == title) {
          books.splice(index, 1);
        }
        localStorage.setItem("books", JSON.stringify(books));
      });
    }
  }
  static changeRead(e) {
    if (e.target.classList.contains("bread")) {
      console.log("change read LS");
      let books = StoreBook.getBooks();

      books.forEach((book) => {
        if (book.read == "read") {
          book.read = "not read";
        } else {
          book.read = "read";
        }
      });
      localStorage.setItem("books", JSON.stringify(books));
    }
  }
}

/*---------
Events
------------*/
document.addEventListener("DOMContentLoaded", UI.booksLSdisplay());
// Show form
const newBookBtn = document.querySelector(".new-book-btn");
const addForm = document.querySelector(".add-Container");
newBookBtn.addEventListener("click", () => {
  let visibility = addForm.getAttribute("data-visible");
  if (visibility == "false") {
    addForm.setAttribute("data-visible", true);
  }
});

// Add Btn Form
const addBtn = document.querySelector("#addBook");
addBtn.addEventListener("click", () => {
  const title = document.querySelector("#btitle").value;
  const author = document.querySelector("#bauthor").value;
  const pages = document.querySelector("#bpages").value;
  let read = document.querySelector("#bread").checked;
  if (read) {
    read = "read";
  } else {
    read = "not read";
  }

  let newBook = new Book(title, author, pages, read);
  // CALL ADD BOOK
  UI.addBookGrid(newBook);
  StoreBook.addBook(newBook);
  const addForm = document.querySelector(".add-Container");
  // Make form dissappear
});
// remove book from grid btn
document.addEventListener("click", (e) => {
  UI.removeBookGrid(e);
  UI.ChageRead(e);
  StoreBook.removeBook(e);
  StoreBook.changeRead(e);
  if (
    e.target.classList.contains("form-space") ||
    e.target.classList.contains("container--cards") ||
    e.target.classList.contains("addBook")
  ) {
    addForm.setAttribute("data-visible", false);
  }
});
