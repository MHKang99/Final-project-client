const GameDetails = (props) => {
    return (
        <div>
            <h2>{props.id}</h2>
            <p>
                Highscore {props.highscore}
                {props.moves}
                <br />
                By {props.author?.first_name} {props.author?.last_name}
            </p>
            <p>
                <small>
                    {props.created_at ? props.created_at.toLocaleString() : null}
                </small>
            </p>
        </div>
    )
}

export default GameDetails;