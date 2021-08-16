const library = document.querySelector(".library");
const newBookButton = document.querySelector(".newBook");
const formPopup = document.querySelector(".form-popup");
const newBookForm = document.querySelector('.newBookForm');
const cancelButton = document.querySelector(".cancel");
const submitButton = document.querySelector(".submit");
const xForm = document.querySelector(".close");


newBookButton.addEventListener("click", openForm);
cancelButton.addEventListener("click", closeForm);
xForm.addEventListener("click", closeForm);
submitButton.addEventListener("click", submitForm);

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
  bookDiv.dataset.index = bookIndex;

  bookDiv.classList.add("book", checkReadStatus(bookIndex));
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


  let changeReadStatus = document.createElement("button");
  changeReadStatus.classList.add("changeRead");
  changeReadStatus.innerHTML = "Change Read Status"
  changeReadStatus.dataset.index = bookIndex;

  changeReadStatus.addEventListener("click", changeStatus);
  bookDiv.appendChild(changeReadStatus);


  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete")
  deleteButton.innerHTML = "Remove";
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


function changeStatus(e) {
  let index = e.target.dataset.index;

  if (myLibrary[index].haveRead == "No") {
    myLibrary[index].haveRead = "Yes"
  } else {
    myLibrary[index].haveRead = "No"
  }

  let target = document.querySelector("[data-index=" + "'" + `${index}` + "'" +"]");

  let selectedSection = target.querySelector(".haveRead");
  selectedSection.innerHTML = myLibrary[index].haveRead

  if (target.classList.contains("alreadyRead")) {
    target.classList.replace("alreadyRead", "notYetRead")
  } else {
    target.classList.replace("notYetRead", "alreadyRead")

  }

}


function checkReadStatus(index) {  
  return (myLibrary[index].haveRead == "No"? "notYetRead" : "alreadyRead")
}


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

