import styled, { css } from 'styled-components';

interface TopPortionProps {
  memory: boolean;
  shouldShowOperation: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

export const CalcBackground = styled.div`
  padding: 8px 8px 24px;
  width: 360px;
  min-height: 400px;
  background: linear-gradient(45deg, #555555, #505050);
`;

export const Visor = styled.div`
  padding: 0 20px;
  height: 90px;
  background: #cae3ca;
  color: #334033;
  font-size: 24px;
  border-width: 4px;
  border-style: solid;
  border-top-color: #303030;
  border-right-color: #707070;
  border-bottom-color: #707070;
  border-left-color: #303030;
`;

export const TopPortion = styled.div<TopPortionProps>`
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  span:first-child {
    padding: 0 4px;
    color: #cae3ca;
    border: 1px solid #cae3ca;
    border-radius: 4px;
    ${props =>
      props.memory &&
      css`
        color: #603333;
        border-color: #603333;
      `}
  }

  span + span {
    padding: 0 4px;
    margin-left: 20px;
    color: #cae3ca;
    border: 1px solid #cae3ca;
    border-radius: 4px;
    ${props =>
      props.shouldShowOperation &&
      css`
        color: #603333;
        border-color: #603333;
      `}
  }
`;

export const BottomPortion = styled.div`
  height: 50px;
  line-height: 50px;
  text-align: right;
`;

export const FirstLine = styled.div`
  padding: 8px 0;
  display: flex;
  justify-content: space-between;

  div + div {
    display: flex;
  }
`;

export const SecondLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const SimpleOperation = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
