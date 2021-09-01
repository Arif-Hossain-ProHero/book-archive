const loadData = () => {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    const url = `https://openlibrary.org/search.json?q=${searchValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data))
        .catch(error => console.log('fetch error'))
}

const displayData = data => {
    console.log(data);
    const books = data.docs;
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

    //   <div class="card mb-3" style="max-width: 540px;">
    //             <div class="row g-0">
    //                 <div class="col-md-4">
    //                     <img src="..." class="img-fluid rounded-start" alt="...">
    //                 </div>
    //                 <div class="col-md-8">
    //                     <div class="card-body">
    //                         <h5 class="card-title">Card title</h5>
    //                         <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
    //                             content. This content is a little bit longer.</p>
    //                         <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
}
