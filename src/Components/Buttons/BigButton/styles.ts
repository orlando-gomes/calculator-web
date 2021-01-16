import styled from 'styled-components';

export const Container = styled.div`
  padding: 0;
  margin-top: 6px;

  div + div {
    margin-top: 20px;
    border: 2px solid #151515;
  }

  button {
    width: 60px;
    height: 44px;
    background: linear-gradient(-45deg, #505050, #202020);
    border-style: solid;
    border-width: 2px;
    border-top-color: #606060;
    border-right-color: #101010;
    border-bottom-color: #101010;
    border-left-color: #606060;
    color: #bbbbbb;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:active {
      background: linear-gradient(-45deg, #00a0d0, #306080);
      border-top-color: #608080;
      border-right-color: #101030;
      border-bottom-color: #101030;
      border-left-color: #608080;
      color: #3333bb;
    }
  }
`;
