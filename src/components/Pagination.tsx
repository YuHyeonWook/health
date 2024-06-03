import React from 'react';
import styled from 'styled-components';
import iconChevronLeft from '@/assets/images/icon-chevron-left.svg';
import iconChevronRight from '@/assets/images/icon-chevron-right.svg';

interface PaginationProps {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationList>
      <ArrowBtn disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
        <img src={iconChevronLeft} alt="왼쪽 화살표" />
      </ArrowBtn>
      {pageNumbers.map((number) => (
        <PageItem key={number} onClick={() => paginate(number)} data-active={number === currentPage}>
          {number}
        </PageItem>
      ))}
      <ArrowBtn disabled={currentPage === pageNumbers.length} onClick={() => paginate(currentPage + 1)}>
        <img src={iconChevronRight} alt="오른쪽 화살표" />
      </ArrowBtn>
    </PaginationList>
  );
};

const PaginationList = styled.div`
  display: flex;
  justify-content: center;
  margin: 8rem 0 2rem;
`;

const PageItem = styled.button<{ 'data-active': boolean }>`
  width: 3.6rem;
  height: 3.6rem;
  font-size: 1.4rem;
  color: ${({ 'data-active': active }) => (active ? '#fff' : 'var(--color-black)')};
  background-color: ${({ 'data-active': active }) => (active ? 'var(--color-primary)' : 'transparent')};
  cursor: pointer;
`;

const ArrowBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.6rem;
  height: 3.6rem;
  margin: 0 0.5rem;
  border: var(--border-primary);
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  img {
    width: 1.2rem;
  }
`;

export default Pagination;
