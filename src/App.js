import {useState} from "react";

import useKeypress from 'react-use-keypress';
import Confetti from 'react-confetti'
import { useWindowSize } from '@react-hook/window-size'

import UIfx from 'uifx'
const beep = new UIfx(require('./audio/beep.mp3'))
const confirm = new UIfx(require('./audio/confirm.wav'))
const complete = new UIfx(require('./audio/complete.wav'))

import './App.css';

function App() {

    const formatTargetName = ( text ) => text.toLowerCase().split('')

    const [ targetName, setTargetName ] = useState( formatTargetName('planck' ) );
    const [ progress, setProgress ] = useState('');

    const resetProgress = () => {
        setProgress('')
    }

    const updateTargetName = ( text ) => {
        setTargetName( formatTargetName( text ) )
        resetProgress()
    }

    const nextLetter = [...targetName].splice( 0, progress.length + 1 ).pop();

    if( targetName.length === progress.length ) {
        // complete.play();
        setTimeout(() => {
            resetProgress()
        }, 6000 )
    }

    useKeypress('abcdefghijklmnopqrstuvwxyz'.split(''), (event) => {
        if ( event.key === nextLetter && targetName.length !== progress.length ) {
            setProgress(progress + nextLetter)
            confirm.play()
        } else {
            beep.play()
        }
    })

    const [width, height] = useWindowSize()

  return (
      <>
        <div style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',gap:'20px'}}>
            {targetName.map(( letter, index ) => {
                const directory = letter === progress[ index ] ? 'lineal-color' : 'lineal';
                return <img key={index} className={letter} style={{width:'100px'}} src={require('./images/alphabet/' + directory + '/' + letter + '.png')}/>
            })}
        </div>
          { targetName.length === progress.length && (<Confetti
              width={width}
              height={height}
          />)}
          <div style={{position:'fixed', right:'20px', bottom:'20px'}}>
                <button style={{border:0,backgroundColor:"transparent"}} onClick={() => {
                    updateTargetName( window.prompt('Enter a word') )
                }}>
                    <img style={{width: '50px'}} src={require('./images/alphabet/lineal/alphabet.png')} />
                </button>
          </div>
      </>
  );
}

export default App;
