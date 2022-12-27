import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

const initMoves = [null, null, null, null, null, null, null, null, null];
const initClicks = 0;
const initWinner = null;

function App() {

  const [moves, setMoves] = useState(initMoves);
  const [clicks, setClicks] = useState(initClicks);
  const [winner, setWinner] = useState(initWinner);

  const handler = (index) => () => {
    if (winner || moves[index]) return;
    const value = clicks % 2 ? 'o' : 'x';
    setClicks(clicks + 1);
    const newMoves = [...moves];
    newMoves[index] = value;
    setMoves(newMoves);
  }



  const detectWinner = () => {
    testRow(0)
      || testRow(3)
      || testRow(6)
      || testColumn(0)
      || testColumn(1)
      || testColumn(2)
      || test(0, 4, 8)
      || test(2, 4, 6);
  }

  useEffect(detectWinner, [moves]);

  const testRow = (start) => {
    return test(start, start + 1, start + 2);
  }

  const testColumn = (start) => {
    return test(start, start + 3, start + 6);
  }

  const test = (start, middle, end) => {
    const result = moves[start] === moves[middle] && moves[start] === moves[end];
    if (result) {
      setWinner(moves[start]);
    }
    return result;
  }

  const reset = () => {
    setClicks(initClicks);
    setWinner(initWinner);
    setMoves(initMoves);
  }

  const rowStyles = { display: 'flex', width: '100vw', height: '33vh' };
  const itemStyle = { flex: 1, textAlign: 'center', display: 'flex', justifyContent: 'center' };
  const itemStyle2 = { ...itemStyle, backgroundColor: '#f0f0ed' };
  const textStyle = { fontSize: '33vh', position: 'relative', top: '-8vh' }

  return (
    <div className="App">
      {winner && <>
        <div style={{...rowStyles, marginTop: '5vh'}}>
          <div style={itemStyle}><span style={textStyle}>Winner!</span></div>
        </div>
        <div style={rowStyles}>
          <div style={itemStyle}><span style={textStyle}>{winner}</span></div>
        </div>
        <div style={rowStyles}>
          <div style={itemStyle}>
            <button style={{height: '3em'}} onClick={reset}>New Game</button>
          </div>
        </div></>}
      {!winner && <>
        <div style={rowStyles}>
          <div style={itemStyle} onClick={handler(0)}>
            <span style={textStyle}>{moves[0]}</span>
          </div>
          <div style={itemStyle2} onClick={handler(1)}>
            <span style={textStyle}>{moves[1]}</span>
          </div>
          <div style={itemStyle} onClick={handler(2)}>
            <span style={textStyle}>{moves[2]}</span>
          </div>
        </div>
        <div style={rowStyles}>
          <div style={itemStyle2} onClick={handler(3)}>
            <span style={textStyle}>{moves[3]}</span>
          </div>
          <div style={itemStyle} onClick={handler(4)}>
            <span style={textStyle}>{moves[4]}</span>
          </div>
          <div style={itemStyle2} onClick={handler(5)}>
            <span style={textStyle}>{moves[5]}</span>
          </div>
        </div>
        <div style={rowStyles}>
          <div style={itemStyle} onClick={handler(6)}>
            <span style={textStyle}>{moves[6]}</span>
          </div>
          <div style={itemStyle2} onClick={handler(7)}>
            <span style={textStyle}>{moves[7]}</span>
          </div>
          <div style={itemStyle} onClick={handler(8)}>
            <span style={textStyle}>{moves[8]}</span>
          </div>
        </div>
      </>}
    </div>
  );
}

export default App;
