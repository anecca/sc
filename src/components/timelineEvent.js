import React from 'react';
import Event from './event';
import { Link } from 'react-router-dom';
import { slugify } from '../utils/slugify';

const TimelineEvent = ({ event, color, nameClass }) => {
  return (
    <Link
      to={`/${slugify(event.type)}/${slugify(event.name)}`}
      className={nameClass}
    >
      <Event
        nameClass={nameClass}
        type={event.type}
        color={color}
        slug={slugify(event.name)}
      >
        <h5>{event.date}</h5>
        <h5>{event.location}</h5>
        <h3>{event.name}</h3>
        <Link to={`/${slugify(event.type)}/${slugify(event.name)}`}>
          <button>read more</button>
        </Link>
      </Event>
    </Link>
  );
};
export default TimelineEvent;
