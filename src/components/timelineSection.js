import React from 'react';
import TimelineEvent from './timelineEvent';

const TimelineSection = ({ events, color, title, reversed }) => {
  var odd = [];
  var even = [];
  events.map((event, index) =>
    index % 2 === 0 ? odd.push(event) : even.push(event)
  );
  if (reversed === true) {
    [odd, even] = [even, odd];
  }
  return (
    <section className={`center bg-${color} timeline`}>
      <div className='container-wide center flex desktop'>
        <div className='flex timeline-container' style={{ marginTop: -80 }}>
          {odd.map((event, index) => (
            <TimelineEvent
              key={index}
              event={event}
              color={color}
              nameClass='timeline-event'
            />
          ))}
        </div>
        <div
          className={`timeline-line ${color === 'black' && 'inverted'}`}
        ></div>
        <div
          className={`flex timeline-container ${reversed && 'movedup'}`}
          style={{ marginTop: 180 }}
        >
          {even.map((event, index) => (
            <TimelineEvent
              key={index}
              event={event}
              color={color}
              nameClass='timeline-event'
            />
          ))}
        </div>
      </div>
      <div
        className='container-wide center flex mobile'
        style={{ justifyContent: 'center' }}
      >
        <div className='flex timeline-container'>
          {events.map((event, index) => (
            <TimelineEvent
              key={index}
              event={event}
              color={color}
              nameClass='timeline-event'
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default TimelineSection;
