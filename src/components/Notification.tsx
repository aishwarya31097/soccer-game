import React, { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import './Notification.scss';

interface NotificationProps {
  event: string;
  metadata: Record<string, any>;
  eventTime: number;
  currentTime: number;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  event,
  metadata,
  eventTime,
  currentTime,
  onClose,
}) => {
  const [displayed, setDisplayed] = useState(false);

  useEffect(() => {
    if (!displayed && eventTime <= currentTime) {
      setDisplayed(true);

      const timer = setTimeout(() => {
        onClose();
      }, 5000); //for Closing the notification after 5 seconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [onClose, currentTime, displayed, eventTime]);

  return (
    <Transition in={displayed} timeout={1000} unmountOnExit>
      {(state) => (
        <div
          className={`notification ${event} notification-${state}`}
        >
          <p>Event: {event}</p>
          {event === 'goal' && (
            <div>
              <p>Player: {metadata.player}</p>
              <p>Distance of Shot: {metadata.distanceOfShot} meters</p>
              <p>New Score: Home - {metadata.newScore.home}, Away - {metadata.newScore.away}</p>
            </div>
          )}
          {event === 'card' && (
            <div>
              <p>Player: {metadata.player}</p>
              <p>Card Type: {metadata.cardType}</p>
            </div>
          )}
          {event === 'endHalf' && <p>End of Half</p>}
          {event === 'endGame' && <p>End of Game</p>}
        </div>
      )}
    </Transition>
  );
};

export default Notification;
