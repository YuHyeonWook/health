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

const EventList = ({ events, setSelectedEventId, setUpdateModalOpen }: EventListProps) => {
  const handleEventClick = (event: Event) => {
    if (event.id) {
      setSelectedEventId(event.id);
      setUpdateModalOpen(true);
    }
    if (events.length === 0) {
      return null;
    }
  };

  const colors = ['#FFB6C1', '#ADD8E6', '#90EE90', '#FFD700', '#FF6347', '#8A2BE2'];

  return (
    <EventListContainer>
      {events.map((event) => (
        <EventItem key={event.id} onClick={() => handleEventClick(event)} color={colors[event.id % colors.length]}>
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
  background-color: ${(props) => props.color};
  border: 1px solid var(--color-gray-lighter);
  border-radius: 4px;
  margin: 3px;
  padding: 5px;
  color: var(--color-gray-dark);
  overflow: hidden;
  cursor: pointer;

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
  color: var(--color-gray);
  display: none;
  ${EventItem}:hover & {
    display: block;
  }
`;

const EventDetail = styled.div`
  font-size: 8px;
  color: var(--color-gray);
  display: none;
  ${EventItem}:hover & {
    display: block;
  }
`;
