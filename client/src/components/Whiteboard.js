import React from 'react'
// import {SketchField, Tools} from 'react-sketch-whiteboard';
import {OTWhiteBoard} from 'opentok-react-whiteboard'
import{OTSession} from 'opentok-react'
function Whiteboard() {
  return (
    <div>
      <OTSession
  apiKey="47531641"
  sessionId={localStorage.getItem("sessionId")}
  token={localStorage.getItem("token")}
  
>
  <OTWhiteBoard />
</OTSession>
    </div>
  )
}

export default Whiteboard