import {Button, Box} from '@mui/material';
import React, { useState, useEffect } from 'react';
import "./ThirdInitFinish.css";
import axios from 'axios';

const ThirdInitFinish = (props) => {

  const [rotation, setRotation] = useState(0);      
  
  return (
    <div className="content">
      <svg width="400" height="400">
        <circle
          fill="none"
          stroke="#48601d"
          stroke-width="20"
          cx="200"
          cy="200"
          r="190"
          strokeLinecap="round"
          transform={`rotate(${rotation} 200 200)`}
          className="circle"
        />
        <polyline
          fill="none"
          stroke="#68E534"
          points="88,214 173,284 304,138"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tick"
        />
      </svg>
    </div>
  );
}

export default ThirdInitFinish;