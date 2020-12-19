import React, { useState, useEffect, useRef } from 'react';
import Light from './Light';
import ControlButton from './ControlButton';
import db from './../index.js';
var mqtt = require('mqtt')
var client  = mqtt.connect('ws://localhost:5001');

//Se suscribe al tópico color
client.on('connect', () =>{
  console.log("Llegue")
  client.subscribe('color_inverse');
})

//Recibe el mensaje
client.on('message', (topic, message) =>{
  console.log(message.toString())
  if(message == 'red'){
     setLightOn('green');
  } else {
    setLightOn('red');
  }
});

function useInterval(callback, delay) {
  const savedCallback = useRef();
  
  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if(delay > 0) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function App() {
  const SIGNAL_DELAY = 5;
  const [lightOn, setLightOn] = useState('red');
  const [delay, setDelay] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [counter, setCounter] = useState(0);
  
  
  // este metodo, cuando agarra un valor en firebase, corre, y quiero
  // que se cambie el color cuando el metodo traiga el nuevo color



  return (
    <>
      <div><h1>Pedesterian Lights simulator</h1></div>
      <div className="traffic-lights-container">
        <Light on={lightOn == 'red'} color="#cc3232" />
        <Light on={lightOn == 'yellow'} color="#e7b416" />
        <Light on={lightOn == 'green'} color="#2dc937" />
      </div>
      <div>
        {/* <ControlButton label="Start" disabled={isStarted} onClick={()=>{setIsStarted(true)}} /> */}
        {/* <ControlButton label={counter.toString().padStart(2, '0')} /> */}
        {/* <ControlButton label="Stop" disabled={!isStarted} onClick={()=>{setIsStarted(false)}}/> */}
      </div>
    </>
  )
}