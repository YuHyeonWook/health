import styled from 'styled-components';

interface Event {
  endDate: string;
  firstInput: string;
  memoInput: string;
  secondInput: string;
  startDate: string;
}

interface EventListProps {
  events: Event[];
}

const EventList = ({ events }: EventListProps) => {
  if (events.length === 0) {
    return null;
  }

  return (
    <EventListContainer>
      {events.map((event, index) => (
        <EventItem key={index}>
          <EventTitle>{event.firstInput}</EventTitle>
          <EventDescription>{event.memoInput}</EventDescription>
          <EventDetail>횟수/세트: {event.secondInput}</EventDetail>
        </EventItem>
      ))}
    </EventListContainer>
  );
};

export default EventList;

const EventListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EventItem = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  margin: 5px 0;
  padding: 10px;
  overflow: hidden;

  &:hover {
    height: auto;
  }
`;

const EventTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const EventDescription = styled.div`
  font-size: 14px;
  color: #333;
  display: none;
  ${EventItem}:hover & {
    display: block;
  }
`;

const EventDetail = styled.div`
  font-size: 12px;
  color: #555;
  display: none;
  ${EventItem}:hover & {
    display: block;
  }
`;
