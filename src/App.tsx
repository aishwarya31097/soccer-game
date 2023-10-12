import React, { useEffect, useState } from 'react';
import './App.scss';
import Notification from './components/Notification';

function App() {
  const [events, setEvents] = useState<any[]>([]);
  const [ticker, setTicker] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    const videoPlayer = document.querySelector('video');
    videoPlayer?.addEventListener('timeupdate', () => {
      setCurrentTime(videoPlayer.currentTime);
    });

    videoPlayer?.addEventListener('seeked', () => {
      const newCurrentTime = videoPlayer.currentTime;
      setEvents((prevEvents) =>
        prevEvents.map((event) => ({
          ...event,
          eventTime: event.time + newCurrentTime,
        }))
      );
    });

    return () => {
      videoPlayer?.removeEventListener('timeupdate', () => {});
      videoPlayer?.removeEventListener('seeked', () => {});
    };
  }, []);

  useEffect(() => {
    // to Fetch JSON data when the component mounts
    fetch('/gameData.json')
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.events);
        setTicker(data.ticker);
      })
      .catch((error) => {
        console.error('Error fetching JSON data:', error);
      });
  }, []); 

  const handleEndGame = () => {
    setGameEnded(true);
    const videoPlayer = document.querySelector('video');
    if (videoPlayer) {
      videoPlayer.pause();
      videoPlayer.src = '';
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <video controls src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"></video>

      <div className="notifications">
        {events.map((event) => (
          <Notification
            key={event.id}
            event={event.type}
            metadata={event}
            eventTime={event.time}
            currentTime={currentTime}
            onClose={() => {
              setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
            }}
          />
        ))}
      </div>

      <div className="ticker">
        {ticker.map((item) => (
          <div key={item.id} className="ticker-item">
            {item.body}
          </div>
        ))}
      </div>

      {gameEnded ? (
        <button  className="endGameButton" onClick={handleReload}>Reload</button>
      ) : (
        <button className="endGameButton" onClick={handleEndGame}>End Game</button>
      )}
    </div>
  );
}

export default App;
