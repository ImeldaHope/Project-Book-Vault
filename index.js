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

const bookContainer = document.querySelector('#books-container');
const authorDiv = document.querySelector('#author-filter');
const genreDiv = document.querySelector('#genre-filter');

document.addEventListener('DOMContentLoaded', () => {
    authorFilter();
    genreFilter();
    newBook();
    renderBooks();
})

function renderBooks(){
    fetch(url)
    .then(res => res.json())
    .then(data => {       
                

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

            const bookId = item.id;

            bookButton.addEventListener('click', () => {
                bookExpandable(bookId);
            });

            bookDiv.append(title, coverImage,author,genre, bookButton);
            bookContainer.append(bookDiv);
        })

        
    })


}

function authorFilter(){    
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

                    const bookId = book.id;
                    bookButton.addEventListener('click', () => {
                        bookExpandable(bookId);
                    });

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

                    const bookId = book.id;
                    bookButton.addEventListener('click', () => {
                        bookExpandable(bookId);
                    });

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

function bookExpandable(id){
    
    fetch(url)
    .then(res => res.json())
    .then( data => {
        const book = data.find(book => book.id === id);
        
        if(book){
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'book-details';

            detailsDiv.innerHTML = '';

            const detailedImage = document.createElement('img');
            const detailedTitle = document.createElement('h3');
            const detailedAuthor = document.createElement('h4');
            const detailedPages = document.createElement('p');
            const detailedPublisher = document.createElement('p');
            const detailedYear = document.createElement('p');
            const detailedLanguage = document.createElement('p');
            const detailedSynopsis = document.createElement('p');
            const detailedFormat = document.createElement('p');
            const detailedRating = document.createElement('p');
            const closeButton = document.createElement('button');
            const moreInfo = document.createElement('div');
            const likeButton = document.createElement('button');
            const deleteButton = document.createElement('button');
            const inputDiv = document.createElement('form');
            const inputForm = document.createElement('input');
            const inputSubmit = document.createElement('input');
            
            inputForm.type = 'input';
            inputForm.placeholder = 'Enter new rating';
            inputSubmit.type = 'submit';


            detailedImage.src = book.coverImage;
            detailedTitle.textContent = book.title;
            detailedAuthor.textContent = book.author;
            detailedSynopsis.textContent = book.synopsis;
            detailedPages.textContent = book.pages + " pages";
            detailedPublisher.textContent = "Publisher: " +book.publisher;
            detailedYear.textContent = "Published in: " + book.publicationDate;
            detailedLanguage.textContent = "Languages: " + book.language;
            detailedFormat.textContent = "Available in: " + book.format;
            detailedRating.textContent = "Rating: " + book.rating;
            deleteButton.textContent = 'Delete Book';            
            moreInfo.className = 'more-info';

            likeButton.textContent = '❤';
            likeButton.className = 'like-button';

            closeButton.textContent = 'X';
            closeButton.className = 'close-button';
            
            inputDiv.className = 'input-div';
            inputForm.className = 'input';

            const id = book.id;

            likeButton.addEventListener('click', () => {
                handleLike(id);
            })
            deleteButton.addEventListener('click', () => {
                handleDelete(id);
            })

            inputDiv.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log(inputForm.value)
                updateRate(id, inputForm.value);
                inputDiv.reset();
            })

            closeButton.addEventListener('click', () => {
                detailsDiv.classList.remove('open');
            });

            inputDiv.append(inputForm, inputSubmit)
            moreInfo.append(detailedPublisher,detailedYear,detailedLanguage, detailedFormat, detailedPages,detailedRating);
            detailsDiv.append(closeButton, likeButton, detailedImage,detailedTitle,detailedAuthor,detailedSynopsis,moreInfo, inputDiv, deleteButton);

            bookContainer.append(detailsDiv);
            console.log(detailsDiv)

            detailsDiv.classList.toggle('open');

        } else {
            console.error(`Book with ID ${id} not found in local data.`);
        }
        
    })
    .catch(err => console.error('Error fetching books:', err));
    
}

function handleLike(id){

}

function newBook(){
    const bookDiv = document.querySelector('.new-book');
    const bookBtn = document.querySelector('#book-btn');
    const bookForm = document.createElement('form');

    bookBtn.addEventListener('click', openModal);

    function openModal(){
        const closeButton = document.createElement('button');
        const bookCover = document.createElement('input');
        const authorInput = document.createElement('input');
        const titleInput = document.createElement('input');
        const ratingInput = document.createElement('input');
        const genreInput = document.createElement('input');
        const submit = document.createElement('input');
        const createdBooks = document.createElement('div');
        

        bookForm.id = 'book-form';
        bookForm.style.display = 'flex';
        submit.type = 'submit'; 
        
        bookCover.placeholder = 'Enter cover image url';
        authorInput.placeholder = 'Enter author\'s name';
        titleInput.placeholder = 'Enter book title';
        ratingInput.placeholder = 'Enter book\'s rating'
        genreInput.placeholder = 'Enter genre';

        closeButton.textContent = 'X';
        closeButton.className = 'close-button';

        closeButton.addEventListener('click', () => {
            bookDiv.classList.remove('open');
        });

                
        bookForm.append(closeButton,bookCover,titleInput,authorInput,genreInput,ratingInput, submit);
        
        bookForm.addEventListener('submit', (e) => {
            const bookData = {
                title: titleInput.value,
                author: authorInput.value,
                coverImage: bookCover.value,
                genre: genreInput.value,
                rating: ratingInput.value
            };
            console.log(bookData);

            e.preventDefault();

            fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(bookData)
            })
            .then(res => res.json())
            .then((book) => {
    
                const title = document.createElement('p');
                const coverImage = document.createElement('img');
                const author = document.createElement('p');
                const genre = document.createElement('p');
                const rating = document.createElement('p');
                const bookButton = document.createElement('btn');
    
                createdBooks.className = 'book';
                author.className = 'author';
                title.className = 'title';
                bookButton.className = 'book-button';

                bookButton.textContent = 'View Book';
                title.textContent = book.title;
                coverImage.src = book.coverImage;
                author.textContent = book.author;
                genre.textContent = book.genre;
                rating.textContent = book.rating;

                const bookId = book.id;
                bookButton.addEventListener('click', () => {
                    bookExpandable(bookId);
                });
    
                createdBooks.append(title, coverImage, author, genre, bookButton)
            })
        })
        
        bookDiv.classList.toggle('open')
        bookDiv.append(createdBooks, bookForm);        
    }
    
    
}

function handleDelete(id){
    
    fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

function updateRate(id, newRate){
    console.log()
    fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({rating: newRate})
    })
}