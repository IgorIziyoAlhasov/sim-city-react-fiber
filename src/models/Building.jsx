import { Box } from '@react-three/drei';
import React, { useEffect, useRef } from 'react'

const Building = ({ x, y, type, level, ...props }) => {
    const buildingRef = useRef();
    // const structureType = type;

    // console.log(structureType);
    const colors = [
        null,
        0xaaaaaa,
        0x666666,
        0xbcfa1d,
        0xccbbff
    ]

    useEffect(() => {
        const buildingMesh = buildingRef.current;
        buildingMesh.userData = { type, x, y };


        return () => {
            buildingMesh.userData = {}
        }
    }, [])

    return (
        <Box ref={buildingRef} args={[1, 1, 1]} scale={[1, level, 1]} position={[x, level / 2, y]} rotation={[0, 0, 0]}>
            <meshLambertMaterial attach={"material"} color={colors[level]} />
        </Box>
    )
}

export default Building