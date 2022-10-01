import { shortFilmDuration } from "../constants/constants";

const Filter = (searchText, searchParams, data) => {
  
    function filterParams(movie){
      return JSON.stringify(movie.nameRU).toLowerCase().includes(searchText.toLowerCase())
    }
  
    function filterShortfilm(movie){
      return movie.duration <= shortFilmDuration;
    }
  
    if (searchParams) {
      if (searchText){
        return data.filter(filterShortfilm).filter(filterParams);
      } else {
        return data.filter(filterShortfilm)
      }
    } else {
      return data.filter(filterParams);
    }
  }
  
  export default Filter;