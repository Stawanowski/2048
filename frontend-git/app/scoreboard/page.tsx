"use client"
import { useEffect, useState } from "react";
import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai'

const Scoreboard  = () => {

    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        axios
          .get(`${process.env.NEXT_PUBLIC_BACKEND_ADRESS}/fetchScores`)
          .then((res) => {
            setLeaderboard(res.data);
          })
          .catch((e) => {
            setLeaderboard([]);
          });
      });
    
  return (
    <div
    className="scoreboardContainer"
    style={{ flex: 1 }}
  >
    <div className='scoreboardMenu'>
      <h1>Scoreboard</h1>
      <Link href={'/'}>
      <AiOutlineCloseCircle size={40} className='closeIcon' />
      </Link>
    </div>
    {leaderboard.map((i: any) => (
      <div key={`${Math.random() * 10 }${i.name}`} className="leaderboardCard">
        <h4>Name: {i.name}</h4>
        <h4>Score: {i.score}</h4>
      </div>
    ))}

  </div>
  )
}

export default Scoreboard 