import { useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Vector3 } from 'three';


// -- Constants --
const DEG2RAD = Math.PI / 180.0;
const RIGHT_MOUSE_BUTTON = 2;

// Camera constraints
const CAMERA_SIZE = 5;
const MIN_CAMERA_RADIUS = 1;
const MAX_CAMERA_RADIUS = 15;
const MIN_CAMERA_ELEVATION = 0;
const MAX_CAMERA_ELEVATION = 80;

// Camera sensitivity
const AZIMUTH_SENSITIVITY = 0.2;
const ELEVATION_SENSITIVITY = 0.2;
const ZOOM_SENSITIVITY = 0.002;
const PAN_SENSITIVITY = -0.01;

const Y_AXIS = new Vector3(0, 1, 0);

const GameCamera = () => {
    const { gl, camera } = useThree();
    const cameraRef = useRef()

    const aspect = gl.domElement.clientWidth / gl.domElement.clientHeight;

    const cameraSetUp = {
        cameraRadius: 10,
        cameraAzimuth: 0,
        cameraElevation: 15,
        cameraOrigin: new Vector3(0, 0, 0)
    }

    let prevMousePostion = { x: 0, y: 0 };
    let pointerIsDown = false;

    /**
   * Event handler for `mousemove` event
   * @param {MouseEvent} event Mouse event arguments
   */
    GameCamera.handlePointerUp = (event) => {
        pointerIsDown = false;
    }

    /**
   * Event handler for `mousemove` event
   * @param {MouseEvent} event Mouse event arguments
   */
    GameCamera.handlePointerDown = (event) => {
        pointerIsDown = true;
    }

    /**
   * Event handler for `mousemove` event
   * @param {MouseEvent} event Mouse event arguments
   */
    GameCamera.handlePointerMove = (event) => {
        if (event.buttons & RIGHT_MOUSE_BUTTON && !event.ctrlKey) {
            cameraSetUp.cameraAzimuth += -(event.movementX * AZIMUTH_SENSITIVITY);
            cameraSetUp.cameraElevation += (event.movementY * ELEVATION_SENSITIVITY);
            cameraSetUp.cameraElevation = Math.min(MAX_CAMERA_ELEVATION, Math.max(MIN_CAMERA_ELEVATION, cameraSetUp.cameraElevation));
        }

        if (event.buttons & RIGHT_MOUSE_BUTTON && event.ctrlKey) {
            const forward = new Vector3(0, 0, 1).applyAxisAngle(Y_AXIS, cameraSetUp.cameraAzimuth * DEG2RAD);
            const left = new Vector3(1, 0, 0).applyAxisAngle(Y_AXIS, cameraSetUp.cameraAzimuth * DEG2RAD);
            cameraSetUp.cameraOrigin.add(forward.multiplyScalar(PAN_SENSITIVITY * event.movementY));
            cameraSetUp.cameraOrigin.add(left.multiplyScalar(PAN_SENSITIVITY * event.movementX));
        }


        updateCamera();

        prevMousePostion = {
            x: event.clientX,
            y: event.clientY
        };
    }

    /**
   * Event handler for `mousemove` event
   * @param {MouseEvent} event Mouse event arguments
   */
    GameCamera.handlePointerWheel = (event) => {
        cameraSetUp.cameraRadius *= 1 + (event.deltaY * ZOOM_SENSITIVITY);
        cameraSetUp.cameraRadius = Math.min(MAX_CAMERA_RADIUS, Math.max(MIN_CAMERA_RADIUS, cameraSetUp.cameraRadius));
        updateCamera();
    }



    const updateCamera = () => {
        // let { cameraRadius, cameraAzimuth, cameraElevation } = cameraSetUp;
        camera.position.x = cameraSetUp.cameraRadius *
            Math.sin(cameraSetUp.cameraAzimuth * DEG2RAD) *
            Math.cos(cameraSetUp.cameraElevation * DEG2RAD);

        camera.position.y = cameraSetUp.cameraRadius * Math.sin(cameraSetUp.cameraElevation * DEG2RAD);

        camera.position.z = cameraSetUp.cameraRadius *
            Math.cos(cameraSetUp.cameraAzimuth * DEG2RAD) *
            Math.cos(cameraSetUp.cameraElevation * DEG2RAD);

        camera.position.add(cameraSetUp.cameraOrigin);
        camera.lookAt(cameraSetUp.cameraOrigin);
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();
    }

    GameCamera.setUpCamera = () => {
        camera.position.set(0, 5, 5);
        camera.lookAt(0, 0, 0);
    }

    /**
   * Event handler for `mousemove` event
   * @param {MouseEvent} event Mouse event arguments
   */
    GameCamera.handleContextMenu = (event) => {
        event.preventDefault();
    }

    return (
        <orthographicCamera ref={cameraRef}
            left={(CAMERA_SIZE * aspect) / -2}
            right={(CAMERA_SIZE * aspect) / 2}
            top={CAMERA_SIZE / 2}
            bottom={CAMERA_SIZE / -2}
            near={0.1} far={1000} />
    )
}

export default GameCamera