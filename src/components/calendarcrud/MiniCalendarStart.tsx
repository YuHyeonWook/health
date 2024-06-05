import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Day {
  day: number;
  isCurrentMonth: boolean;
}

interface MiniCalendarStartType {
  onDayClick: (day: Date) => void;
  setMiniStartOpen: (open: boolean) => void;
}

const MiniCalendarStart = ({ onDayClick, setMiniStartOpen }: MiniCalendarStartType) => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const firstDayOfMonth: Date = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const daysInMonth: Day[] = [];

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    daysInMonth.push({ day: i, isCurrentMonth: true });
  }

  const Week: string[] = ['일', '월', '화', '수', '목', '금', '토'];

  const BeforeMonthDate: Day[] = Array.from({ length: firstDayOfMonth.getDay() }, (_, i) => ({
    day: lastDayOfMonth.getDate() - i,
    isCurrentMonth: false,
  })).reverse();

  const AfterMonthDate = Array.from({ length: 6 - lastDayOfMonth.getDay() }, (_, i) => ({
    day: i + 1,
    isCurrentMonth: false,
  }));

  useEffect(() => {
    const daysInMonth = [];
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      daysInMonth.push({ day: i, isCurrentMonth: true });
    }
  }, [date]);

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    const selectedDate = new Date(date.getFullYear(), date.getMonth(), day);
    onDayClick(selectedDate);
    setMiniStartOpen(false);
  };

  const handlePrevMonth = (): void => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };
  const handleNextMonth = (): void => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  const months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <MiniLayout>
      <MiniCalendarBox>
        <MiniSwiperBox>
          <MiniLeftSwiperBtn onClick={handlePrevMonth}>{'<'}</MiniLeftSwiperBtn>
          <MiniRightSwiperBtn onClick={handleNextMonth}>{'>'}</MiniRightSwiperBtn>
        </MiniSwiperBox>
        <MiniMonthYearBox>{`${date.getFullYear()}. ${months[date.getMonth()]}`}</MiniMonthYearBox>
        <MiniRightBox></MiniRightBox>

        {Week.map((day, index) => (
          <MiniWeekBox key={index}>{day}</MiniWeekBox>
        ))}
        {BeforeMonthDate.map((dayObj, index) => {
          const MiniDay = dayObj.isCurrentMonth ? CurrentMonthDay : OtherMonthDay;
          return <MiniDay key={`start-${index}`}>{dayObj.day}</MiniDay>;
        })}
        {daysInMonth.map((dayObj, index) => {
          const MiniDay = dayObj.isCurrentMonth ? CurrentMonthDay : OtherMonthDay;
          return (
            <MiniDay onClick={() => handleDayClick(dayObj.day)} key={index}>
              {dayObj.day}
            </MiniDay>
          );
        })}
        {AfterMonthDate.map((dayObj, index) => {
          const MiniDay = dayObj.isCurrentMonth ? CurrentMonthDay : OtherMonthDay;
          return <MiniDay key={`end-${index}`}>{dayObj.day}</MiniDay>;
        })}
      </MiniCalendarBox>
    </MiniLayout>
  );
};

export default MiniCalendarStart;

const MiniLayout = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;
const MiniCalendarBox = styled.div`
  position: absolute;
  left: 8px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 230px;
  margin: 3px 0 0 15px;
  padding: 0 10px 20px 10px;
  background-color: var(--color-white);
  border: 1px solid #000;
  border-radius: 10px;
`;
const MiniSwiperBox = styled.div`
  grid-column: 1 / 2;
  display: flex;
  justify-content: space-between;
`;
const MiniLeftSwiperBtn = styled.button`
  width: 10px;
  height: 10px;
  margin-top: 15px;
  padding-left: 6px;
  color: #585757;
  font-size: 15px;
  border: none;
  cursor: pointer;
`;
const MiniRightSwiperBtn = styled.button`
  width: 10px;
  height: 10px;
  margin-top: 15px;
  padding-left: 10px;
  color: #585757;
  font-size: 15px;
  border: none;
  cursor: pointer;
`;
const MiniMonthYearBox = styled.div`
  grid-column: 3 / 6;
  height: 30px;
  margin-top: 15px;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
`;
const MiniRightBox = styled.div`
  grid-column: 6 / 8;
  display: flex;
  justify-content: flex-end;
`;
const MiniWeekBox = styled.div`
  padding: 5px;
  background-color: var(--color-white) fff;
  font-family: 'Inter-Medium', sans-serif;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
`;
const MiniDay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  font-size: 12px;

  &: hover {
    background-color: var(--chip-blue);
    color: var(--color-white);
    border: 2px solid var(--color-black);
  }
`;
const CurrentMonthDay = styled(MiniDay)`
  color: var(--color-black);
  background-color: white;
`;
const OtherMonthDay = styled(MiniDay)`
  color: var(--color-gray);
  background-color: var(--color-gray-light);
  border: 1px solid var(--color-white);

  &: hover {
    color: var(--color-gray);
    background-color: var(--color-gray-light);
    border: 1px solid var(--color-white);
  }
`;
