import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import Layout from '@/components/layout/Layout';

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;
const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 60%;
  padding: 0 50px 60px 50px;
  margin-top: 80px;
  background-color: #f5f5f5;
  border-radius: 10px;
`;
const MonthSwiperGrid = styled.div`
  grid-column: 1 / 2;
  display: flex;
  justify-content: space-between;
`;
const MonthSwiperLeft = styled.button`
  width: 50px;
  height: 50px;
  margin-top: 20px;
  color: #585757;
  background-color: #f5f5f5;
  font-size: 40px;
  border: none;
  cursor: pointer;
`;
const MonthSwiperRight = styled.button`
  width: 50px;
  height: 50px;
  margin-top: 20px;
  color: #585757;
  background-color: #f5f5f5;
  font-size: 40px;
  border: none;
  cursor: pointer;
`;
const YearMonth = styled.div`
  grid-column: 3 / 6;
  height: 60px;
  margin-top: 30px;
  color: #585757;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;
const NewEventGrid = styled.div`
  grid-column: 6 / 8;
  display: flex;
  justify-content: flex-end;
`;
const NewEvent = styled.button`
  width: 30px;
  height: 30px;
  margin-top: 31px;
  color: white;
  background-color: #585757;
  font-size: 20px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;
const DaysOfWeek = styled.div`
  padding: 12px;
  color: #969696;
  background-color: #ffffff;
  font-family: 'Inter-Medium', sans-serif;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  text-align: left;
`;
const Day = styled.div`
  height: 120px;
  padding-top: 5px;
  padding-left: 5px;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  text-align: left;
`;
const CurrentMonthDay = styled(Day)`
  color: #6e6e6e;
  background-color: white;
`;
const OtherMonthDay = styled(Day)`
  color: gray;
  background-color: #d3d3d3;
`;

interface Day {
  day: number;
  isCurrentMonth: boolean;
}

const Calendar: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [ModalOpen, setModalOpen] = useState<boolean>(false);

  const firstDayOfMonth: Date = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const daysInMonth: Day[] = [];

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    daysInMonth.push({ day: i, isCurrentMonth: true });
  }

  const daysOfWeek: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

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

  const handlePrevMonth = (): void => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };
  const handleNextMonth = (): void => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  const handleNewEventClick = (): void => {
    setModalOpen(true);
    setStartDate(new Date());
  };

  const handleDayClick = (day: number, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      setModalOpen(true);
      const clickedDate = new Date(date.getFullYear(), date.getMonth(), day);
      setStartDate(clickedDate);
    }
  };

  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <Layout>
      <Wrap>
        <CalendarGrid>
          <MonthSwiperGrid>
            <MonthSwiperLeft onClick={handlePrevMonth}>{'<'}</MonthSwiperLeft>
            <MonthSwiperRight onClick={handleNextMonth}>{'>'}</MonthSwiperRight>
          </MonthSwiperGrid>
          <YearMonth>{`${months[date.getMonth()]}, ${date.getFullYear()}`}</YearMonth>
          <NewEventGrid>
            <NewEvent onClick={handleNewEventClick}>+</NewEvent>
          </NewEventGrid>

          {ModalOpen && <Modal setModalOpen={setModalOpen} startDate={startDate} />}

          {daysOfWeek.map((day, index) => (
            <DaysOfWeek key={index}>{day}</DaysOfWeek>
          ))}
          {BeforeMonthDate.map((dayObj, index) => {
            const Day = dayObj.isCurrentMonth ? CurrentMonthDay : OtherMonthDay;
            return <Day key={`start-${index}`}>{dayObj.day}</Day>;
          })}
          {daysInMonth.map((dayObj, index) => {
            const Day = dayObj.isCurrentMonth ? CurrentMonthDay : OtherMonthDay;
            return (
              <Day key={index} onClick={() => handleDayClick(dayObj.day, dayObj.isCurrentMonth)}>
                {dayObj.day}
              </Day>
            );
          })}
          {AfterMonthDate.map((dayObj, index) => {
            const Day = dayObj.isCurrentMonth ? CurrentMonthDay : OtherMonthDay;
            return <Day key={`end-${index}`}>{dayObj.day}</Day>;
          })}
        </CalendarGrid>
      </Wrap>
    </Layout>
  );
};

export default Calendar;
