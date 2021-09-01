const loadData = () => {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    const url = `https://openlibrary.org/search.json?q=${searchValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data))
}

const displayData = data => {
    console.log(data);
}
loadData();