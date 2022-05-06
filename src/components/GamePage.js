import React, { useEffect } from "react";
import "./2048.css";
import { Games } from "../requests";
import { useNavigate } from "react-router-dom";

const GamePage = () => {
    let win = false;
    let firstWin = true;
    let firstLose = true;
    let score = 0;
    let moves = 0;
    let board;
    let navigate = useNavigate();
    const handleSubmit = event => {
        const { currentTarget } = event
        event.preventDefault()
        const formData = new FormData(currentTarget)
        const params = {
            highscore: parseInt(document.querySelector("#score").innerHTML),
            moves: parseInt(document.querySelector("#moves").innerHTML),
        }
        Games.create(params).then(game => {
            console.log("hello")
            if(game?.id){
                console.log("game made")
                navigate("/index")
            } else {
                navigate("/Sign_In")
            }
        })


    }
    
    useEffect(()=> {
    let btn = document.querySelector('.start-game')
    let saveGame = document.querySelector(".save-game-button")
    let warning = document.querySelector('.warning')
    btn.addEventListener('click', event => { 
        setGame();
        btn.remove()
        saveGame.classList.remove('disable-post')
        warning.classList.remove('disable-post')
    })
    let rows = 4;
    let columns = 4;
    
    

    function setGame() {
        board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                let tile = document.createElement("div");
                tile.id = r.toString() + "-" + c.toString();
                let num = board[r][c];
                updateTile(tile, num);
                document.getElementById("board").append(tile);
            }
        }
        setTwo();
        setTwo();

    }

    function updateTile(tile, num) {
        tile.innerText = "";
        tile.classList.value = "";
        tile.classList.add("tile");
        if (num > 0) {
            tile.innerText = num.toString();
            if (num <= 4096) {
                tile.classList.add("x"+num.toString());
            } else {
                tile.classList.add("x8192");
            }                
        }
    }

    document.addEventListener('keyup', (e) => {
        if (e.code == "ArrowLeft") {
            slideLeft();
            setTwo();
            checkWin();
            checkLose()
            moves +=1;
        }
        else if (e.code == "ArrowRight") {
            slideRight();
            setTwo();
            checkWin();
            checkLose()
            moves +=1;
        }
        else if (e.code == "ArrowUp") {
            slideUp();
            setTwo();
            checkWin();
            checkLose()
            moves +=1;
        }
        else if (e.code == "ArrowDown") {
            slideDown();
            setTwo();
            checkWin();
            checkLose()
            moves +=1;
        }
        console.log(score, moves)
        document.getElementById("score").innerText = score;
        document.getElementById("moves").innerText = moves;
    })

    function filterZero(row){
        return row.filter(num => num != 0);
    }

    function slide(row) {
        row = filterZero(row);
        for (let i = 0; i < row.length-1; i++){
            if (row[i] == row[i+1]) {
                row[i] *= 2;
                row[i+1] = 0;
                score += row[i];
            }
        }
        row = filterZero(row);
        while (row.length < columns) {
            row.push(0);
        }
        return row;
    }

    function slideLeft() {
        for (let r = 0; r < rows; r++) {
            let row = board[r];
            row = slide(row);
            board[r] = row;
            for (let c = 0; c < columns; c++){
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                let num = board[r][c];
                updateTile(tile, num);
            }
        }
    }

    function slideRight() {
        for (let r = 0; r < rows; r++) {
            let row = board[r];         
            row.reverse();              
            row = slide(row)            
            board[r] = row.reverse();  
            for (let c = 0; c < columns; c++){
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                let num = board[r][c];
                updateTile(tile, num);
            }
        }
    }

    function slideUp() {
        for (let c = 0; c < columns; c++) {
            let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
            row = slide(row);
            for (let r = 0; r < rows; r++){
                board[r][c] = row[r];
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                let num = board[r][c];
                updateTile(tile, num);
            }
        }
    }

    function slideDown() {
        for (let c = 0; c < columns; c++) {
            let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
            row.reverse();
            row = slide(row);
            row.reverse();
            for (let r = 0; r < rows; r++){
                board[r][c] = row[r];
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                let num = board[r][c];
                updateTile(tile, num);
            }
        }
    }

    function setTwo() {
        if (!hasEmptyTile()) {
            return;
        }
        let found = false;
        while (!found) {
            let r = Math.floor(Math.random() * rows);
            let c = Math.floor(Math.random() * columns);
            if (board[r][c] == 0) {
                board[r][c] = 2;
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                tile.innerText = "2";
                tile.classList.add("x2");
                found = true;
            }
        }
    }

    function hasEmptyTile() {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                if (board[r][c] == 0) {
                    return true;
                    
                }
            }
        }
        return false;
        
    }

    function checkWin() {
        if (firstWin == true) {
            for (let i = 0; i < rows; i++) {
               for (let j = 0; j < columns; j++) {
                   if (board[i][j] === 2048 ) {
                           let winMsg = document.querySelector(".disabled");
                           console.log(winMsg);
                           winMsg.classList.remove("disabled");
                           firstWin = false;
                   } 
               }
                
            }
        } else {
            return null;
        }
    }

    function checkLose() {
        if (firstLose == true) {
            let zeroCount = 0;
            for (let i = 0; i < rows; i++) {
               for (let j = 0; j < columns; j++) {
                   if (board[i][j] === 0 ) {
                        //    firstWin = false;
                   } else {
                        zeroCount += 1
                   }
               }
               if (zeroCount === 16) {
                let r1c1 = document.getElementById("0-0")
                let r1c2 = document.getElementById("0-1")
                let r1c3 = document.getElementById("0-2")
                let r1c4 = document.getElementById("0-3")
                let r4c1 = document.getElementById("3-0")
                let r4c2 = document.getElementById("3-1")
                let r4c3 = document.getElementById("3-2")
                let r4c4 = document.getElementById("3-3")
                r1c1.innerHTML = "-"
                r1c2.innerHTML = "-"
                r1c3.innerHTML = "-"
                r1c4.innerHTML = "-"
                r4c1.innerHTML = "-"
                r4c2.innerHTML = "-"
                r4c3.innerHTML = "-"
                r4c4.innerHTML = "-"
                let G = document.getElementById("1-0")
                let A = document.getElementById("1-1")
                let M = document.getElementById("1-2")
                let E = document.getElementById("1-3")
                let O = document.getElementById("2-0")
                let V = document.getElementById("2-1")
                let E2 = document.getElementById("2-2")
                let R = document.getElementById("2-3")
                G.innerHTML = "G"
                A.innerHTML = "A"
                M.innerHTML = "M"
                E.innerHTML = "E"
                O.innerHTML = "O"
                V.innerHTML = "V"
                E2.innerHTML = "E"
                R.innerHTML = "R"
                board = null;
               }
            }
            console.log(zeroCount);
        } else {
            return null;
        }
    }

}, [board])



    return (
        <div className="body-container">
        <h1>2048</h1>
        <hr/>
        <h2>Score: <span id="score">0</span></h2>
        <h2>Moves: <span id="moves">0</span></h2>
        <div id="board">
        </div>
        <button className="start-game">Start Game</button>
        <h2 className="disabled">You Reached Tile 2048! <br /> Can You Go Higher? </h2>
        <div>
        <form onSubmit={handleSubmit}>
            <input className='submit-btn disable-post save-game-button ' type="submit" value="Post Game" />
        <p className="warning disable-post">*Warning - Posting The Game Will Lose your Progress <br /> Must Be Signed In To Post</p>
        </form>
        </div>
        </div>
    )
}

export default GamePage;