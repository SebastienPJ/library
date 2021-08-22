const library = document.querySelector(".library");
const newBookButton = document.querySelector(".new-book-button");
const formPopup = document.querySelector(".form-popup");
const newBookForm = document.querySelector('.new-book-form');
const cancelButton = document.querySelector(".cancel");
const submitButton = document.querySelector(".submit");
const xForm = document.querySelector(".close-form");


newBookButton.addEventListener("click", openForm);
cancelButton.addEventListener("click", closeForm);
xForm.addEventListener("click", closeForm);
submitButton.addEventListener("click", createBookObject);




let myLibrary = [];


if (localStorage.length>0) {

  Object.keys(localStorage).sort(function(a,b){return a-b}).forEach(key => 
    myLibrary.push(JSON.parse(localStorage.getItem(key))));

  updateLibraryPage(myLibrary);

};



function Book(title, author, pages, haveRead) {

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  
};

Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages, Read: ${this.haveRead}`


};




function openForm(){
  formPopup.setAttribute("style", "display: flex;");
};


function closeForm(){
  formPopup.setAttribute("style", "display: none");
};


function addToLibrary(book) {
  myLibrary.push(book);
};


function findIndexOf(object) {
  return myLibrary.indexOf(object);
};


function createBookObject(e) {   

  if (newBookForm.reportValidity()){
    e.preventDefault();

    let formData = new FormData(newBookForm);

    let newBook = new Book(formData.get("bookTitle"), formData.get("bookAuthor"), formData.get("pages"), formData.get("haveRead"));
    
    newBook.prototype = Object.create(Book.prototype);

    addToLibrary(newBook);
    
    saveToLocalStorage(newBook);

    publishBook(newBook);
  
    newBookForm.reset();
    closeForm();

  };
};


function saveToLocalStorage(item) {
  localStorage.setItem(findIndexOf(item), JSON.stringify(item));
};



/******* Creates the book cards from submitted form *******/
function publishBook(book) {

  let bookDiv = document.createElement("div");
  let bookIndex = findIndexOf(book);
  bookDiv.dataset.index = bookIndex;
  bookDiv.classList.add("book", checkReadStatus(bookIndex));
  library.appendChild(bookDiv);


  let deleteButton = document.createElement("div");
  deleteButton.classList.add("close-button");
  deleteButton.innerHTML = "+";
  deleteButton.dataset.index = bookIndex;
  deleteButton.addEventListener("click", deleteBook);
  bookDiv.appendChild(deleteButton);


  let title = document.createElement("h4");
  title.classList.add("title", "card-section");
  title.textContent = `"${book.title}"`;
  bookDiv.appendChild(title);


  let div = document.createElement("div");
  div.textContent = "by";
  div.classList.add("card-section");
  bookDiv.appendChild(div);


  let author = document.createElement("div");
  author.classList.add("author", "card-section");
  author.innerHTML = `<em>${book.author}</em>`;
  bookDiv.appendChild(author);


  let pages = document.createElement("div");
  pages.classList.add("pages", "card-section");
  pages.textContent = `Length: ${book.pages} pages`;
  bookDiv.appendChild(pages);
  

  let read = document.createElement("div");
  read.classList.add("have-read", "card-section");
  read.textContent =`Read: ${book.haveRead}`;
  bookDiv.appendChild(read);





  let statusDiv = document.createElement("div");
  statusDiv.classList.add("change-read")
  bookDiv.appendChild(statusDiv);


  let changeReadStatus = document.createElement("button");

  changeReadStatus.classList.add("change-read-status");
  changeReadStatus.innerHTML = "Change Read Status";
  changeReadStatus.dataset.index = bookIndex;
  changeReadStatus.addEventListener("click", changeStatus);
  statusDiv.appendChild(changeReadStatus);

};


function checkReadStatus(index) {  
  return (myLibrary[index].haveRead == "No"? "not-read" : "already-read")
};



function deleteBook(e) {
  let dataIndex = e.target.dataset.index

  myLibrary.splice(dataIndex, 1);
  updateLibraryPage(myLibrary);
};




function updateLibraryPage(allBooks){
  removeOldLibraryPage();
  localStorage.clear();

  
  allBooks.forEach(book => {
    publishBook(book);
    saveToLocalStorage(book);
  });
};


function removeOldLibraryPage() {
  let books = document.querySelectorAll(".book");
  for (i = 0; i < books.length; i++) {
    library.removeChild(books[i])
  };
};



function changeStatus(e) {
  let index = e.target.dataset.index;

  if (myLibrary[index].haveRead == "No") {
    myLibrary[index].haveRead = "Yes"
  } else {
    myLibrary[index].haveRead = "No"
  };

  saveToLocalStorage(myLibrary[index]);


  updateBookCard(index);

};



function updateBookCard(cardIndex) {
  let targetCard = document.querySelector("[data-index=" + "'" 
  + `${cardIndex}` + "'" +"]");

  let selectedSection = targetCard.querySelector(".have-read");
  selectedSection.innerHTML = `Read: ${myLibrary[cardIndex].haveRead}`;

  targetCard.classList.contains("already-read")? 
    targetCard.classList.replace("already-read", "not-read"):
    targetCard.classList.replace("not-read", "already-read");

};