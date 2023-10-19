import React, { useRef, useEffect, useState } from 'react';
import playUrl, { ReactComponent as Play } from 'images/play.svg';
import pauseUrl, { ReactComponent as Pause } from 'images/pause.svg';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';

const AudioPlayerStyle = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  height: 18px;
`;
const PlayButton = styled.div`
  display: flex;
  cursor: pointer;
  & > svg {
    pointer-events: none;
    width: 12px;
    height: 12px;
    fill: ${({ theme }) => theme.color.primary};
  }
`;
const RageStyle = styled.input`
  cursor: pointer;
  -webkit-appearance: none;
  width: 100%;
  height: 7px;
  background: #ccc;
  border-radius: 5px;
  background-image: linear-gradient(#85009e, #85009e);
  background-size: ${({ $back }) => ($back ? $back : 0)}% 100%;
  background-repeat: no-repeat;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 0px;
    width: 0px;
    border-radius: 50%;
    background: #ff4500;
    cursor: ew-resize;
    box-shadow: 0 0 2px 0 #555;
    transition: background 0.3s ease-in-out;
  }

  &::-moz-range-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #ff4500;
    cursor: ew-resize;
    box-shadow: 0 0 2px 0 #555;
    transition: background 0.3s ease-in-out;
  }

  &::-ms-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #ff4500;
    cursor: ew-resize;
    box-shadow: 0 0 2px 0 #555;
    transition: background 0.3s ease-in-out;
  }

  &::-webkit-slider-thumb:hover {
    background: #ff0200;
  }
  &::-moz-range-thumb:hover {
    background: #ff0200;
  }

  &::-ms-thumb:hover {
    background: #ff0200;
  }

  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }

  &::-moz-range-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }

  &::-ms-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }
`;
const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const rageRef = useRef(null);
  const timeRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [back, setBack] = useState(0);

  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.addEventListener('timeupdate', setRageValue);
      audioRef.current.onloadedmetadata = () => {
        innerTime(audioRef.current?.currentTime, audioRef.current?.duration);
      };
    }
  }, []);

  const handlePlay = () => {
    if (play) {
      audioRef.current.pause();
      setPlay(false);
      return;
    }
    audioRef.current.play();
    setPlay(true);
  };
  const getTime = (time) => {
    if (!time) {
      return 0;
    }
    if (time < 10) {
      return '0' + time;
    }
    return time;
  };
  const innerTime = (currentTime, duration) => {
    const hours = Math.floor(currentTime / 3600);
    const minutes = Math.floor((currentTime - hours * 3600) / 60);
    const seconds = Math.round(currentTime - hours * 3600 - minutes * 60);
    const durationHours = Math.floor(duration / 3600);
    const durationMinutes = Math.floor((duration - durationHours * 3600) / 60);
    const durationMeconds = Math.round(
      duration - durationHours * 3600 - durationMinutes * 60
    );
    timeRef.current.innerHTML = `${getTime(minutes)}:${getTime(
      seconds
    )}/${getTime(durationMinutes)}:${getTime(durationMeconds)}`;
  };
  const setRageValue = () => {
    const { duration, currentTime } = audioRef.current;
    if (duration === currentTime) {
      setPlay(false);
      return;
    }
    rageRef.current.max = duration;
    rageRef.current.value = currentTime;
    innerTime(currentTime, duration);
    setBack((currentTime / duration) * 100);
  };
  const handleRage = (e) => {
    const newCurrentTime = e.target.value;
    audioRef.current.currentTime = newCurrentTime;
  };
  return (
    <AudioPlayerStyle>
      <audio
        ref={audioRef}
        controls
        style={{ display: 'none' }}
        preload='metadata'
      >
        <source src={src} type='audio/mp3' />
        Your browser does not support the audio element.
      </audio>
      <PlayButton onClick={handlePlay}>
        {play ? <Pause /> : <Play />}
      </PlayButton>
      <RageStyle
        $back={back}
        ref={rageRef}
        id='cur-time'
        type='range'
        min='0'
        max='200'
        value={0}
        step='0'
        onChange={handleRage}
      />
      <div style={{ minWidth: 60 }}>
        <TextSpanStyle size={10} nowrap ref={timeRef}></TextSpanStyle>
      </div>
    </AudioPlayerStyle>
  );
};

export default AudioPlayer;
