import styled from 'styled-components';

export const Container = styled.div`
  padding: 0;
  border: 2px solid #151515;
  margin: 6px 0 0 6px;

  button {
    width: 48px;
    height: 32px;
    background: linear-gradient(-45deg, #fdc0c0, #f16060);
    border-style: solid;
    border-width: 2px;
    border-top-color: #ddcccc;
    border-right-color: #502323;
    border-bottom-color: #502323;
    border-left-color: #ddcccc;
    color: #302020;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:active {
      background: linear-gradient(-45deg, #ffa500, #ff6c00);
      border-top-color: #ddeeaa;
      border-right-color: #603000;
      border-bottom-color: #603000;
      border-left-color: #ddeeaa;
      color: #403030;
    }
  }
`;
