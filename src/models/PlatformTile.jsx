import { Box } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import { LineSegments } from 'three'

const PlatformTile = ({ x, y, tileType }) => {
    const platformTileRef = useRef()
    const tileTypeName = Object.keys(tileType)[0];
    
    useEffect(() => {
        const tileMesh = platformTileRef.current
        tileMesh.userData = {type: tileTypeName,x,y};
    
      return () => {
        tileMesh.userData = {}
      }
    }, [])
    

    return (
        <Box ref={platformTileRef} args={[1, 1, 1]} position={[x, -0.5, y]} rotation={[0, 0, 0]}>
            <meshLambertMaterial attach="material" color={tileType[tileTypeName]} />
        </Box>
    )
}

export default PlatformTile