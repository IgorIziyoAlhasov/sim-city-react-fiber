import { Suspense, useEffect, useState } from 'react';
import { SkySphere } from '../models';
import { useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Raycaster, Vector2 } from 'three';
import { GameCamera, Loader, Structures, Platform, ToolBar } from '../components';
import { City as CityModel,BuildingModel } from '../data-models';

const GameScene = ({ activeTool }) => {
    const { gl, camera } = useThree();
    const sceneRef = useRef();

    // const cityDataModel = CityModel({ size: 10 });
    const [cityDataModel, setCityDataModel] = useState(CityModel({ size: 15 }))
    const [cityData, setCityData] = useState(cityDataModel.flattenedData());
    const [structuresState, setSetstructuresState] = useState(cityDataModel.getTilesWitStructures());

    //mouse interaction pointers
    const raycaster = new Raycaster()
    const mouse = new Vector2();
    let selectedObject = undefined;

    const handleMouseDown = (e) => {
        if (e.buttons & 1 && !e.ctrlKey) {
            mouse.x = (e.clientX / gl.domElement.clientWidth) * 2 - 1;
            mouse.y = -(e.clientY / gl.domElement.clientHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            let intersections = raycaster.intersectObjects(sceneRef.current.children);

            if (intersections.length > 0) {
                if (selectedObject) selectedObject.material.emissive?.setHex(0);
                selectedObject = intersections[0].object;

                if (selectedObject.userData.isInteractive) {
                    if (activeTool.actionKey === "selection") {
                        selectedObject.material?.emissive?.setHex(0x555555);
                    }



                    if (activeTool.actionKey !== "selection") {
                        const platfromData = cityDataModel.data;

                        if (activeTool.actionType === "terrain") {
                            platfromData[selectedObject.userData.x][selectedObject.userData.y][activeTool.actionType] = activeTool.actionKey;
                            cityDataModel.updateCityData(platfromData);
                            setCityData(cityDataModel.flattenedData());
                        } else if (activeTool.actionType === "structure") {
                            let curTileData = platfromData[selectedObject.userData.x][selectedObject.userData.y];

                            if (activeTool.actionKey === "buldoze") {
                                selectedObject.material?.emissive?.setHex(0x57afbc);
                                platfromData[selectedObject.userData.x][selectedObject.userData.y][activeTool.actionType] = null;
                            } else {
                                if (!curTileData[activeTool.actionType]) {
                                    curTileData[activeTool.actionType] = new BuildingModel(activeTool.actionKey,1);
                                } else {
                                    console.log('The tile aready occupied!');
                                }
                            }

                            cityDataModel.updateCityData(platfromData);
                            setSetstructuresState(cityDataModel.getTilesWitStructures());
                        }

                    }

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

    // useEffect(() => {
    //     const gameIntervalTimer = setInterval(() => {
    //         forceCityUpdate();
    //     }, 1000);

    //     setTimeout(() => {
    //         clearInterval(gameIntervalTimer);
    //     }, 2000);

    //     return () => {
    //         if (gameIntervalTimer) clearInterval(gameIntervalTimer);
    //     }
    // }, [])



    useEffect(() => {
        const canvas = gl.domElement;
        //setup event listeners here
        canvas.addEventListener('pointerdown', handleMouseDown);
        return () => {
            //dispose here
            canvas.removeEventListener('pointerdown', handleMouseDown);
        }

    }, [gl, activeTool, cityData]);//cityDataModel, structuresState


    return (
        <group ref={sceneRef}>
            <Suspense fallback={<Loader />}>
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
            </Suspense>
            {/* <ToolBar setActiveTool={setActiveTool} /> */}
        </group>
    )
}

export default GameScene