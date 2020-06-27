import React, { useState, useCallback, useRef, useEffect } from "react";
import produce from "immer";
import Buttons from './Buttons';
import DisplayGrid from './DisplayGrid';
import GameDescription from './GameDescription';

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const generateEmptyGrid = (numRows, numCols) => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const MainApp = () => {
  const [running, setRunning] = useState(false);
  const [isCell, setIsCell] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [{ numRows, numCols }, setGridValues] = useState({
    numRows: 30,
    numCols: 30,
  });
  const [speed, setSpeed] = useState(100);
  const [color, setColor] = useState("black");
  let [count, setCount] = useState(0);
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid(numRows, numCols);
  });

  useEffect(() => {
      const width = window.screen.width;
      if (width <= 414) {
         setIsPhone(!isPhone);
      }
   },[])

  useEffect(() => {
    clearCells();
  }, [numCols, numRows]);

  // useRef is always gonna be up to date when we use it in a callback
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    //  g is an array with live cells
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                // if this condition is true, we are saving the value from the index in
                // neighbors variable.
                neighbors += g[newI][newK];
              }
            });
            // if cell has less than 2 neighbors OR more than 3 neighbors
            // then the cell dies.
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;

              //  if cell is dead but it has 3 live neighbors
              // then cell becomes alive
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    setCount(count++);
    setTimeout(runSimulation, speed);
  }, [numRows, numCols, speed, count]);


//   const generate = () => {
//      let g = generateEmptyGrid(numRows, numCols);
//      g[2][2] = 1;
//      g[2][3] = 1;
//      g[2][4] = 1;
//      g[3][1] = 1;
//      g[3][2] = 1;
//      g[3][3] = 1;
//      return g;

//   }

//   console.log('here ', generate());

  function clearCells() {
    setGrid(generateEmptyGrid(numRows, numCols));
    setCount(0);
  }

  const changeGrid = () => {
    setIsCell(!isCell);
    if (!isCell) {
      randomCells();
    }
  };

   //  this function is going to fill the grid with random alive and dead cells
  function randomCells() {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.6 ? 1 : 0))
      );
    }
    setGrid(rows);
  }

  const changeGridSize = (value) => {
    const toNum = Number(value.target.value);
    const newValues = {
      numCols: toNum,
      numRows: toNum,
    };
    setGridValues(newValues);
    randomCells();
  };

  const changeSpeed = (value) => {
    const toNum = Number(value.target.value);
    setSpeed(toNum);
  };
  const toggleStartStop = (e) => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };

  const getColor = (e) => {
    setColor(e.target.value);
  };

  return (
    <>
      <div className="Main-container">
        
         <Buttons toggleStartStop={toggleStartStop} running={running}
            randomCells={randomCells}
            clearCells={clearCells}
            isCell={isCell}
            getColor={getColor}
            changeGridSize={changeGridSize}
            changeSpeed={changeSpeed}
            changeGrid={changeGrid}
            isPhone={isPhone}
         />
        
         <DisplayGrid 
            numCols={numCols}
            isCell={isCell}
            running={running}
            setGrid={setGrid}
            color={color}
            grid={grid}
            isPhone={isPhone}
         />

        <GameDescription count={count} />
      </div>
    </>
  );
};

export default MainApp;
