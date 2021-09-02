const loadData = () => {
    let searchInput = document.getElementById('search-input');
    const bookContainer = document.getElementById('book-container');
    const showResults = document.getElementById('show-results-number');
    const loader = document.getElementById('loading');
    loader.style.display = 'block';
    bookContainer.textContent = '';
    showResults.textContent = '';
    const searchValue = searchInput.value;
    if (searchInput.value === '') {
        displayError();
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                displayData(data);
                loader.style.display = 'none';
            }
                )
        searchInput.value = "";
    }
}

const displayData = data => {
    console.log(data);
    let books = data.docs;
    const totalResults = data.numFound;
    if (totalResults === 0) {
        displayError()
    }
    else {
        const showResults = data.docs.length;
    showTotalResults(totalResults, showResults);
    books.forEach(book => {
        const title = book.title;
        const authors = book.author_name;
        const firstRelease = book.first_publish_year;
        const publisher = book.publisher;
        const coverI = book.cover_i;
        let coverImage='';
        if (coverI) {
            coverImage = `https://covers.openlibrary.org/b/id/${coverI}-M.jpg`;
        }
        else {
            coverImage = `https://openlibrary.org/images/icons/avatar_book-sm.png`;
        }    
        const div = document.createElement('div');
        div.classList.add('col-md-4','col-sm-6');
        const bookContainer = document.getElementById('book-container');
        div.innerHTML = `
              <div class="card mb-3" style="max-width: 400px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${coverImage}" width="200px" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h3 class="card-title">${title}</h3>
                            <p style="font-size:18px">By: ${authors?.join(',')} </p>
                            <p><span class="text-info">Published By:</span> ${publisher?.join(',')}</p>
                            <p class="card-text"><span class="text-primary">First released in</span> ${firstRelease}</p>
                        </div>
                    </div>
                </div>
            </div>
        `

        bookContainer.appendChild(div);
    })    
    }
    
}
// total result show
const showTotalResults = (totalResults, showResults) => {
    const p = document.createElement('p');
    const parent = document.getElementById('show-results-number');
    p.innerText = `Showing ${showResults} out of ${totalResults} results`;
    parent.appendChild(p);
}
// error show
const displayError = () => {
    const loader = document.getElementById('loading');
    loader.style.display = 'none';
    const p = document.createElement('p');
    const parent = document.getElementById('show-results-number');
    parent.textContent = '';
    p.innerText = `Please input valid book name`;
    parent.appendChild(p);
}
