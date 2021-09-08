import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import events from '../events.json';
import eventTypes from '../event-types.json';

import Quotes from '../components/quotes';
import EventsInLine from '../components/eventsInLine';
import Event from '../components/event';
import Image from '../components/image';

import MetaTags from '../components/metaTags';

import { slugify } from '../utils/slugify';
import { getCurrentDate } from '../utils/date';

const EventLayout = ({ match }) => {
  let title = match.params.name;

  const [eventText, setEventText] = useState('');
  const [text, setText] = useState('');

  /* get the event object item */
  const event = events.find((event) => slugify(event.name) === title);

  /* events of the same type: */
  const sameType = events.filter((e) => e.type === event.type);

  /* get the type object item */
  const type = eventTypes.find((type) => type.name === event.type);

  const nameLength = event.name.length;
  var upcoming = [];

  events.map((event) =>
    event.date > getCurrentDate() ? upcoming.push(event) : null
  );

  useEffect(() => {
    console.log(title);
    import(`../../src/events/${title}.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setEventText(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    setText(eventText.substring(eventText.lastIndexOf('---') + 5));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, eventText]);

  return (
    <>
      <MetaTags
        name={event.name || 'Loading...'}
        description={event.description || 'Loading...'}
      />
      <section className='bg-black evtypes'>
        <h4 className='vertical time black'>
          {event.name}
          <span className={type.color2}> {event.date}</span>
        </h4>
        <h4 className='vertical place black'>
          <span className={type.color2}>{event.location}</span>
        </h4>
        <div className='container-wide center'>
          <div className='flex'>
            <div className='left'>
              <h4 style={{ marginBottom: -20 }}>{event.date}</h4>
              <h4 style={{ marginBottom: -8 }}>{event.location}</h4>
              {event.codename ? null : (
                <h1
                  style={nameLength > 24 ? { fontSize: 60 } : { fontSize: 90 }}
                  className={`shadow-${type.color2}`}
                >
                  {event.name}
                </h1>
              )}
              <h1 dangerouslySetInnerHTML={{ __html: event.codename }}></h1>
              <p>{event.description}</p>
            </div>
            <Event
              type={event.type}
              color='black'
              nameClass='type-event'
              slug={title}
            />
          </div>
        </div>
      </section>
      <section>
        <h4>About the event</h4>
        <ReactMarkdown children={event.text} allowDangerousHtml={true} />
      </section>

      {'gallery' in event && (
        <section>
          <h4>Gallery</h4>
          <div className='flex gallery container'>
            {Array(event.gallery)
              .fill(0)
              .map((image, index) => (
                <Image path={`/events/0${index + 1}.jpg`} />
              ))}
          </div>
        </section>
      )}

      {'quotes' in event && <Quotes quotations={event.quotes} />}

      {upcoming.length > 1 && (
        <EventsInLine color='black' title='Upcoming events' events={upcoming} />
      )}

      <EventsInLine
        color={type.color2}
        title={`other ${event.type}`}
        events={sameType}
      />
    </>
  );
};
export default EventLayout;
