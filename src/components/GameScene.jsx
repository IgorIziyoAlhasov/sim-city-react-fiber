import { Suspense, useEffect, useState } from 'react'
import { Html } from '@react-three/drei'
import { SkySphere, Platform } from '../models'
import { useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Raycaster, Vector2 } from 'three'
import { GameCamera, Loader, Structures } from '../components'
import { City as CityModel } from '../data-models'


const GameScene = () => {
    const { gl, camera, scene } = useThree();
    const sceneRef = useRef()

    // const cityData = City({ size: 25 });
    const cityDataModel = CityModel({ size: 25 });
    const [cityData, setCityData] = useState(cityDataModel.flattenedData());
    const [structuresState, setSetstructuresState] = useState(cityDataModel.getTilesWitStructureType('building'))

    const raycaster = new Raycaster()
    const mouse = new Vector2();
    let selectedObject = undefined;
    let onObjectSelected = (selectedObject) => {
        console.log(selectedObject);

        let {x,y} = selectedObject.userData;
        const seletion = cityDataModel.data[x][y]
        console.log(seletion);
    };

    const handleMouseDown = (e) => {
        console.log(gl);
        if (e.buttons & 1 && !e.ctrlKey) {
            mouse.x = (e.clientX / gl.domElement.clientWidth) * 2 - 1;
            mouse.y = -(e.clientY / gl.domElement.clientHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            let intersections = raycaster.intersectObjects(sceneRef.current.children);

            if (intersections.length > 0) {
                if (selectedObject) selectedObject.material.emissive.setHex(0);
                selectedObject = intersections[0].object;
                selectedObject.material.emissive.setHex(0x555555);

                if (onObjectSelected) {
                    onObjectSelected(selectedObject);
                }
            }
        }

    }


    const forceCityUpdate = () => {
        const updated = cityDataModel.updateCity();
        // const updated = City.updateCity();
        // console.log(cityDataModel);

        setSetstructuresState(cityDataModel.getTilesWitStructureType('building'));
    }

    useEffect(() => {
        const gameIntervalTimer = setInterval(() => {
            forceCityUpdate();
        }, 1000);

        setTimeout(() => {
            clearInterval(gameIntervalTimer);
        }, 2000);

        return () => {
            if (gameIntervalTimer) clearInterval(gameIntervalTimer);
        }
    }, [])



    useEffect(() => {
        const canvas = gl.domElement;
        //setup event listeners here
        canvas.addEventListener('pointerdown', handleMouseDown);
        return () => {
            //dispose here
            canvas.removeEventListener('pointerdown', handleMouseDown);
        }

    }, [gl]);


    return (
        <group ref={sceneRef}>
            <Suspense fallback={<Loader />}>
                {/* <Html position={[-10,0,-10]}>
                    <div className="game-test-controls">
                        <button className='updater' onClick={forceCityUpdate}>Upgrade City</button>
                    </div>
                </Html> */}
                {/* lights */}
                <directionalLight position={[0, 1, 0]} intensity={0.3} />
                <directionalLight position={[1, 1, 0]} intensity={0.3} />
                <directionalLight position={[0, 1, 1]} intensity={0.3} />
                <ambientLight intensity={0.2} color={0xffffff} />
                <hemisphereLight
                    skyColor="#b1e1ff"
                    groundColor="#000000"
                    intensity={1}
                />
                {/* rendered components */}
                <SkySphere />
                <Platform data={cityData} />
                <Structures data={structuresState} />

                <GameCamera />
                {/* ref={cameraRef} */}
            </Suspense>
        </group>
    )
}

export default GameScene