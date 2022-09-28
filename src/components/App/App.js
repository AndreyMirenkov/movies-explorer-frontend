import React from 'react';
import { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import Notfound from '../NotFound/Notfound';
import Navigation from '../Navigation/Navigation';
import currentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as MainApi from '../../utils/MainApi';
import {getMovies} from '../../utils/MoviesApi';
import Filter from '../../utils/Filter';
import InfoTooltip from '../InfoTooltip/InfoTooltip';


function App() {

    const [name, setName] = useState('')
    const [loggedIn, setLoggedIn] = useState(false);
    const [isNavigationOpen, setNavigationPopup] = useState(false)
    const [currentUser, setCurrentUser] = useState({name: '', email: ''});
    const [moviesData, setMoviesData] = useState([]);
    const [filterMovies, setFilterMovies] = useState([]);
    const [saveMovies, setSaveMovies] = useState([])
    const [myMovies, setMyMovies] = useState([]);
    const [myFilterMovies, setMyFilterMovies] = useState([]);
    const [quantityFilteredMovies, setQuantityFilteredMovies] = useState('');
    const [moviesLoading, setMoviesLoading] = useState(false);
    const [notFoundMovies, setNotFoundMovies] = useState(false);
    const [visibleButton, setVisibleButton] = useState(false);
    const [infoSearchText, setInfoSearchText] = useState('')
    const [permission, setPermission] = useState('');
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupText, setPopupText] = useState('')
    const history = useHistory();

    const [index , setIndex] = useState (0)

    const [visibleData , setVisibleData] = useState ([])

    let PAGE_SIZE = 0
    let quantityNewCard = 0

    if (window.innerWidth < '768'){
        PAGE_SIZE = 5;
        quantityNewCard = 2;
    }
    if ((window.innerWidth < '1280') && (window.innerWidth >= '768')){
        PAGE_SIZE = 8;
        quantityNewCard = 2;
    }
    if (window.innerWidth > '1279'){
        PAGE_SIZE = 12;
        quantityNewCard = 3;
    }

    function checkedPermission(){
            if ((window.innerWidth < '1280') && (window.innerWidth >= '768')){
                PAGE_SIZE = 8;
                quantityNewCard = 2;
                setPermission('768')
            }
            if (window.innerWidth > '1279'){
                PAGE_SIZE = 12;
                quantityNewCard = 3;
                setPermission('1280');
            }
    }


    useEffect(() => {
        window.addEventListener('resize', checkedPermission);
        return () => {window.removeEventListener('resize', checkedPermission)};
      });
    
    useEffect(() => {
        MainApi.getProfile()
            .then(res => {
                setCurrentUser(res.data);
                setName(res.data.name);
            }).catch(res => console.log(res));
    }, [])

    useEffect(() => {
        MainApi.getMovies()
            .then(res => {
                setSaveMovies(res.data)
            }).catch(res => console.log(res));
    }, [])   

    
    useEffect(() => {
        if (loggedIn){
            history.push('/movies')
        }
    },[loggedIn])
    
    useEffect(() => {
        if (loggedIn){
        MainApi.getProfile()
            .then(res => {
                setCurrentUser(res.data);
                setName(res.data.name);
            }).catch(res => console.log(res));
        }
    }, [loggedIn])

    useEffect(() => {
        if (loggedIn){
            MainApi.getMovies()
                .then(res => {
                    setSaveMovies(res.data)
                }).catch(res => console.log(res));
            }
    }, [loggedIn])

    useEffect(() => {
            filterMyMovies()
    }, [saveMovies, currentUser])

    useEffect(()=>{
        handleTokenCheck()
    },[])
    
    useEffect(() => {
        getMovies()
            .then(res => {
                setMoviesData(res)
            })
    },[])

    useEffect(() => {
        const newArray = []; 
    
        for(let i= 0 ; i< filterMovies.length ; i++ ){
          if(i < index) 
              newArray.push(filterMovies[i])
        }
    
        setVisibleData(newArray);
        
    } , [filterMovies, index, moviesLoading])

    useEffect(() =>{
        if(localStorage.getItem('filteredMovies')){
            const data = JSON.parse(localStorage.getItem('filteredMovies'))
            setFilterMovies(data);
            setIndex(PAGE_SIZE);
            setQuantityFilteredMovies(data.length)
            if (data.length > PAGE_SIZE){
                setVisibleButton(true);
            }
        } else {
            setFilterMovies([])
            setVisibleButton(false);
        }
    },[loggedIn])

    useEffect(() => {
        if(index === 5 ){
            setIndex(PAGE_SIZE);
        }
        if(index === 8){
            setIndex(PAGE_SIZE);
        }

    },[permission])

    const filterMyMovies = () => {
        const newArray = []; 
        if (saveMovies && currentUser._id){
            saveMovies.map((movie, index) => {
                if (movie.owner === currentUser._id){
                    newArray.push(movie);
                }
        })
        setMyMovies(newArray);
        if(localStorage.getItem('filteredMyMovies')){
            const data = JSON.parse(localStorage.getItem('filteredMyMovies'))
            setMyFilterMovies(data);
        } else {
            setMyFilterMovies(newArray)
        }
        }
    }

    const handleRegister = (name, email, password) => {
        return MainApi.register(name, email, password)
        .then(() => {
            setLoggedIn(true);
        }).catch((res) => {
            if (res === 409){
                setPopupText('Этот email уже используется.')
                setPopupOpen(true);
            } else {
                console.log(res)
            }
        })
    }
    
    const handleLogin = (email, password) => {
        return MainApi.autorize(email, password)
        .then(() => {
                setLoggedIn(true);
        }).catch(res =>{
          if (res === 401){
            setPopupText('Неправильные почта или пароль')
            setPopupOpen(true);
          } else {  
            console.log(res)
          }
        })

    }
    
    const handleTokenCheck = () =>{
            MainApi.getToken()
            .then (res => {
                if (res){
                    setLoggedIn(true);
                }
            }).catch(res => console.log(res))
    }
    
    
    const handleUpdateUser = (name, email) => {
        return MainApi.updateProfile(name, email)
            .then((res => {
                setCurrentUser(res.data);
                setName(res.data.name);
            })).catch((res) =>{
                if (res === 409){
                    setPopupText('Этот email уже используется.')
                    setPopupOpen(true);
                } else {
                    console.log(res)
                }
        })
    }
    
    const handleSearchMovies = (searchText, searchParams) => { 
        setMoviesLoading(true);
        setVisibleButton(false);
        setNotFoundMovies(false);
        if (moviesData) {
          const filteredMovies = Filter(searchText, searchParams, moviesData);

        if (filteredMovies.length > PAGE_SIZE){
            setVisibleButton(true);
        }

          if (filteredMovies.length === 0) {
            setTimeout(() => {
                setMoviesLoading(false);
                setNotFoundMovies(true);
                setInfoSearchText('notfound');
                setFilterMovies(filteredMovies)
              },250)
          } else {
            setTimeout(() => {
                setMoviesLoading(false);
                setNotFoundMovies(false);
                setIndex(PAGE_SIZE);
                setQuantityFilteredMovies(filteredMovies.length)
                setFilterMovies(filteredMovies);
              },250)
          }
          localStorage.setItem(
                "filteredMovies",
                JSON.stringify((filteredMovies))
            );
        } else {
            setTimeout(() => {
                setMoviesLoading(false);
                setNotFoundMovies(true);
                setInfoSearchText('error');
              },250)
        }
    }

    const handleSearchMyMovies = (searchText, searchParams) => {
        setMoviesLoading(true);
        setNotFoundMovies(false);
        if (myMovies) {
            const filteredMovies = Filter(searchText, searchParams, myMovies);
  
            if (filteredMovies.length === 0) {
              setTimeout(() => {
                  setMoviesLoading(false);
                  setNotFoundMovies(true);
                  setInfoSearchText('notfound');
                  setMyFilterMovies(filteredMovies)
                },250)
            } else {
              setTimeout(() => {
                  setMoviesLoading(false);
                  setNotFoundMovies(false);
                  setMyFilterMovies(filteredMovies);
                },250)
            }
            localStorage.setItem(
                "filteredMyMovies",
                JSON.stringify((filteredMovies))
            );
          } else {
              setTimeout(() => {
                  setMoviesLoading(false);
                  setNotFoundMovies(true);
                  setInfoSearchText('error');
                },250)
          }
    }

    const handleLikeClick = (movie) => {
        const isLiked = myMovies.some(i => i.movieId === movie.id);
        if (!isLiked){
            handleAddMovie(movie)
        } else {
            const movieId = myMovies.find(i => i.movieId === movie.id );
            handleDeleteMovie(movieId);
        }
    }

    const handleAddMovie = (movie) => {
        return MainApi.createMovies(
                movie.country, 
                movie.director, 
                movie.duration, 
                movie.year, 
                movie.description, 
                movie.image.url,
                movie.trailerLink, 
                movie.image.formats.thumbnail.url, 
                movie.id, 
                movie.nameRU, 
                movie.nameEN
            ).then((newMovie) => {
                setMyMovies([newMovie.data, ...myMovies]);
                setMyFilterMovies([newMovie.data, ...myMovies]);
            }).catch((res) => console.log(res))
    }

    const handleDeleteMovie = (movie) => {
        return MainApi.deleteMovies(movie._id)
            .then((res) => {
                setMyMovies((state) => state.filter((c) => c._id !== movie._id));
                setMyFilterMovies((state) => state.filter((c) => c._id !== movie._id));
            }).catch((res) => console.log(res))
    }

    const signOut = () => {
            MainApi.clearcokkie()
            .then(() => {
                setLoggedIn(false);
                history.push('/');
                setCurrentUser('');
                localStorage.removeItem('searchTextMovies');
                localStorage.removeItem('filteredMovies');
                localStorage.removeItem('searchTextSaveMovies');
                localStorage.removeItem('checkboxMovies');
                localStorage.removeItem('checkboxSaveMovies');
                localStorage.removeItem('filteredMyMovies')
        }).catch((res) => console.log(res))
    }
    
    function handleMenuClick(){
        setNavigationPopup(true);
    }
    
    function closeMenu(){
        setNavigationPopup(false)
    }

    function buttonMoreClick(){
        setIndex(index+quantityNewCard);
        if ((quantityFilteredMovies-(index+quantityNewCard)) < 1){
            setVisibleButton(false);
        }
    }

    function closePopup() {
        setPopupOpen(false)
    }
    return (
        <currentUserContext.Provider value={currentUser}>
            <div className = 'App'>
            <InfoTooltip
                    isOpen= {popupOpen}
                    onClose= {closePopup}
                    popupText = {popupText}/>
                <Switch>
                <Route exact path = '/signin'>
                    <Login handleLogin={handleLogin} />
                </Route>
                <Route exact path = '/signup'>
                    <Register  handleRegister={handleRegister} />
                </Route>
                <ProtectedRoute exact path = '/profile' loggedIn={loggedIn} >
                    <Header loggedIn = {loggedIn} onNavigation = {handleMenuClick}/>
                    <Profile titleName = {name} onUpdateUser={handleUpdateUser} signOut = {signOut}/>
                    <Navigation isOpen = {isNavigationOpen} onClose = {closeMenu}/>
                </ProtectedRoute>
                <ProtectedRoute exact path = '/movies' loggedIn={loggedIn} >
                    <Header loggedIn = {loggedIn} onNavigation = {handleMenuClick}/>
                    <Movies 
                    buttonSearch = {handleSearchMovies} 
                    buttonMoreClick={buttonMoreClick} 
                    movies = {visibleData} 
                    visibleButton = {visibleButton} 
                    preloader = {moviesLoading}
                    notFoundMovies = {notFoundMovies}
                    infoSearchText = {infoSearchText}
                    handleLikeClick = {handleLikeClick}
                    handleDeleteMovie = {handleDeleteMovie}
                    myMovies = {myMovies}
                    />
                    <Footer/>
                    <Navigation isOpen = {isNavigationOpen} onClose = {closeMenu} link = {'movies'}/>
                </ProtectedRoute>
                <ProtectedRoute exact path = '/saved-movies' loggedIn={loggedIn} >
                    <Header loggedIn = {loggedIn} onNavigation = {handleMenuClick}/>
                    <SavedMovies
                    buttonSearch = {handleSearchMyMovies} 
                    movies = {myFilterMovies} 
                    preloader = {moviesLoading}
                    notFoundMovies = {notFoundMovies}
                    infoSearchText = {infoSearchText}
                    handleDeleteMovie = {handleDeleteMovie}
                    myMovies = {myMovies}
                    />
                    <Footer/>
                    <Navigation isOpen = {isNavigationOpen} onClose = {closeMenu} link = {'saved-movies'} />
                </ProtectedRoute>
                <Route exact path = '/'>
                    <Header loggedIn = {loggedIn} onNavigation = {handleMenuClick}/>
                    <Main/>
                    <Footer/>
                    <Navigation isOpen = {isNavigationOpen} onClose = {closeMenu} link = {'main'} />
                </Route>
                <Route path = '/*'>
                    <Notfound/>
                </Route>
                </Switch>
            </div>
        </currentUserContext.Provider>
  );
}

export default App;
