const library = document.querySelector(".library");
const newBookButton = document.querySelector(".newBook");
const formPopup = document.querySelector(".form-popup");
const newBookForm = document.querySelector('.newBookForm')
const cancelButton = document.querySelector(".cancel");
const submitButton = document.querySelector(".submit");



newBookButton.addEventListener("click", openForm);
cancelButton.addEventListener("click", closeForm);
submitButton.addEventListener("click", submitForm)

let myLibrary = [];

function Book(title, author, pages, haveRead) {

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  
  

  this.info = function() {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.haveRead}`
  };
  
};


function openForm(){
  formPopup.setAttribute("style", "display: flex")
};


function closeForm(){
  formPopup.setAttribute("style", "display: none")
};


function addToLibrary(book) {
  myLibrary.push(book);
}


function submitForm(e) {
    

  if (newBookForm.reportValidity()){
    e.preventDefault();

    let formData = new FormData(newBookForm)

    let newBook = new Book(formData.get("bookTitle"), formData.get("bookAuthor"), formData.get("pages"), formData.get("haveRead"));
    
    addToLibrary(newBook);
  
    createBook(newBook);
  
    newBookForm.reset();
    closeForm();

  };



};




function createBook(book) {
  let bookDiv = document.createElement("div");
  let bookIndex = myLibrary.indexOf(book);
  bookDiv.setAttribute("style", "border: 1px solid black; background-color: yellow; width: 200px; height: 300px");
  bookDiv.dataset.index = bookIndex;

  bookDiv.classList.add("book");
  library.appendChild(bookDiv);

  let title = document.createElement("h4");
  title.classList.add("title", "section")
  title.textContent = `"${book.title}"`;
  bookDiv.appendChild(title);

  let div = document.createElement("div");
  div.textContent = "by";
  div.classList.add("div", "section")
  bookDiv.appendChild(div);

  let author = document.createElement("div");
  author.classList.add("author", "section")
  author.textContent = book.author;
  bookDiv.appendChild(author);


  let pages = document.createElement("div");
  pages.classList.add("pages", "section")
  pages.textContent = `${book.pages} pages`;
  bookDiv.appendChild(pages);
  

  let read = document.createElement("div");
  read.classList.add("haveRead", "section");
  read.textContent = book.haveRead;
  bookDiv.appendChild(read);


  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.dataset.index = bookIndex;

  deleteButton.addEventListener("click", deleteBook);
  bookDiv.appendChild(deleteButton);


};


function deleteBook(e) {
  let dataIndex = e.target.dataset.index
  console.log("Book has been deleted");

  myLibrary.splice(dataIndex, 1);

  updateLibrary(myLibrary);
};



function updateLibrary(allBooks){
  removeOldLibrary();


  allBooks.forEach(book => {
    createBook(book)  
  });
};



function removeOldLibrary() {
  let books = document.querySelectorAll(".book");
  for (i = 0; i < books.length; i++) {
    library.removeChild(books[i])
  };
};

