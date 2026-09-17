const savedBooks = localStorage.getItem("books");

const books = savedBooks
  ? JSON.parse(savedBooks)
  : [
      {
        title: "The Great Dictator",
        author: "Bertolt Brecht",
        year: 1941
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        year: 2018
      },
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        year: 1988
      }
    ];

const bookList = document.getElementById("bookList");
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const yearInput = document.getElementById("yearInput");
const bookCount = document.getElementById("bookCount");
const searchInput = document.getElementById("searchInput");

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

function displayBooks(bookArray = books) {
  bookList.innerHTML = "";
  bookCount.textContent = "Total books: " + bookArray.length;

  bookArray.forEach((book) => {
    const listItem = document.createElement("li");

    listItem.textContent =
      book.title + " by " +
      book.author + " (" +
      book.year + ") ";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
      const bookIndex = books.indexOf(book);

      books.splice(bookIndex, 1);
      saveBooks();
      displayBooks();
    });

    listItem.appendChild(deleteButton);
    bookList.appendChild(listItem);
  });
}

const bookForm = document.getElementById("bookForm");

bookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (
    titleInput.value === "" ||
    authorInput.value === "" ||
    yearInput.value === ""
  ) {
    alert("Please fill in all book details.");
    return;
  }

  const newBook = {
    title: titleInput.value,
    author: authorInput.value,
    year: yearInput.value
  };

  books.push(newBook);
  saveBooks();

  titleInput.value = "";
  authorInput.value = "";
  yearInput.value = "";

  displayBooks();
});

searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.toLowerCase();

  const filteredBooks = books.filter((book) => {
    const title = book.title.toLowerCase();
    const author = book.author.toLowerCase();

    return title.includes(searchText) || author.includes(searchText);
  });

  displayBooks(filteredBooks);
});

displayBooks();