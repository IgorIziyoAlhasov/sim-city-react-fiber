import './../styles/home.scss'
import { Canvas } from '@react-three/fiber'
import { GameScene, ToolBar } from '../components'
import { useState } from 'react'



const Home = ({ }) => {
  const [activeTool, setActiveTool] = useState(null);
  return (
    <section className='home-container full-w full-h'>
      <Canvas className='game-canvas full-w full-h'>
        <GameScene activeTool={activeTool} />
      </Canvas>
      <ToolBar setActiveTool={setActiveTool} />
    </section>
  )
}

export default Home