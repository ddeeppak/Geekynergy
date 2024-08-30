import { BiCaretDown, BiCaretUp } from 'react-icons/bi';
import './Movie.css';

const Movie = (props) => {
    props = props.props;
    return (
        <>
        <div className="movie">
            <div className="part1">
                <div className="vote">
                    <BiCaretUp style={{width:'100%',height:'30%',marginTop:'0px'}} color='rgb(50,50,50)'/>
                    <p style={{width:'100%',height:'20%',fontSize:'50px',margin:'0',padding:'0',textAlign:'center',fontWeight:'400'}}>{props.voting}</p>
                    <BiCaretDown style={{width:'100%',height:'30%'}} color='rgb(50,50,50)'/>
                    <p style={{width:'100%',height:'25%',fontSize:'25px',margin:'0',padding:'0',textAlign:'center',fontWeight:'300'}}>Vote</p>
                </div>
                <div className="poster">
                    <img src={props.poster} width={'100%'} height={'100%'} style={{borderRadius:'10px',boxShadow:'0px 0px 40px rgb(100,100,100)'}} alt={props.title} />
                </div>

                <div className="info">
            
                    <p className='text1'>{props.title}</p>
                    <p className='text2'><label>Genre :</label>&nbsp;{props.genre}</p>
                    <p className='text'><label>Director :</label>&nbsp;{props.director}</p>
                    <p className='text4'><label>Starring :</label>&nbsp;{props.stars[0]}</p>
                    <p className='text3'>{props.runTime}&nbsp;min&nbsp;|&nbsp;{props.language}&nbsp;|&nbsp;{new Date(props.releasedDate).toLocaleString('en-US', {
                                                                                                                                                                year: 'numeric',
                                                                                                                                                                month: 'long',
                                                                                                                                                                day: '2-digit'
                                                                                                                                                            })}</p>
                    <p className='text3'>{props.pageViews}&nbsp;views&nbsp;|&nbsp;Voted by&nbsp;{props.totalVoted}</p>
                    
                </div>
            </div>
            <div className="part2">
                <button>Watch Trailer</button>
            </div>
        </div>
        </>
    );
}

export default Movie;
