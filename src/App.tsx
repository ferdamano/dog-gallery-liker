import React from 'react'
import Grid from './Grid'
import Summary from './Summary'

const styles: any = {
  display: 'flex',
  flexDirection: 'row',
  height: 'calc(100% - 4rem)',
  margin: '2rem auto',
  width: '100%'
}

const App = () => (
  <main className="App">
    <div style={styles}>
      <Summary />
      <Grid />
    </div>
  </main>
)

export default App
