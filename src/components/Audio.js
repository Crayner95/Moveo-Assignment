import React, {useCallback, useEffect, useState} from 'react';
import {Box, Button, Container, duration, Grid, Paper, Typography} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import PauseIcon from '@mui/icons-material/Pause';

const initialBeat = [
  {
    path: '/sounds/beat1.mp3',
    color: '#ffcece',
    name: 'uuho',
    mute: false,

  },
  {
    path: '/sounds/beat2.mp3',
    color: '#b3cde3',
    name: 'tambourine',
    mute: false,
  },
  {
    path: '/sounds/beat3.mp3',
    color: '#ccebc5',
    name: 'lead',
    mute: false,
  },
  {
    path: '/sounds/beat4.mp3',
    color: '#decbe4',
    name: 'jibrish',
    mute: false,
  },
  {
    path: '/sounds/beat5.mp3',
    color: '#fed9a6',
    name: 'high',
    mute: false,
  },
  {
    path: '/sounds/beat6.mp3',
    color: '#ffffcc',
    name: 'drums',
    mute: false,
  },
  {
    path: '/sounds/beat7.mp3',
    color: '#e5d8bd',
    name: 'he he',
    mute: false,
  },
  {
    path: '/sounds/beat8.mp3',
    color: '#fde3da',
    name: 'be voc',
    mute: false,
  }
]

const song = initialBeat.map(beat => new Audio(process.env.PUBLIC_URL + beat.path))

const audio = new Audio(process.env.PUBLIC_URL + '/sounds/beat2.mp3');
audio.addEventListener('loadedmetadata', function () {
  const duration = audio.duration;
  console.log("The duration of the song is of: " + duration + " seconds");
}, false);

// const songLength = 17000

function Beat() {
  const [time, setTime] = useState("");
  const [beats, setBeats] = useState(initialBeat);
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [intervalID, setIntervalID] = useState(null);

  useEffect(() => {
    songDuration()
  })

  const muted = () => {
    for (let i = 0; i < song.length; i++) {
      song[i].muted = beats[i].mute
    }
  }

  useEffect(() => {
    muted()
  }, [beats])


  useEffect(() => {
    if (playing) {
      start()
    } else {
      stop()
    }
  }, [playing])

  const start = () => {
    setPosition(0)
    for (let i = 0; i < song.length; i++) {
      song[i].play()
    }
    setIntervalID(setInterval(() => {
      setPosition(pos => pos + 100)
    }, 100))
  }

  const stop = () => {
    for (let i = 0; i < song.length; i++) {
      song[i].currentTime = 0
      song[i].pause()
    }
    clearInterval(intervalID)
  }

  const mute = (name) => {
    const newBeats = beats.map(beat => {
      if (beat.name === name) {
        beat.mute = !beat.mute
      }
      return beat
    })
    setBeats(newBeats)
  }

  const addDuration = (index, duration) => {
    const newBeats = [...beats];
    newBeats[index].duration = duration
    setBeats(newBeats)
  }

  const songDuration = () => {
    for (let i = 0; i < song.length; i++) {
      song[i].addEventListener('loadedmetadata', function () {
        const specificDuration = song[i].duration
        addDuration(i, specificDuration)
      }, false);
    }
  }

  const runLoop = () => {
    for (let i = 0; i < song.length; i++) {
      song[i].loop = true
    }
  }

  return (
    <Container maxWidth="lg"
               style={{
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
               }}>
      <Box sx={{width: '50%', display: 'flex', justifyContent: 'space-evenly', backgroundColor: '#ff9f9f'}}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Button onClick={() => setPlaying(true)} startIcon={<PlayArrowIcon/>} sx={{color: 'black'}}>
            Play
          </Button>
        </Box>
        <Box>
          <Button onClick={() => setPlaying(false)} startIcon={<StopIcon/>} sx={{color: 'black'}}>
            Stop
          </Button>
        </Box>
        <Box>
          <Button onClick={runLoop} startIcon={<AllInclusiveIcon/>} sx={{color: 'black'}}>
            Loop
          </Button>
        </Box>
      </Box>
      <Grid container sx={{mt: 5, justifyContent: 'space-evenly'}}>
        <Grid item xs={12} md={4}>
          {beats && beats.map(beat => <Paper key={beats.name}
                                             elevation={3}
                                             sx={{
                                               height: 50,
                                               margin: 1,
                                               padding: 1,
                                               display: 'flex',
                                               alignItems: 'center',
                                               backgroundColor: beat.color,
                                             }}>
            <Typography component="span"
                        sx={{flex: 1, marginLeft: 3, fontWeight: 'bold'}}>{beat.name}</Typography>
            {beat.mute &&
              <Button startIcon={<VolumeUpIcon/>} sx={{color: 'black'}} onClick={() => mute(beat.name)}/>}
            {!beat.mute &&
              <Button startIcon={<VolumeOffIcon/>} sx={{color: 'black'}} onClick={() => mute(beat.name)}/>}
          </Paper>)}
        </Grid>
        {/*<Box sx={{height: 200, width: 5}}>*/}
        <Grid item xs={12} md={8}>
          {beats.map(beat => <Paper key={beats.name}
                                    elevation={3}
                                    sx={{
                                      position: 'relative',
                                      backgroundColor: beat.color,
                                      height: 50,
                                      margin: 1,
                                      padding: 1
                                    }}>
            <Box
              sx={{
                backgroundColor: 'black',
                position: 'absolute',
                width: '2px',
                top: 0,
                bottom: 0,
                left: (position / beat.duration) * 100 + "%"
              }}/>
          </Paper>)}
        </Grid>
      </Grid>
    </Container>

  );
}

export default Beat;
