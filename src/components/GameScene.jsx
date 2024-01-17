import { Suspense, useEffect, useState } from 'react'
import { SkySphere, Platform } from '../models'
import { useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Vector3 } from 'three'
import { GameCamera, Loader } from '../components'


const GameScene = () => {
    const { gl, camera } = useThree();


    useEffect(() => {
        const canvas = gl.domElement;
        //setup event listeners here
        canvas.addEventListener('pointerdown', GameCamera.handlePointerMove, false);
        // canvas.addEventListener('pointerup', GameCamera.handlePointerUp, false);
        canvas.addEventListener('pointermove', GameCamera.handlePointerMove, false);
        canvas.addEventListener('wheel', GameCamera.handlePointerWheel, false);
        canvas.addEventListener('contextmenu', GameCamera.handleContextMenu,false)
        

        GameCamera.setUpCamera();
        return () => {
            //dispose here
            canvas.removeEventListener('pointerdown', GameCamera.handlePointerMove);
            // canvas.removeEventListener('pointerup', GameCamera.handlePointerUp);
            canvas.removeEventListener('pointermove', GameCamera.handlePointerMove);
            canvas.removeEventListener('wheel', GameCamera.handlePointerWheel);
            canvas.removeEventListener('contextmenu', GameCamera.handleContextMenu);
        }
    }, [gl]);


    return (
        <group>
            <Suspense fallback={<Loader />}>
                <directionalLight position={[1, 1, 1]} intensity={2} />
                <ambientLight intensity={0.5} />
                <hemisphereLight
                    skyColor="#b1e1ff"
                    groundColor="#000000"
                    intensity={1}
                />

                <SkySphere />
                <Platform />

                <GameCamera />
            </Suspense>
        </group>
    )
}

export default GameScene