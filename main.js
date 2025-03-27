const myLibrary = [];
const libList = document.getElementById('bookList');
const addBookButton = document.getElementById('addBook');
const bookForm = document.getElementById('bookForm');
const closeBtn = document.getElementById('closeBtn');
const bookInput = document.getElementById('bookDialog');
const deleteBookBtn = document.getElementsByClassName('deleteBook');

class Book{
    constructor(name, author, pages,read=false) {
        // the constructor...
        this.id = crypto.randomUUID();
        this.name = name;
        this.author = author;
        this.pages= pages;
        this.read = read;
      }
    
    setRead(isRead){
        this.read = isRead;
    }
}

function addBookToLibrary(name,author,pages, read) {
  // take params, create a book then store it in the array
  let curr = new Book(name,author,pages,read);
  console.log(curr);
  myLibrary.push(curr);
    addRow(curr);

  //console.log(myLibrary);
}

function updatePage(){
    for(let i =0;i<myLibrary.length;i++){
        addRow(myLibrary[i]);
        
        
        console.log(myLibrary[i]);
    }

}

function addRow(book){
    let curr = libList.insertRow(-1);
    let currName = curr.insertCell(-1);
    let currA = curr.insertCell(-1);
    let currP = curr.insertCell(-1);
    let currR = curr.insertCell(-1);

    let close = document.createElement('BUTTON');
    close.setAttribute('class', 'deleteBook');
    close.innerText='X'
    close.addEventListener('click',()=>{

        deleteFromLib(close.parentNode.parentNode.getAttribute('data-id'));
        close.parentNode.parentNode.remove();
    })

    let willRead = document.createElement('input');
    willRead.setAttribute('type','checkbox');
    let checkRead = curr.insertCell(-1);
    checkRead.appendChild(willRead);
    willRead.addEventListener('click',function(){
        let id = willRead.parentNode.parentNode.getAttribute('data-id');
        updateLib(id);
        updateHtml(id);
    });

    let deleteBtn = curr.insertCell(-1);
    deleteBtn.appendChild(close);

    curr.setAttribute('data-id', book.id,'class', 'bookRow');
    currName.innerHTML = book.name;
    currA.innerHTML = book.author;
    currP.innerHTML = book.pages;
    if(book.read){
        currR.innerHTML = "Yes";
    }else{
        currR.innerHTML = "No";
    }
}

//show form when click
addBookButton.addEventListener("click",()=>{
    bookInput.showModal();
    addBookButton.style.display='none';
})

//close book form
closeBtn.addEventListener('click', ()=>{
    bookInput.close();
    addBookButton.style.display='block';
})

//add book from html
bookForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let name = document.getElementById('bName');
    let author = document.getElementById('bAuthor');
    let pages = document.getElementById('bPage');
    let isRead = document.getElementById('bRead');
    //console.log(isRead.checked)

    if(name.value==""||author.value==""||pages.value==""){
        alert("Please enter book title, author, page number");
        return false;
    }else{
        addBookToLibrary(name.value, author.value, pages.value, isRead.checked);
        //bookForm.style.display='none';
        addBookButton.style.display='block';
        bookForm.reset();
        bookInput.close();
    }

})

//update book property
function updateLib(id){
    for(var i=0;i<myLibrary.length;i++){
        if(myLibrary[i].id===id){
            myLibrary[i].read = true;
            break;
        }
    }
}

function updateHtml(id){
    
    for(let r of libList.rows){
        if(r.getAttribute('data-id')===id){
            r.cells[3].innerText = 'Yes';
            r.cells[4].style.display ='none';
            break;
        }
    }


}

//delete book from myLib
function deleteFromLib(id){
    //console.log(myLibrary)
    //console.log(id);
    for(var i=0;i<myLibrary.length;i++){
        if(myLibrary[i].id===id){
            myLibrary.splice(i,1);
            break;
        }
    }
    //console.log(myLibrary)
}
