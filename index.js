const url = 'https://book-vault.onrender.com/books';

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
            bookDiv.id = item.id;
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

    // Create and append the blank option
    const blankOption = document.createElement('option');
    blankOption.value = '';
    blankOption.textContent = 'Select an author'; 
    select.appendChild(blankOption);

    fetch(url)
    .then(res => res.json())
    .then(data => {
        const authorsArr = data.map(book => book.author);
        const authors = [...new Set(authorsArr)];
        
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
    });

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

    // Create and append the blank option
    const blankOption = document.createElement('option');
    blankOption.value = '';
    blankOption.textContent = 'Select a genre'; 
    select.appendChild(blankOption);

    fetch(url)
    .then(res => res.json())
    .then(data => {
        const genresArr = data.map(book => book.genre);
        const genres = [...new Set(genresArr)];

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
    });

    filterDiv.append(p, select);
    genreDiv.append(filterDiv,genreBooksDiv);
}

function bookExpandable(id){
    
    fetch(url)
    .then(res => res.json())
    .then( data => {
        const book = data.find(book => book.id === id);
       
        const varName = document.getElementById('detailsId');

        if(book){
            
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'book-details';
            detailsDiv.id = 'detailsId';

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

            deleteButton.className = 'cta-button';
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
                handleDelete(id)
                detailsDiv.classList.remove('open');                    
            })

            inputDiv.addEventListener('submit', (e) => {
                e.preventDefault();
                
                updateRate(id, inputForm.value);
                inputDiv.reset();
            })

            closeButton.addEventListener('click', () => {
                detailsDiv.classList.remove('open');
            });

            inputDiv.append(inputForm, inputSubmit)
            moreInfo.append(detailedPublisher,detailedYear,detailedLanguage, detailedFormat, detailedPages,detailedRating);
            detailsDiv.append(closeButton, likeButton, detailedImage,detailedTitle,detailedAuthor,detailedSynopsis,moreInfo, inputDiv, deleteButton);

            if(varName){
                bookContainer.removeChild(bookContainer.lastChild)
                bookContainer.append(detailsDiv);
            } else {
                bookContainer.append(detailsDiv);
            }
            
            

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
    const addedBooks = document.querySelector('.newly-added');
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
        
        createdBooks.className = 'newly-added';

        bookDiv.innerHTML = '';
        
        bookForm.id = 'book-form';
        bookForm.style.display = 'flex';
        submit.type = 'submit'; 
        
        bookForm.innerHTML = '';
        bookDiv.classList.toggle('open')

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

                
        bookForm.append(bookCover,titleInput,authorInput,genreInput,ratingInput, submit);
        
        bookForm.addEventListener('submit', (e) => {
            const bookData = {
                title: titleInput.value,
                author: authorInput.value,
                coverImage: bookCover.value,
                genre: genreInput.value,
                rating: ratingInput.value
            };
            

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
                const createdBookDiv = document.createElement('div');
                const title = document.createElement('p');
                const coverImage = document.createElement('img');
                const author = document.createElement('p');
                const genre = document.createElement('p');
                const rating = document.createElement('p');
                const bookButton = document.createElement('btn');               
                

                createdBookDiv.className = 'book';
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
    
                createdBookDiv.append(title, coverImage, author, genre, bookButton)
                createdBooks.append(createdBookDiv);
            })
            
            bookForm.reset()
        })
        
        
        bookDiv.append(closeButton,bookForm);   
        addedBooks.append(createdBooks);     
    }
    
    
}

function handleDelete(id){
    
    fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to delete the book');
        }
        const deletedBook = document.getElementById(`${id}`);
        if (deletedBook) {
            deletedBook.remove();
        }       
    })
    .catch(error => console.error('Error:', error));
        
}

function updateRate(id, newRate){
    
    fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({rating: newRate})
    })
    .then(res => res.json())
    .then((data)=> {
        bookExpandable(data.id)

    })
}