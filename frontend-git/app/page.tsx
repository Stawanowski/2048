"use client";

import {
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  generateBlock,
} from "@/lib/touchDetection";

import { initialRandomizer } from "@/lib/randomize";

import { useEffect, useState } from "react";
import { Board } from "@/lib/types";
import { swipe } from "@/lib/moves";
import axios from "axios";
import Link from "next/link";

const init = initialRandomizer();
let board: Board = init;
let winningScore = 2048;
let name = "Guest";

export default function Home() {

  const [key, setKey] = useState(0);
  const [reached, setReached] = useState(false);
  const [nameInputFocused, setNameInputFocused] = useState(false);
  const [reachedAndClosed, setReachedAndClosed] = useState(false)

  const touchEnd = () => {

    let tempBoard = handleTouchEnd(board);

    if (tempBoard[0][0] == 111) {
      return;
    }

    board = tempBoard;
    setKey(Math.random());

    if (!reached && board.some((subArray) => subArray.includes(winningScore))) {
      setReached(true);
    }

    setKey(Math.random());
  };

  const handleKeyPress = (event: any) => {

    if (nameInputFocused) {
      return;
    }

    const update: Board = swipe(board, event.key);
    
    if (update == undefined || update[0][0] == 1222) {
      return;
    }
    
    board = generateBlock(update);

    setKey(Math.random());
    
    if (!reached && board.some((subArray) => subArray.includes(winningScore))) {
      setReached(true);
    }
    
    setKey(Math.random());
    return;
  };

  const handleScoreSaving = async (name: string) => {

    let highestScore = 0;

    for (let i = 0; i < board.length; i++) {
 
      for (let j = 0; j < board[i].length; j++) {

        if (board[i][j] > highestScore) {
          highestScore = board[i][j];
        }
 
      }
    }

    let k: any = process.env.NEXT_PUBLIC_BACKEND_API_KEY;
    const data = `?key=${encodeURIComponent(k)}&name=${encodeURIComponent(name)}&score=${encodeURIComponent(highestScore)}`;
    const adress: any = `${process.env.NEXT_PUBLIC_BACKEND_ADRESS}/addScore${data}`;

    try {
      await axios.post(adress, { key: k });
      return
    } catch (err) {
      console.error(`Posting score failed`);
      return
    }
  };


  useEffect(() => {

    window.addEventListener("keydown", handleKeyPress);

    return () => {
    
      window.removeEventListener("keydown", handleKeyPress);
    };
  });


  return (
    <main
      key={key}
      onLoad={() => (board = init)}
      className="mainContainer"
    >
      <h1 className="title">2048 <br /> <span className="lowerTitle"> by Michał Szadkwoski</span></h1>
        {reached && !reachedAndClosed && (
          <div className="victoryContainer" key={9}>
            <h1>You win!</h1>
            <input
              onSelect={() => setNameInputFocused(true)}
              onBlur={() => setNameInputFocused(false)}
              type="text"
              placeholder="Your name"
              className="scoreName"
              onChange={(e) => (name = e.target.value)}
            />
            <button
              className="saveScoreButton"
              onClick={() => handleScoreSaving(name)}
            >
              Save score
            </button>
            <button onClick={() => {
              setReachedAndClosed(true)
            }}>
              Continue
            </button>
          </div>
        )}

      <nav className=" nav">
      <div className="navL">
          <button
            onClick={() => {
              board = initialRandomizer();
              setKey(Math.random());
              setReached(false);
              setReachedAndClosed(false)
            }}
            className="newGame__button"
          >
            New Game
          </button>
          <Link
            href={'/scoreboard'}
            className="newGame__button"
          >
            Scoreboard
          </Link>
        </div>
        
        <div className="navR">
          <label>
            Select winning score:
            
            <select
              id="score"
              name="score"
              defaultValue={"2048"}
              onChange={(e) => {
                winningScore = parseInt(e.target.value);
              }}
            >
            
              <option value="64">64</option>
              <option value="1024">1024</option>
              <option value="2048">2048</option>
              <option value="4096">4096</option>
              <option value="8192">8192</option>
            
            </select>
          </label>
        </div>
      </nav>
      <div className="bodyContainer">
        <div
          className="boardContainer"
          style={{ flex: 1, alignItems: "center" }}
        >
          <div
            id="board"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={touchEnd}
            className="board"
          >
            <>
              {board.map((row) => (

                <div key={Math.random() * 10} className="row">
                  
                  {row.map((i) => (
                  
                    <>
                      
                      {i == 0 && (
                        
                        <div
                          key={Math.random() * 4}
                          className="block"
                          style={{ backgroundColor: "white" }}
                        ></div>
                      
                      )}
                      
                      {i == 2 && (
                        
                        <div
                          key={Math.random() * 4}
                          className="block"
                          style={{ backgroundColor: "#EEE4DA" }}
                        >
                          2
                        </div>
                      
                      )}
                      
                      {i == 4 && (
                        <div
                          key={Math.random() * 4}
                          className="block"
                          style={{ backgroundColor: "#EDE0C8" }}
                        >
                          4
                        </div>
                      
                      )}
                      {i == 8 && (
                      
                        <div
                          key={Math.random() * 4}
                          className="block"
                          style={{ backgroundColor: "#F2B179" }}
                        >
                          8
                        </div>
                      
                      )}
                      
                      {i == 16 && (
                      
                        <div
                          key={Math.random() * 4}
                          className="block"
                          style={{ backgroundColor: "#F59563" }}
                        >
                          16
                        </div>
                      
                      )}
                      
                      {i == 32 && (
                      
                        <div
                          key={Math.random() * 4}
                          className="block"
                          style={{ backgroundColor: "#F67C5F" }}
                        >
                          32
                        </div>
                      
                      )}
                      
                      {i == 64 && (
                        
                        <div
                          key={Math.random() * 4}
                          className="block"
                          style={{ backgroundColor: "#F65E3B" }}
                        >
                          64
                        </div>
                      
                      )}
                      
                      {i == 128 && (
                        
                        <div
                          key={Math.random() * 4}
                          className="block"
                          style={{ backgroundColor: "#EDCF72" }}
                        >
                          128
                        </div>
                      
                      )}
                      
                      {i == 256 && (
                      
                        <div
                          key={Math.random() * 4}
                          className="block"
                          style={{ backgroundColor: "#EDCC61" }}
                        >
                          256
                        </div>
                      
                      )}
                      
                      {i == 512 && (
                      
                        <div
                          key={Math.random() * 4}
                          className="block"
                          style={{ backgroundColor: "#EDC850" }}
                        >
                          512
                        </div>
                      
                      )}
                      
                      {i == 1024 && (
                      
                        <div
                          key={Math.random() * 4}
                          className="block"
                          style={{ backgroundColor: "#EDC53F" }}
                        >
                          1024
                        </div>
                      
                      )}
                      
                      {i == 2048 && (
                      
                        <div
                          key={Math.random() * 4}
                          className="block"
                          style={{ backgroundColor: "#FFD700" }}
                        >
                          2048
                        </div>
                      
                      )}
                      
                      {i == 4096 && (
                      
                        <div
                          key={Math.random() * 4}
                          className="block"
                          style={{ backgroundColor: "#f59563" }}
                        >
                          4096
                        </div>
                      
                      )}
                      
                      {i == 8192 && (
                      
                        <div
                          key={Math.random() * 4}
                          className="block"
                          style={{ backgroundColor: "#f67c5f" }}
                        >
                          8192
                        </div>
                      
                      )}
                      
                      {i == 16384 && (
                      
                        <div
                          key={Math.random() * 4}
                          className="block"
                          style={{ backgroundColor: "#f65e3b" }}
                        >
                          16 384
                        </div>
                      
                      )}
                    
                    </>
                  
                  ))}
                
                </div>
              
              ))}
            
            </>
          
          </div>
        
        </div>
        
        

      </div>

      <footer className="footer">
        <h4>Michał Szadkowski</h4>
      </footer>
    
    </main>
  );
}
