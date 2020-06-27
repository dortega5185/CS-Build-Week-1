import React from 'react'

export default function Rules() {
  return (
    <div>
      <h3>Setting up Game of Life Simulation:</h3>
      <p>
        1. Choose from either one of the presets, a randomly generated grid, or
        individually populate each cell
      </p>
      <p>
        2. set the speed of each generation per second (defaults to 0 to process
        generations quickly)
      </p>
      <p>3. Click the "RUN" button to start the simulation</p>
      <p>4. Click the "stop" button to stop the simulation</p>
      <h3>Rules for the Game of Life:</h3>
      <p>
        1. As the simulation is running, you cannot populate any cells. Only
        when the simulation has stopped
      </p>
      <p>
        2. Each living cell will die either due to solitude (having one or less
        living neighbors) or overpopulation (having four or more living
        neighbors). Otherwise, it will stay alive.
      </p>
      <p>
        3. A dead cell can become populated IF it has only THREE living
        neighbors.
      </p>
    </div>
  )
}
