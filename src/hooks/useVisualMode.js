import { useState } from "react";

export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);
  function transition(mode, replace = false) {
    // if replace is true setHistory with prev and new mode, if false stay the same
    setHistory(prev => replace ? [...prev.slice(0, -1), mode] : [...prev, mode])
  }
  function back() {
    // if history contains atleast 2 modes, setHistory to previous mode
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0, -1)])
    }
  }
  return { mode: history[history.length - 1], transition, back };
}

