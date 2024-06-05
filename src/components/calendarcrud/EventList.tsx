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

const colors = [
  '#FFB6C1',
  '#ADD8E6',
  '#90EE90',
  '#FFD700',
  '#FF6347',
  '#8A2BE2',
];

const EventList = ({ events }: EventListProps) => {
  if (events.length === 0) {
    return null;
  }

  return (
    <EventListContainer>
      {events.map((event, index) => (
        <EventItem key={index} color={colors[index % colors.length]}>
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
  position: relative;
  left: -5px;
  width: 105%;
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
