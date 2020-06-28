import React, { useState } from 'react';
import MainApp from './componentss/MainApp'
import './App.css';
// import Game from './components/Game.js'
// import Rules from './components/Rules.js'
// import colors from './helpers/colors.js'
// import styled from 'styled-components'
// import Header from './components/Header.js'

// const StyledApp = styled.div`
//   display: flex;
//   justify-content: space-between;
//   .game {
//     width: 60%;
//     padding: 0 5%;
//   } 
//   .text {
//     width: 40%;
//     padding: 0 5%;
    
//   }
  


// `
function App() {
    
  return (
    <>
    {/* <Header />
    <StyledApp>
      <div className = "game">
        <Game 
          freq = {freq} 
          setFreq = {setFreq} 
          gameState = {gameState} 
          setGameState = {setGameState} 
          isRunning = {isRunning} 
          setIsRunning = {setIsRunning}
          colorScheme = {colorScheme}
          setColorScheme = {setColorScheme}
          stamping = {stamping}
          setStamping = {setStamping}/>
      </div>
      <div className = "text">
        <Rules/>
      </div>
      
    </StyledApp> */}
    <MainApp />
    </>
  );
}


export default App;