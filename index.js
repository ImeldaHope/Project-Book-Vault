const url = 'http://localhost:3000/books';
const genres = ['','Biography', 'Business','Fantasy','Fiction','Non-Fiction','Romance','Self-Help','Thriller']
const authors = [
    "",
    "Alice Schroeder",
    "Ashlee Vance",
    "Barack Obama",
    "Brianna West",
    "Chimamanda Ngozi Adichie",
    "Dale Carnegie",
    "Dan Brown",
    "Eric Ries",
    "Frank Herbert",
    "George Orwell",
    "Gillian Flynn",
    "J.K. Rowling",
    "James Clear",
    "James Patterson",
    "Jim Collins",
    "John Brooks",
    "John Green",
    "John Grisham",
    "Jordan B. Peterson",
    "Jomo Kenyatta",
    "Lois P. Frankel",
    "Malcolm Gladwell",
    "Margaret Ogolla",
    "Mark Manson",
    "Michelle Obama",
    "Morgan Housel",
    "Napoleon Hill",
    "Nassim Nicholas Taleb",
    "Ngũgĩ wa Thiong'o",
    "Nicholas Sparks",
    "Paula Hawkins",
    "Philip Zimbardo",
    "Reid Hoffman",
    "Ben Casnocha",
    "Robert Greene",
    "Robert T. Kiyosaki",
    "Stephen R. Covey",
    "Stephenie Meyer",
    "Stieg Larsson",
    "Witi Tame Ihimaera",
    "Yuval Noah Harari"
];

document.addEventListener('DOMContentLoaded', () => {
    authorFilter();
    genreFilter();
    renderBooks();
})

function renderBooks(){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        
        const bookContainer = document.querySelector('#books-container');        

        data.map((item) => {
            const bookDiv = document.createElement('div');
            const title = document.createElement('p');
            const coverImage = document.createElement('img');
            const author = document.createElement('p');
            const genre = document.createElement('p');
            const bookButton = document.createElement('btn');
            

            bookDiv.className = 'book';
            author.className = 'author';
            title.className = 'title';
            bookButton.className = 'book-button';

            coverImage.src = item.coverImage;
            title.textContent = item.title;            
            author.textContent = item.author;
            genre.textContent = item.genre;
            bookButton.textContent = 'View Book';
            bookButton.addEventListener('click', bookModalView);

            bookDiv.append(title, coverImage,author,genre, bookButton);
            bookContainer.append(bookDiv);
        })

        
    })


}

function authorFilter(){
    const authorDiv = document.querySelector('#author-filter');
    const filterDiv = document.createElement('div');

    filterDiv.classList.add('filter');

    const authorBooksDiv = document.createElement('div');
    authorBooksDiv.className = "selected-author";

    const p = document.createElement('p');
    p.textContent = 'Filter books based on author: ';

    const select = document.createElement('select');
    select.id = "authors-dropdown";

    authors.map((author) => {
        const option = document.createElement('option');
        option.value = author;
        option.textContent =  author;
        select.appendChild(option);
    })
    
    select.addEventListener('change', () => {
        const selectedAuthor = select.value;       
        
        fetch(url)
        .then(res => res.json())
        .then(books => {

            authorBooksDiv.innerHTML = ``;

            if(authors.includes(selectedAuthor)){
                
                const ul = document.createElement('ul');
                ul.className = "author-book";

                const filteredBooks = books.filter(book => book.author === selectedAuthor);
                const authorName = document.createElement('p');
                authorName.classList.add('selected-author');
                authorName.textContent = `Books by: ${selectedAuthor}`;

                filteredBooks.forEach(book => {   
                    const authorList = document.createElement('li');
                    const selectedBookImg = document.createElement('img');                   
                    const selectedBookTitle = document.createElement('p');
                    const bookButton = document.createElement('button');                  
                    
                    authorList.className = 'author-list';
                    bookButton.classList.add('book-button');

                    selectedBookImg.src = book.coverImage; 
                    selectedBookTitle.textContent = `${book.title}`;  
                    bookButton.textContent = 'View Book';
                    bookButton.addEventListener('click', bookModalView);

                    authorList.append(selectedBookImg,bookButton,selectedBookTitle);
                    ul.append(authorList)
                });                
                
                authorBooksDiv.append(authorName,ul);

                console.log(`Selected author "${selectedAuthor}" is in the authors list.`);
            }
            else {
                console.log(`Selected author "${selectedAuthor}" is not in the authors list.`);
            } 
        })     
    })

    filterDiv.append(p, select);
    authorDiv.append(filterDiv,authorBooksDiv);
}

function genreFilter(){
    const genreDiv = document.querySelector('#genre-filter');
    const filterDiv = document.createElement('div');

    filterDiv.classList.add('filter');

    const genreBooksDiv = document.createElement('div');
    genreBooksDiv.className = "selected-author";

    const p = document.createElement('p');
    p.textContent = 'Filter books based on genre: ';

    const select = document.createElement('select');
    select.id = "genres-dropdown";

    genres.map((bkGenre) => {
        const option = document.createElement('option');
        option.value = bkGenre;
        option.textContent = bkGenre;
        select.appendChild(option);
    })
    
    select.addEventListener('change', () => {
        const selectedGenre = select.value;       
        
        fetch(url)
        .then(res => res.json())
        .then(books => {

            genreBooksDiv.innerHTML = ``;

            if(genres.includes(selectedGenre)){
                
                const ul = document.createElement('ul');
                ul.className = "author-book";

                const filteredBooks = books.filter(book => book.genre === selectedGenre);
                const authorName = document.createElement('p');
                authorName.classList.add('selected-author');
                authorName.textContent = `${selectedGenre} books`;

                filteredBooks.forEach(book => {   
                    const authorList = document.createElement('li');
                    const selectedBookImg = document.createElement('img');                   
                    const selectedBookTitle = document.createElement('p');
                    const bookButton = document.createElement('button');                  
                    
                    authorList.className = 'author-list';
                    bookButton.classList.add('book-button');

                    selectedBookImg.src = book.coverImage; 
                    selectedBookTitle.textContent = `${book.title}`;  
                    bookButton.textContent = 'View Book';
                    bookButton.addEventListener('click', bookModalView);

                    authorList.append(selectedBookImg,bookButton,selectedBookTitle);
                    ul.append(authorList)
                });                
                
                genreBooksDiv.append(authorName,ul);

                console.log(`Selected genre "${selectedGenre}" is in the genre list.`);
            }
            else {
                console.log(`Selected genre "${selectedGenre}" is not in the genre list.`);
            } 
        })     
    })

    filterDiv.append(p, select);
    genreDiv.append(filterDiv,genreBooksDiv);
}

function bookModalView(){
    const modal =document.querySelector('#modal');
    
    fetch(url)
    .then(res => res.json())
    .then(bookData => {
        console.log("I am inside fetch");
    })
}
