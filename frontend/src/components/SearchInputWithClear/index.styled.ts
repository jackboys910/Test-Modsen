import styled from 'styled-components';

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 5px;
`;

export const SearchInput = styled.input`
  padding: 10px 40px 10px 10px;
  width: 240px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #f0f0f0;
  color: #555;
  transition: background-color 0.3s ease;

  &:focus {
    background-color: #fff;
    outline: none;
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 6%;
  top: 32%;
  background: none;
  border: none;
  font-size: 18px;
  color: #999;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;

  ${SearchInput}:focus + &,
  ${SearchInput}:not(:placeholder-shown) + & {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
  }
`;
