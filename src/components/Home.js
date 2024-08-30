import { useEffect, useState } from "react";
import Movie from "./Movie";
import './Home.css';
import { BiMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [data, setData] = useState([]);
    const [genre, setGenre] = useState('all');
    const [language, setLanguage] = useState('all');
    const [sort, setSort] = useState('voting');
    const [isUserInfoVisible, setUserInfoVisible] = useState(false);
    const [isCompanyInfoVisible, setCompanyInfoVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
        if(!localStorage.getItem('login')) navigate('/login')
    }, [language,sort,genre]);

    const fetchData = async ()=>{
        try {
            const response = await fetch('https://hoblist.com/api/movieList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "category": "movies",
                    "language": language,
                    "genre": genre,
                    "sort": sort
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            let movies = (result.result).slice().sort((a, b) => b.voting - a.voting);
            if (sort === 'voting') {
                movies = (result.result).slice().sort((a, b) => b.voting - a.voting);
            } else{
                movies = (result.result).slice().sort((a, b) => a.title.localeCompare(b.title));
            }
            setData(movies);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    const handleLanguageChange = (e) =>{
        setLanguage(e.target.value);
    }

    const handleGenreChange = (e) =>{
        setGenre(e.target.value);
    }
    const handleSortChange = (e) =>{
        setSort(e.target.value);
    }

    const handleLogout = () =>{
        localStorage.removeItem('login');
        navigate('/login')
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    const handleCompanyInfoClick = () => {
        setCompanyInfoVisible(true);
    };
    const handleUserInfoClick = () => {
        setUserInfoVisible(true);
    };
    const handleClose = () => {
        setCompanyInfoVisible(false);
        setUserInfoVisible(false);
    };

    const useinfo = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <div className="Home">
            <div className="Nav">
                <BiMenu 
                    style={{width: '50px', height: '50px', marginRight: '80px'}} 
                    onClick={toggleMenu}
                />
                {isOpen && (
                    <div className="menu-options">
                        <a onClick={handleUserInfoClick} className="menu-option">Profile</a>
                        <a onClick={handleCompanyInfoClick} className="menu-option">Company Info</a>
                        <a onClick={handleLogout} className="menu-option">Logout</a>
                    </div>
                )}
            </div>
            <div className="movies">
                <div className="menu">
                    <label>Language</label>
                    <select 
                        value={language}
                        onChange={handleLanguageChange}
                    >
                        <option value="all">All</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Telugu">Telugu</option>
                        <option value="Tamil">Tamil</option>
                        <option value="English">English</option>
                        <option value="Malayalam">Malayalam</option>
                        <option value="kannada">Kannada</option>
                    </select>
                    <label>Genre</label>
                    <select 
                        value={genre}
                        onChange={handleGenreChange}
                    >
                        <option value="all">All</option>
                        <option value="romance">Romance</option>
                        <option value="drama">Drama</option>
                        <option value="scifi">Scifi</option>
                        <option value="action">Action</option>
                        <option value="comedy">Comedy</option>
                        <option value="horror">Horror</option>
                        <option value="thriller">Thriller</option>
                    </select>
                    <label>Sort By</label>
                    <select 
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="voting">Voting</option>
                        <option value="title">Title</option>
                    </select>
                </div>
                {data && data.map((item) => (
                    <Movie key={item.id} props={item} />
                ))}
            </div>
        </div>
        <div className={`app-container `}>
            
            {isCompanyInfoVisible && (
                <div className="full-page-overlay">
                    <button className="close-button" onClick={handleClose}>Close</button>
                    <div className="company-info">
                        <p className="text1">Company Info</p>
                        <p className="text"><label>Company :</label>&nbsp;Geeksynergy Technologies Pvt Ltd</p>
                        <p className="text"><label>Address :</label>&nbsp;Sanjayanagar, Bengaluru-56</p>
                        <p className="text"><label>Phone :</label>&nbsp;XXXXXXXXX09</p>
                        <p className="text"><label>Email :</label>&nbsp;XXXXXX@gmail.com
                        </p>
                    </div>
                </div>
            )}
            {isUserInfoVisible && (
                <div className="full-page-overlay">
                    <button className="close-button" onClick={handleClose}>Close</button>
                    <div className="company-info">
                    
                    <p className="text1">User Info</p>
                        <p className="text"><label>Name :</label>&nbsp;{useinfo.Name}</p>
                        <p className="text"><label>Email :</label>&nbsp;{useinfo.Email}</p>
                        <p className="text"><label>Phone :</label>&nbsp;{useinfo.phoneNumber}</p>
                        <p className="text"><label>Profession :</label>&nbsp;{useinfo.Profession}</p>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default Home;
