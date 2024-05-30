import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../components/calendarcrud/Modal';
import Layout from '@/components/layout/Layout';

const Row = styled.div`
  display: flex;
  justify-content: center;
`;
const EarRow = styled.div`
  position: fixed;
  top: 115px;
  display: flex;
  justify-content: space-between;
  width: 700px;
`;
const LeftEarBox = styled.div`
  width: 30px;
  height: 35px;
  background-color: #54ef6e;
  border-radius: 30px 30px 0 0;
`;
const RightEarBox = styled.div`
  width: 30px;
  height: 35px;
  background-color: #54ef6e;
  border-radius: 30px 30px 0 0;
`;
const CalendarBox = styled.div`
  position: fixed;
  top: 150px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 900px;
  padding: 0 30px 30px 30px;
  background-color: #54ef6e;
  border-radius: 40px;
`;
const SwiperBox = styled.div`
  grid-column: 1 / 2;
  display: flex;
  justify-content: space-between;
`;
const LeftSwiperBtn = styled.button`
  width: 50px;
  height: 50px;
  margin-top: 18px;
  color: #585757;
  background-color: #54ef6e;
  font-size: 40px;
  border: none;
  cursor: pointer;
`;
const RightSwiperBtn = styled.button`
  width: 50px;
  height: 50px;
  margin-top: 18px;
  color: #585757;
  background-color: #54ef6e;
  font-size: 40px;
  border: none;
  cursor: pointer;
`;
const MonthYearBox = styled.div`
  grid-column: 3 / 6;
  height: 60px;
  margin-top: 23px;
  color: #4f4e4e;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
`;
const EventRow = styled.div`
  grid-column: 6 / 8;
  display: flex;
  justify-content: flex-end;
`;
const EventBtn = styled.button`
  width: 30px;
  height: 30px;
  margin: 27px 10px 0 0;
  color: white;
  background-color: #585757;
  font-size: 20px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;
const WeekBox = styled.div`
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
  height: 80px;
  padding-top: 5px;
  padding-left: 5px;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  text-align: left;
  &:hover {
    background: #54ef6e;
    color: white;
    transition: 0.5s;
    transform: scale(1.05);
    cursor: pointer;
  }
`;
const CurrentMonthDay = styled(Day)`
  color: #6e6e6e;
  background-color: white;
`;
const OtherMonthDay = styled(Day)`
  color: gray;
  background-color: #d3d3d3;
`;
const TodayDay = styled(CurrentMonthDay)`
  color: red;
`;

const TodayButton = styled.button`
  width: 60px;
  height: 30px;
  margin-top: 31px;
  color: white;
  background-color: #585757;
  font-size: 20px;
  cursor: pointer;
`;

interface Day {
  day: number;
  isCurrentMonth: boolean;
}

const Calendar: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  
  const today = new Date();
  const firstDayOfMonth: Date = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const daysInMonth: Day[] = [];

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    daysInMonth.push({ day: i, isCurrentMonth: true });
  }

  const week: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

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
      <Row>
        <EarRow>
          <LeftEarBox />
          <RightEarBox />
        </EarRow>
        <CalendarBox>
          <SwiperBox>
            <LeftSwiperBtn onClick={handlePrevMonth}>{'<'}</LeftSwiperBtn>
            <RightSwiperBtn onClick={handleNextMonth}>{'>'}</RightSwiperBtn>
          </SwiperBox>
          <TodayButton onClick={() => setDate(new Date())}>Today</TodayButton>
          <MonthYearBox>{`${months[date.getMonth()]}, ${date.getFullYear()}`}</MonthYearBox>
          <EventRow>
            <EventBtn onClick={handleNewEventClick}>+</EventBtn>
          </EventRow>

          {ModalOpen && <Modal setModalOpen={setModalOpen} startDate={startDate} />}

          {week.map((day, index) => (
            <WeekBox key={index}>{day}</WeekBox>
          ))}
          {BeforeMonthDate.map((dayObj, index) => {
            const Day = dayObj.isCurrentMonth ? CurrentMonthDay : OtherMonthDay;
            return <Day key={`start-${index}`}>{dayObj.day}</Day>;
          })}
          {daysInMonth.map((dayObj, index) => {
            const isToday = dayObj.day === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
            const Day = dayObj.isCurrentMonth ? (isToday ? TodayDay : CurrentMonthDay) : OtherMonthDay;
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
        </CalendarBox>
      </Row>
    </Layout>
  );
};

export default Calendar;
