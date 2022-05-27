import React,{ Component } from "react";
import "./Hangman.css";
import WordBank from "./WordBank";
import Stickman1 from "./Images/Stickman1.png";
import Stickman2 from "./Images/Stickman2.png";
import Stickman3 from "./Images/Stickman3.png";
import Stickman4 from "./Images/Stickman4.png";
import Stickman5 from "./Images/Stickman5.png";
import Stickman6 from "./Images/Stickman6.png";
import Stickman7 from "./Images/Stickman7.png";

class Hangman extends Component{
    constructor(props){
        super(props);
        this.state={
            attempt: 0,
            guessed: new Set(),
            clue: WordBank().pop(),
            answer: WordBank()[0],
        };
        this.checkLetter = this.checkLetter.bind(this);
        this.refresh = this.refresh.bind(this);
    }
    generateKeyboardRow1(){
        return "QWERTYUIOP".split("").map((letter)=>(
                <button key={letter} value={letter} onClick={this.checkLetter} disabled={this.state.guessed.has(letter)}>
                    {letter}
                </button>
        ));
    }
    generateKeyboardRow2(){
        return "ASDFGHJKL".split("").map((letter)=>(
                <button key={letter} value={letter} onClick={this.checkLetter} disabled={this.state.guessed.has(letter)}>
                    {letter}
                </button>
        ));
    }
    generateKeyboardRow3(){
        return "ZXCVBNM".split("").map((letter)=>(
                <button key={letter} value={letter} onClick={this.checkLetter} disabled={this.state.guessed.has(letter)}>
                    {letter}
                </button>
        ));
    }
    generateWholeKeybaord(){
        let keyRow1 = this.generateKeyboardRow1();
        let keyRow2 = this.generateKeyboardRow2();
        let keyRow3 = this.generateKeyboardRow3();
        return(
            <div className="Keyboard">                
                <p className="keyboard-btns">{keyRow1}</p>
                <p className="keyboard-btns">{keyRow2}</p>
                <p className="keyboard-btns">{keyRow3}</p>
            </div>
        )

    }

    checkLetter(e){
        var letter;
        let letter1 = e.target.value;
        let letter2 = e.key;  
        console.log("OnscreenKB: ",letter1);
        if (e.keyCode>= 65 && e.keyCode <= 90){      
            letter2 = letter2.toUpperCase();
            console.log("AcutalKB: ",letter2)
        }
        if (letter1 == null){
            letter = letter2;
        }
        else if(letter2 == null){
            letter = letter1;
        }
        let dupeKBPress = this.state.guessed.has(letter2);
        if(!dupeKBPress){
            this.setState((st)=> ({
                guessed: st.guessed.add(letter),
                attempt: st.attempt+(st.answer.includes(letter) ? 0: 1),
            }));
        }
        console.log(this.state.attempt);
        console.log(this.state.guessed);
        return this.state.attempt
    }

    guessedWord(){
        return this.state.answer
            .split("")
            .map((letter)=> (this.state.guessed.has(letter)? letter: "_ "));
    }

    printStickman(){
        switch(this.state.attempt){
            default:
                return(<div><img src={Stickman1} alt=""></img></div>)
            case 1:
                return(<div><img src={Stickman2} alt=""></img></div>)
            case 2:
                return(<div><img src={Stickman3} alt=""></img></div>)
            case 3:
                return(<div><img src={Stickman4} alt=""></img></div>)
            case 4:
                return(<div><img src={Stickman5} alt=""></img></div>)
            case 5:
                return(<div><img src={Stickman6} alt=""></img></div>)
            case 6:
                return(<div><img src={Stickman7} alt=""></img></div>)
        }
    }

    refresh(){
        let newWordArr = WordBank()
        this.setState({
            attempt: 0,
            guessed: new Set(),
            clue: newWordArr[1],
            answer: newWordArr[0],
        });
    }

    refreshPage(){
        window.location.reload(false);
    }

    render(){
        const loser = this.state.attempt === 6;
        const winner = this.guessedWord().join("") === this.state.answer
        console.log("CHECK: ",this.guessedWord().join(""));
        let keyRow = this.generateWholeKeybaord();
        if (loser) keyRow = <div className="gameState"><h2 id="loseScreen">YOU LOSE</h2><button id="reset" onClick={this.refreshPage}>RETRY</button></div>
        if (winner) keyRow = <div className="gameState"><h2 id="winScreen">YOU WIN</h2><button id="reset" onClick={this.refreshPage}>RETRY</button></div>
        console.log("Winner: ",winner);
        console.log("GameOver: ",loser);
        console.log("Answer: ",this.state.answer);
        console.log("Clue: ",this.state.clue);
        console.log("Guess: ",this.state.guessed);
        document.addEventListener("keydown",this.checkLetter,false);
        return(
            <div className="Hangman">
                <h2 id="title">Hangman</h2>
                {this.printStickman()}
                <p id="attemptCounter">Attempt: {this.state.attempt}/6</p>
                <p className="guessedWord">{!loser ? this.guessedWord(): this.state.answer}</p>
                <p className="clue">{this.state.clue}</p>
                <div className="gameState">{keyRow}</div>
                <footer><p>Enjoy</p></footer>
            </div>
        )
    }



}

export default Hangman;