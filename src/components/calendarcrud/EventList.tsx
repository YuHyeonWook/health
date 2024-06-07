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

  return (
    <EventListContainer>
      {events.map((event) => (
        <EventItem key={event.id} onClick={() => handleEventClick(event)}>
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
  left: -0.5rem;
  width: 105%;
`;

const EventItem = styled.div`
  border: 1px solid var(--color-gray-lighter);
  border-radius: 0.4rem;
  margin: 0.3rem;
  padding: 0.5rem;
  color: var(--color-gray-dark);
  overflow: hidden;
  cursor: pointer;

  &:hover {
    height: auto;
  }
`;

const EventTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const EventDescription = styled.div`
  font-size: 1rem;
  color: var(--color-gray);
  display: none;
  ${EventItem}:hover & {
    display: block;
  }
`;

const EventDetail = styled.div`
  font-size: 0.8rem;
  color: var(--color-gray);
  display: none;
  ${EventItem}:hover & {
    display: block;
  }
`;
