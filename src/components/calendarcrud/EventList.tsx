import React, { useState } from 'react';
import styled from 'styled-components';

interface Event {
  id: string;
  endDate: string;
  firstInput: string;
  memoInput: string;
  secondInput: string;
  startDate: string;
}

interface EventListProps {
  events: Event[];
  setSelectedEventId: (id: string) => void;
  setUpdateModalOpen: (open: boolean) => void;
}

const colors = [
  '#FFB6C1',
  '#ADD8E6',
  '#90EE90',
  '#FFD700',
  '#FF6347',
  '#8A2BE2',
];

const colorMap: { [key: string]: string } = {};

const getColorForEventId = (eventId: string): string => {
  if (!colorMap[eventId]) {
    const colorIndex = Object.keys(colorMap).length % colors.length;
    colorMap[eventId] = colors[colorIndex];
  }
  return colorMap[eventId];
};

const sortEventsByDate = (events: Event[]) => {
  return [...events].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
};

const groupEventsByDate = (events: Event[]) => {
  const groupedEvents: { [date: string]: Event[] } = {};

  events.forEach(event => {
    let currentDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      if (!groupedEvents[dateStr]) {
        groupedEvents[dateStr] = [];
      }
      groupedEvents[dateStr].push(event);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  return groupedEvents;
};

const EventList = ({ events, setSelectedEventId, setUpdateModalOpen }: EventListProps) => {
  const sortedEvents = sortEventsByDate(events);
  const groupedEvents = groupEventsByDate(sortedEvents);

  const handleEventClick = (event: Event) => {
    if (event.id) {
      setSelectedEventId(event.id);
      setUpdateModalOpen(true);
    }
  };

  console.log(events);

  const renderedEventIds: Set<string> = new Set();
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

  const toggleExpand = (date: string) => {
    const newExpandedDates = new Set(expandedDates);
    if (newExpandedDates.has(date)) {
      newExpandedDates.delete(date);
    } else {
      newExpandedDates.add(date);
    }
    setExpandedDates(newExpandedDates);
  };

  return (
    <EventListContainer>
      {Object.keys(groupedEvents).map(date => (
        <DateGroup key={date}>
          {groupedEvents[date].length > 3 && !expandedDates.has(date) && (
            <MoreEventsButton onClick={() => toggleExpand(date)}>
              {`+${groupedEvents[date].length - 3} more`}
            </MoreEventsButton>
          )}
          {groupedEvents[date].map((event, index) => {
            if (!renderedEventIds.has(event.id)) {
              renderedEventIds.add(event.id);
              if (index < 3 || expandedDates.has(date)) {
                return (
                  <EventItem
                    key={event.id}
                    onClick={() => handleEventClick(event)}
                    color={getColorForEventId(event.id)}
                  >
                    <EventTitle>{event.firstInput}</EventTitle>
                    <EventDescription>{event.memoInput}</EventDescription>
                    <EventDetail>횟수/세트: {event.secondInput}</EventDetail>
                  </EventItem>
                );
              }
            }
            return null;
          })}
        </DateGroup>
      ))}
    </EventListContainer>
  );
};

export default EventList;

const EventListContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  left: -5px;
  width: 105%;
`;

const DateGroup = styled.div`
  /* margin-bottom: 10px; */
  position: relative;
`;

const EventItem = styled.div<{ color: string }>`
  background-color: ${props => props.color};
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  margin: 3px 0;
  padding: 5px;
  overflow: hidden;

  &:hover {
    height: auto;
  }
`;

const EventTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
`;

const EventDescription = styled.div`
  font-size: 10px;
  color: #333;
  display: none;
  ${EventItem}:hover & {
    display: block;
  }
`;

const EventDetail = styled.div`
  font-size: 8px;
  color: #555;
  display: none;
  ${EventItem}:hover & {
    display: block;
  }
`;

const MoreEventsButton = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin: 3px 0;
  padding: 5px;
  font-size: 10px;
  cursor: pointer;
  position: absolute;
  top: -30px;
  right: 0;
`;
