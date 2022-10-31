export default function fetchImages(searchValue, page = 1) {
 
    const URL = 'https://pixabay.com/api/';
    const KEY = '29802477-d1d969a8ee1732cb5f7983921';
    const FILTER = 'photo&orientation=horizontal&per_page=12';
    return fetch (
    `${URL}?q=${searchValue}&page=${page}&key=${KEY}&image_type=${FILTER}`
    ).then(response => {
        return response.json();
  })
}
