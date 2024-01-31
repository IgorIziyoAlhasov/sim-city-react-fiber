import React, { useEffect, useState } from 'react'
import '../styles/tool-bar.scss';
import { STRUCTURE_TYPES, TERRAIN_TYPES } from '../data-models';
import { Html } from '@react-three/drei';
import { to } from '@react-spring/three';


const ToolBar = ({ setActiveTool }) => {

  const [curentTool, setCurentTool] = useState({actionKey:"selection"});
  //structure types list
  const toolsList = ["buldoze"].concat(Object.keys(STRUCTURE_TYPES));
  //terrain types list
  const brushesList = Object.keys(TERRAIN_TYPES);

  /**
  * Event handler for `mousemove` event
  * @param {MouseEvent} event Mouse event arguments
  */
  const handleToobarButtonClick = (event) => {
    event.preventDefault();
    const tool = {
      actionType: event.target.dataset.actionType,
      actionKey: event.target.dataset.actionKey
    }
    console.log(tool);
    setCurentTool(tool);
  }
  //avivit - cal
  //galit - leumi

  useEffect(() => {
    setActiveTool(curentTool);

    return () => {
      // setActiveTool("grass");
    }
  }, [curentTool])


  return (
    <div className='game-tool-bar full-h'>
      <section className='buttons-panel'>
        {toolsList.map((tool, index) => (
          <div key={index}
            className={`tool-bar-button ${curentTool.actionKey === tool ? 'selected-tool' : ''}`}
            onClick={handleToobarButtonClick}
            data-action-key={tool}
            data-action-type={"structure"}>
            {tool.toUpperCase()}
          </div>
        ))}
      </section>
      <section className='buttons-panel'>
        {brushesList.map((tool, index) => (
          <div key={index}
            className={`tool-bar-button ${curentTool.actionKey === tool ? 'selected-tool' : ''}`}
            onClick={handleToobarButtonClick}
            data-action-key={tool}
            data-action-type={"terrain"}>
            {tool.toUpperCase()}
          </div>
        ))}
      </section>
      <section className='buttons-panel'>
        <div key={"selection"}
          className={`tool-bar-button ${curentTool.actionKey === "selection" ? 'selected-tool' : ''}`}
          onClick={handleToobarButtonClick}
          data-action-key={"selection"}
          data-action-type={null}>
          {"selection".toUpperCase()}
        </div>
      </section>
    </div>
  )
}

export default ToolBar;