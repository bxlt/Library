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


class Library{

    constructor(){
        this.myLibrary = [];
        this.libList = document.getElementById('bookList');
        this.addBookButton = document.getElementById('addBook');
        this.bookForm = document.getElementById('bookForm');
        this.closeBtn = document.getElementById('closeBtn');
        this.bookInput = document.getElementById('bookDialog');
        this.deleteBookBtn = document.getElementsByClassName('deleteBook');
        this.bindEvents();
    }

    bindEvents() {
        this.addBookButton.addEventListener("click", () => this.showForm());
        this.closeBtn.addEventListener('click', () => this.closeBook());
        this.bookForm.addEventListener('submit', (e)=> this.addBook(e));
    }



    //show form when click
    showForm() {
    
    this.bookInput.showModal();
    this.addBookButton.style.display='none';    
    }
    
    //close book form
    closeBook(){
        this.bookInput.close();
        this.addBookButton.style.display='block';
    }

    //add book from html

    addBook(e) {
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
            this.addBookToLibrary(name.value, author.value, pages.value, isRead.checked);
        //bookForm.style.display='none';
        this.addBookButton.style.display='block';
        this.bookForm.reset();
        this.bookInput.close();
        }
    }
    
    addBookToLibrary(name,author,pages, read) {
        // take params, create a book then store it in the array
        let curr = new Book(name,author,pages,read);
        //console.log(curr);
        this.myLibrary.push(curr);
        this.addRow(curr);
      
        //console.log(myLibrary);
    }

    addRow(book){
        let curr = this.libList.insertRow(-1);
        let currName = curr.insertCell(-1);
        let currA = curr.insertCell(-1);
        let currP = curr.insertCell(-1);
        let currR = curr.insertCell(-1);
    
        let close = document.createElement('BUTTON');
        close.setAttribute('class', 'deleteBook');
        close.innerText='X'
        close.addEventListener('click',()=>{
            this.deleteFromLib(close.parentNode.parentNode.getAttribute('data-id'));
            close.parentNode.parentNode.remove();
        })
    
        let checkReadBox = document.createElement('input');
        checkReadBox.setAttribute('type','checkbox');
        let checkRead = curr.insertCell(-1);
        checkRead.appendChild(checkReadBox);
        checkReadBox.addEventListener('click',()=>{
            console.log("change read status");
            this.updateReadStatus(book.id);
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

    updateReadStatus(id){
        this.updateLib(id);
        this.updateHtml(id);
    }
    updatePage(){
        for(let i =0;i<this.myLibrary.length;i++){
            this.addRow(this.myLibrary[i]); 
            console.log(this.myLibrary[i]);
        }
    
    }

    //update book property
    updateLib(id){
        for(var i=0;i<this.myLibrary.length;i++){
            if(this.myLibrary[i].id===id){
                this.myLibrary[i].read = true;
                break;
            }
        }
    }


    updateHtml(id){
        for(let r of this.libList.rows){
            if(r.getAttribute('data-id')===id){
                r.cells[3].innerText = 'Yes';
                r.cells[4].style.display ='none';
                break;
            }
        }
    }


    //delete book from myLib
    deleteFromLib(id){
        //console.log(myLibrary)
        //console.log(id);
        for(var i=0;i<this.myLibrary.length;i++){
            if(this.myLibrary[i].id===id){
                this.myLibrary.splice(i,1);
                break;
            }
        }
    //console.log(myLibrary)
    }
}

const myLibrary = new Library();
