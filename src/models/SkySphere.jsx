import { useGLTF } from "@react-three/drei";
import skyScene from './sky.glb';
import { useRef } from "react";

const SkySphere = ({...props }) => {
  const skyRef = useRef();
  const skySphere = useGLTF(skyScene);
  
  return (
    <mesh ref={skyRef}>
      <primitive object={skySphere.scene} />
    </mesh>
  )
}

export default SkySphere