import React, { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
    function transition(mode, replace = false) {
      setMode(mode)
    }
    function back(history) {
      setHistory(!history)
    }
   return { mode, transition, back }; 
}

