import { useState, useEffect } from 'react';
import { Games } from '../requests';
import { Link } from 'react-router-dom';
import { User } from "../requests";
import moment from 'moment'


export default function GameIndexPage() {
    const [games, setGames] = useState([])
    const [users, setUsers] = useState([])
    useEffect(() => {
        Games.index()
        .then((gamesData) => {
            setGames(gamesData)
            console.log(gamesData)
        })

        User.index()
        .then((usersData) => {
            setUsers(usersData)
            console.log('hello')
        })
    }, [])


    return(
        <div>
        <div className='highscore-container'>
            <h1 className='leaderboard-title'>Highscore LeaderBoard</h1>
            { games.map((e, i) => {
                return (
                    <div key={i} className='highscore'>
                    <h3 >
                        {i+1} - <Link to={`/index/${e.id}`}>
                            highscore: {e.highscore}
                            <br />
                            By: {e.author?.first_name} {e.author?.last_name}
                            <br />
                            Created: {moment(e.created_at).fromNow()}
                    </Link> </h3>
                    </div>
                )
            })}
        </div>
        <hr />
        <div>
            <div className='highscore-container'>
            <h1 className='leaderboard-title'>User LeaderBoard</h1>
            { users.map((e, i) => {
                return (
                    <div key={i} className='highscore'>
                    <h3 >
                        {i+1} - <Link to={`/profile_page/${e.id}`}>
                            First Name: {e.first_name}
                            <br />
                            average highscore: {e.av_highscore}
                            <br />
                            average moves per game {e.av_moves_per_game}
                    </Link> </h3>
                    </div>
                )
            })}
            </div>
        </div>
        </div>
    )
}