const addBook = document.getElementById("addBook");
const addBookModal = document.getElementById("addBookModal");
const addBookForm = document.getElementById("addBookForm");
const booksGrid = document.getElementById("booksGrid");
const closeBookModal = document.getElementById("close");

let library = new Library();

function Book(title, author, pages, isRead) {
	this.title = title;
    this.author = author;
	this.pages = pages;
    this.isRead = isRead;
}

function Library() {
	this.books = [];
  
    this.addBookToLibrary = function(book) {
  	this.books.push(book);
    createBookCard(book);
  };
  
  this.removeBookFromLibrary = function(book) {
    const index = library.books.findIndex(book => book.title === title.textContent);

    if (index !== -1) {
        library.books.splice(index, 1);
    }
  };
  
  this.isTitlePresent = function(title) {
  	for (let book of this.books) {
    	if (book.title === title) {
      	return true;
      }
    }
    
    return false;
  };
}

function createBookCard(book) {
	const bookCard = document.createElement("div");
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const buttonGroup = document.createElement("div");
    const readCheckbox = document.createElement("input");
    const removeButton = document.createElement("button");
    
    bookCard.classList.add("book-card");
    buttonGroup.classList.add("button-group");
    readCheckbox.classList.add("checkbox");
    readCheckbox.type = "checkbox";
    removeButton.id = "removeButton";
    removeButton.classList.add("button");
    
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    readCheckbox.checked = book.isRead;
    removeButton.textContent = "Remove";
  
    removeButton.onclick = function() {
        // Find the closest book-card div and remove it
        const bookCard = this.closest(".book-card");
        bookCard.remove();
        library.removeBookFromLibrary(book);
        };
  
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    buttonGroup.appendChild(readCheckbox);
    buttonGroup.appendChild(removeButton);
    bookCard.appendChild(buttonGroup);
    booksGrid.appendChild(bookCard);
}

addBook.onclick = function() {
	addBookModal.style.display = "block";
}

window.onclick = function(event) {
  if (event.target === addBookModal) {
   	addBookModal.style.display = "none";
  }
}

addBookForm.onsubmit = function(event) {
	const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    const isRead = document.getElementById("isRead");
  
    let errorElement;
    const errorElements = {
        title: document.getElementById("titleError"),
        author: document.getElementById("authorError"),
        pages: document.getElementById("pagesError")
    };
  
	event.preventDefault();
  
    for (errorElement of Object.values(errorElements)) {
        errorElement.style.display = "block";
        errorElement.style.color = "red";
    }
  
    if (title.value.trim() === "") {
        errorElements.title.textContent = "Title is required";
        errorElements.title.style.display = "block";
        return;
    }
    
    if (author.value.trim() === "") {
        errorElements.author.textContent = "Author is required";
        errorElements.author.style.display = "block";
        return;
    }
    
    if (pages.value.trim() === "") {
        errorElements.pages.textContent = "Pages are required";
        errorElements.pages.style.display = "block";
        return;
    }
  
    if (library.isTitlePresent(title.value)) {
        errorElements.title.textContent = "This book is already in the library";
        errorElements.title.style.display = "block";
        return;
    }
    
    let book = new Book(title.value, author.value, pages.value, isRead.checked);
    library.addBookToLibrary(book);
    addBookModal.style.display = "none";
    
    title.value = "";
    author.value = "";
    pages.value = "";
    isRead.checked = false;
    
    for (let errorElement of Object.values(errorElements)) {
        errorElement.textContent = "";
        errorElement.style.display = "none";
    }
}

closeBookModal.onclick = function(event) {
    if (event.target === closeBookModal) {
        addBookModal.style.display = "none";
   }
}