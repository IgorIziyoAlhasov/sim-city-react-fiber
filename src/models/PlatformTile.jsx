import { Box } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import { TERRAIN_TYPES } from '../data-models';

const PlatformTile = ({ x, y, tileType, isInteractive }) => {
  const platformTileRef = useRef(null);
  const [tileColor, setTileColor] = useState(null)


  useEffect(() => {
    const tileMesh = platformTileRef.current
    tileMesh.userData = { type: tileType, x, y, isInteractive };

    return () => {
      tileMesh.userData = {}
    }
  }, [])

  useEffect(() => {
    setTileColor(TERRAIN_TYPES[tileType])

    return () => {
      setTileColor('grass');
    }
  }, [tileType])



  return (
    <Box ref={platformTileRef} args={[1, 1, 1]} position={[x, -0.5, y]} rotation={[0, 0, 0]}>
      <meshLambertMaterial attach="material" color={tileColor} />
    </Box>
  )
}

export default PlatformTile