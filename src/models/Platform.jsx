import { Box } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import PlatformTile from './PlatformTile';

const Platform = ({ data, ...props }) => {
    const platformRef = useRef();

    return (
        <group ref={platformRef}>
            {data.map((tile, index) =>
                <PlatformTile key={index} x={tile.x} y={tile.y} tileType={tile.terrain} />
            )}
        </group>
    )
}

export default Platform;