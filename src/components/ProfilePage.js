import { useState, useEffect } from 'react'
import { User, Games } from '../requests';
import UserDetails from "./UserDetails";
import { useParams } from 'react-router-dom';
import moment from 'moment'


export default function ProfilePage(props){
    const [user, setUser] = useState({});
    const [game, setGame] = useState([]);
    const [currentUser, setCurrentUser] = useState({})
    const { id } = useParams();
    useEffect(() => {
        console.log("hello")
        

        User.show(id)
        .then((fetchedUser) => {
            setUser(fetchedUser)
        })

        User.current()
        .then((fetchedCurrentUser) => {
            setCurrentUser(fetchedCurrentUser)
        })

    },[game])

    useEffect(()=> {
        Games.user_index(id)
        .then((fetchedAPIGame) => {
            setGame(fetchedAPIGame)
        })
    }, [game])

    function deleteGame(gid) {
        Games.destroy(gid).then(console.log("game destroyed"))
    }

    const { uid, first_name, last_name , img} = user;
    return (
        <div>
            <UserDetails 
            id={uid}
            first_name={first_name}
            last_name={last_name}
            img = {img}
            />
            <div className='highscore-container'>
            <h1 className='leaderboard-title'>Your Games</h1>
            { game?.map((e, i) => {
                return (
                    <div key={i} className='highscore'>
                    <h3 >
                        {i+1} - highscore: {e.highscore}
                        <br />
                        moves: {e.moves}
                            
                            <br />
                            Played At: {moment(e.created_at).fromNow()}
                            <br />
                            {
                                currentUser?.id===user.id ? (
                                    <button className={e.id} onClick={() => deleteGame(e.id)}>Delete</button>

                                ) : (null)
                            }
                    </h3>
                    </div>
                )
            })}
        </div>
        </div>
    )
}