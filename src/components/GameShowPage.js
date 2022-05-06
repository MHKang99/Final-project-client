import { useState, useEffect } from 'react'
import { Games } from '../requests';
import GameDetails from "./GameDetails";
import { Link, useParams } from 'react-router-dom';

export default function GameShowPage(props){
    const [game, setGame] = useState({});
    const { id } = useParams();
    useEffect(() => {
        Games.show(id)
        .then((fetchedAPIGame) => {
            setGame(fetchedAPIGame)
        })
    }, [])

    const { highscore, moves, created_at, author } = game;
    return (
        <div>
            <GameDetails 
            highscore={highscore}
            moves={moves}
            created_at={created_at}
            author={author}
            />
        </div>
    )
}