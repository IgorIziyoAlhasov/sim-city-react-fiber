import { Suspense, useEffect, useRef } from 'react'
import './../styles/home.scss'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { GameScene } from '../components'



const Home = () => {

  return (
    <section className='home-container full-w full-h'>
      <Canvas className='game-canvas full-w full-h'>
        <GameScene />
      </Canvas>
    </section>
  )
}

export default Home