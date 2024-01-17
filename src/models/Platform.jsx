import { Box } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react'

const Platform = ({...props}) => {
    const platformRef = useRef();

    const { gl, viewport } = useThree();

    useFrame(()=>{
        if (platformRef.current) {
            // platformRef.current.rotation.x += 0.01;
            // platformRef.current.rotation.y += 0.01;
        }
    })
    return (
        <Box ref={platformRef} args={[5,1,5]} position={[0,0,0]} rotation={[0,0,0]}>
            <meshBasicMaterial attach={"material"} color={0x00ff00}/>
        </Box>
    )
}

export default Platform