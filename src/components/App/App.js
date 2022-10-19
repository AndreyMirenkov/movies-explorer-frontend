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
import {mobile, pad, laptop, quatityNewCardMobile, quatityNewCardPad, quatityNewCardLaptop} from '../../constants/constants';


function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [isNavigationOpen, setNavigationPopup] = useState(false)
    const [myMoviesOnPage, setMyMoviesOnPage] = useState(false);
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
    const [successfulFormSubmit, setSuccessfulFormSubmit] = useState(true);
    const [moviesOnPage, setMoviesOnPage] = useState(false);
    const [disabledInput, setDisabledInput] = useState(false);
    const history = useHistory();

    const [index , setIndex] = useState (0)

    const [visibleData , setVisibleData] = useState ([])

    let PAGE_SIZE = 0
    let quantityNewCard = 0

    if (window.innerWidth < pad){
        PAGE_SIZE = 5;
        quantityNewCard = quatityNewCardMobile;
    }
    if ((window.innerWidth < laptop) && (window.innerWidth >= pad)){
        PAGE_SIZE = 8;
        quantityNewCard = quatityNewCardPad;
    }
    if (window.innerWidth >= laptop){
        PAGE_SIZE = 12;
        quantityNewCard = quatityNewCardLaptop;
    }
    function checkedPermission(){
            if ((window.innerWidth < laptop) && (window.innerWidth >= pad)){
                PAGE_SIZE = 8;
                quantityNewCard = quatityNewCardPad;
                setPermission(pad)
            }
            if (window.innerWidth >= laptop){
                PAGE_SIZE = 12;
                quantityNewCard = quatityNewCardLaptop;
                setPermission(laptop);
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
        if (localStorage.getItem('allMovies')){
            const data = JSON.parse(localStorage.getItem('allMovies'))
            setMoviesData(data);
        } else {
        getMovies()
            .then(res => {
                setMoviesData(res)
                localStorage.setItem('allMovies', JSON.stringify(res))
            })
        }
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
            if (data.length){
                setMoviesOnPage(true);
            } else {
                setMoviesOnPage(false);
            }
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
            saveMovies.map((movie) => {
                if (movie.owner === currentUser._id){
                    newArray.push(movie);
                }
        }) 
        setMyMovies(newArray);
        if(localStorage.getItem('filteredMyMovies')){
            const data = JSON.parse(localStorage.getItem('filteredMyMovies'))
            setMyFilterMovies(data);
            setMyMoviesOnPage(true);
        } else {
            setMyFilterMovies(newArray)
            if (newArray.length){
                setMyMoviesOnPage(true);
            } else {
                setMyMoviesOnPage(false);
            }
        }
        }
    }

    const handleRegister = (name, email, password) => {
        setDisabledInput(true);
        return MainApi.register(name, email, password)
        .then(() => {
            setLoggedIn(true);
        }).catch((res) => {
            if (res === 409){
                setPopupText('Этот email уже используется.')
                setPopupOpen(true);
                setSuccessfulFormSubmit(false);
            } else {
                console.log(res)
            }
        }).finally(() => {
            setDisabledInput(false);
        })
    }
    
    const handleLogin = (email, password) => {
        setDisabledInput(true);
        return MainApi.autorize(email, password)
        .then(() => {
                setLoggedIn(true);
        }).catch(res =>{
          if (res === 401){
            setPopupText('Неправильные почта или пароль')
            setPopupOpen(true);
            setSuccessfulFormSubmit(false);
          } else {  
            console.log(res)
          }
        }).finally(() => {
            setDisabledInput(false);
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
        setDisabledInput(true);
        return MainApi.updateProfile(name, email)
            .then((res => {
                setCurrentUser(res.data);
                setPopupText('Данные успешно сохранены');
                setPopupOpen(true);
                setSuccessfulFormSubmit(true);
            })).catch((res) =>{
                if (res === 409){
                    setPopupText('Этот email уже используется.');
                    setPopupOpen(true);
                    setSuccessfulFormSubmit(false);
                } else {
                    console.log(res)
                }
        }).finally(() => {
            setDisabledInput(false);
        })
    }
    
    const handleSearchMovies = (searchText, searchParams) => { 
        setMoviesLoading(true);
        setVisibleButton(false);
        setNotFoundMovies(false);
        setInfoSearchText('')
        setDisabledInput(true);
        if (moviesData) {
          const filteredMovies = Filter(searchText, searchParams, moviesData);
            setMoviesOnPage(true);
        if (filteredMovies.length > PAGE_SIZE){
            setVisibleButton(true);
        }

          if (filteredMovies.length === 0) {
            setTimeout(() => {
                setMoviesLoading(false);
                setNotFoundMovies(true);
                setInfoSearchText('Ничего не найдено');
                setFilterMovies(filteredMovies)
                setDisabledInput(false);
              },250)
          } else {
            setTimeout(() => {
                setMoviesLoading(false);
                setNotFoundMovies(false);
                setIndex(PAGE_SIZE);
                setQuantityFilteredMovies(filteredMovies.length)
                setFilterMovies(filteredMovies);
                setDisabledInput(false);
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
                setDisabledInput(false);
              },250)
        }
    }

    const handleSearchMyMovies = (searchText, searchParams) => {
        setMoviesLoading(true);
        setNotFoundMovies(false);
        setInfoSearchText('')
        setDisabledInput(true);
        if (myMovies) {
            const filteredMovies = Filter(searchText, searchParams, myMovies);
  
            if (filteredMovies.length === 0) {
              setTimeout(() => {
                  setMoviesLoading(false);
                  setNotFoundMovies(true);
                  setInfoSearchText('Ничего не найдено');
                  setMyFilterMovies(filteredMovies);
                  setDisabledInput(false);
                },250)
            } else {
              setTimeout(() => {
                  setMoviesLoading(false);
                  setNotFoundMovies(false);
                  setMyFilterMovies(filteredMovies);
                  setDisabledInput(false);
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
                  setDisabledInput(false);
                },250)
          }
    }

    const noSearchText = () => {
        setNotFoundMovies(true);
        setInfoSearchText('Нужно ввести ключевое слово');
        setTimeout(() => {
            setNotFoundMovies(false);
            setInfoSearchText('');
        }, 2000)
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
                setMyMoviesOnPage(true);
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
                localStorage.removeItem('oldSearchTextMovies');
                localStorage.removeItem('oldSearchTextSaveMovies');
                localStorage.removeItem('allMovies');
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
                    popupText = {popupText}
                    successful = {successfulFormSubmit}/>
                <Switch>
                <Route exact path = '/signin'>
                    <Login handleLogin={handleLogin} disabledInput = {disabledInput}/>
                </Route>
                <Route exact path = '/signup'>
                    <Register  handleRegister={handleRegister} disabledInput = {disabledInput}/>
                </Route>
                <ProtectedRoute exact path = '/profile' loggedIn={loggedIn} >
                    <Header loggedIn = {loggedIn} onNavigation = {handleMenuClick}/>
                    <Profile onUpdateUser={handleUpdateUser} signOut = {signOut} disabledInput = {disabledInput}/>
                    <Navigation isOpen = {isNavigationOpen} onClose = {closeMenu}/>
                </ProtectedRoute>
                <ProtectedRoute exact path = '/movies' loggedIn={loggedIn} >
                    <Header loggedIn = {loggedIn} onNavigation = {handleMenuClick}/>
                    <Movies 
                    buttonSearch = {handleSearchMovies} 
                    moviesOnPage = {moviesOnPage}
                    buttonMoreClick={buttonMoreClick} 
                    movies = {visibleData} 
                    visibleButton = {visibleButton} 
                    preloader = {moviesLoading}
                    notFoundMovies = {notFoundMovies}
                    infoSearchText = {infoSearchText}
                    handleLikeClick = {handleLikeClick}
                    handleDeleteMovie = {handleDeleteMovie}
                    myMovies = {myMovies}
                    noSearchText = {noSearchText}
                    disabledInput = {disabledInput}
                    />
                    <Footer/>
                    <Navigation isOpen = {isNavigationOpen} onClose = {closeMenu} link = {'movies'}/>
                </ProtectedRoute>
                <ProtectedRoute exact path = '/saved-movies' loggedIn={loggedIn} >
                    <Header loggedIn = {loggedIn} onNavigation = {handleMenuClick}/>
                    <SavedMovies
                    buttonSearch = {handleSearchMyMovies} 
                    moviesOnPage = {myMoviesOnPage}
                    movies = {myFilterMovies} 
                    preloader = {moviesLoading}
                    notFoundMovies = {notFoundMovies}
                    infoSearchText = {infoSearchText}
                    handleDeleteMovie = {handleDeleteMovie}
                    myMovies = {myMovies}
                    noSearchText = {noSearchText}
                    disabledInput = {disabledInput}
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
