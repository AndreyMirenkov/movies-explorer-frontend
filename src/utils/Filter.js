const Filter = (searchText, searchParams, data) => {
  
    function filterParams(movie){
      return JSON.stringify(movie.nameRU).toLowerCase().includes(searchText.toLowerCase())
    }
  
    function filterShortfilm(movie){
      return movie.duration <= 40;
    }
  
    if (searchParams) {
      return data.filter(filterShortfilm).filter(filterParams);
    } else {
      return data.filter(filterParams);
    }
  }
  
  export default Filter;