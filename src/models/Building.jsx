import { Box } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react'
import { BuildingModel, STRUCTURE_TYPES } from '../data-models';



// In the future will change this to pick an actual 3d model of a building to stick on to the map
const BuildingMeshModel = ({ height, type, x, y }) => {
    let customScale = 1;
    const buildingRef = useRef();
    const [curMesh, setCurMesh] = useState(buildingRef.current)

    useEffect(() => {
        const buildingMesh = buildingRef.current;
        buildingMesh.userData = { type, x, y, isInteractive: true };
        setCurMesh(buildingMesh);

        return () => {
            buildingMesh.userData = {}
            buildingMesh.geometry.dispose();
            buildingMesh.material.dispose();
        }
    }, [])

    if (type === 'road') {
        customScale = 0.2;
    }
    return (
        <Box ref={buildingRef} args={[1, height, 1]} scale={[1, customScale, 1]} position={[x, customScale / 2, y]} rotation={[0, 0, 0]}>
            <meshLambertMaterial attach={"material"} color={STRUCTURE_TYPES[type]} />
        </Box>
    )
}

const renderBuilding = {
    'rezidential': (x, y) => {
        return <BuildingMeshModel height={1} type={"rezidential"} x={x} y={y} />
    },

    // 'rezidential': (
    //     <BuildingMeshModel height={1} type={"rezidential"} />
    // ),
    'commercial': (x, y) => {
        return <BuildingMeshModel height={1} type={"commercial"} x={x} y={y} />
    },
    'industrial': (x, y) => {
        return <BuildingMeshModel height={1} type={"industrial"} x={x} y={y} />
    },
    'road': (x, y) => {
        return <BuildingMeshModel height={1} type={"road"} x={x} y={y} />
    },
    'buldoze': (x, y) => {
        return <BuildingMeshModel height={1} type={"buldoze"} x={x} y={y} />
    },
}

const Building = ({ x, y, buildingModel, level, isInteractive, ...props }) => {

    return renderBuilding[buildingModel?.type](x, y) || <BuildingMeshModel height={1} type={"road"} x={x} y={y} />;

    // return (
    //     <Box ref={buildingRef} args={[1, 1, 1]} scale={[1, level, 1]} position={[x, level / 2, y]} rotation={[0, 0, 0]}>
    //         <meshLambertMaterial attach={"material"} color={STRUCTURE_TYPES[type]} />
    //     </Box>
    // )
}

export default Building;