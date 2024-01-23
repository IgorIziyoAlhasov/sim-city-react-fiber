import React from 'react';
import { Building } from '../models';


const Structures = ({ data }) => {
  return (
    <group>
      {data.map((tile, index) =>
        <Building key={index} x={tile.x} y={tile.y} type={tile.structure} level={tile.level} />
      )}
    </group>
  )
}

export default Structures