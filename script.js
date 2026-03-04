const library = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function updateCardUI(book, buttonElement) {
    const card = buttonElement.closest(".book-card");

    card.classList.toggle("read", book.read);
    card.classList.toggle("unread", !book.read);

    buttonElement.textContent = book.read ? "Mark Unread" : "Mark Read";

    card.classList.remove("animate");
    void card.offsetWidth;
    card.classList.add("animate");
}

function toggleBookRead(id, buttonElement) {
    const book = library.find(book => book.id === id);

    if (!book) {
        return;
    }

    book.toggleRead();

    updateCardUI(book, buttonElement);
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    library.push(newBook);
}

function removeBook(id) {
    const index = library.findIndex(book => book.id === id);

    if (index !== -1) {
        library.splice(index, 1);
        displayLibrary();
    }
}

function displayLibrary() {
    const libraryDiv = document.getElementById("library");
    libraryDiv.innerHTML = '';

    if (library.length === 0) {
        const emptyMessage = document.createElement("div");
        emptyMessage.classList.add("empty-state");
        emptyMessage.textContent = "Your library is empty. Add a new book.";
        libraryDiv.appendChild(emptyMessage);
        return;
    }

    library.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        if (book.read) {
            card.classList.add("read");
        } else {
            card.classList.add("unread");
        }

        card.innerHTML = `
            <h3>${book.title}</h3>
            <p class="author">${book.author}</p>
            <p>${book.pages} pages</p>

            <div class="card-actions">
                <button class="toggle-btn" data-id="${book.id}">
                    ${book.read ? "Mark Unread" : "Mark Read"}
                </button>
                <button class="remove-btn" data-id="${book.id}">
                    Remove
                </button>
            </div>
        `;

        libraryDiv.appendChild(card);
    });
}

// manual test books
addBookToLibrary("The Hobbit", "Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Clean Code", "Robert C. Martin", 464, true);

// initial render
displayLibrary();

const newBookBtn = document.getElementById("newBookBtn");
const bookDialog = document.getElementById("bookDialog");
const bookForm = document.getElementById("bookForm");
const cancelBtn = document.getElementById("cancelBtn");

newBookBtn.addEventListener("click", () => {
    bookDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    bookDialog.close();
});

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);
    displayLibrary();

    bookForm.reset();
    bookDialog.close();
});

const libraryDiv = document.getElementById("library");

libraryDiv.addEventListener("click", (event) => {
    const id = event.target.dataset.id;

    if (event.target.classList.contains("remove-btn")) {
        removeBook(id);
    }

    if (event.target.classList.contains("toggle-btn")) {
        toggleBookRead(id, event.target);
    }
});