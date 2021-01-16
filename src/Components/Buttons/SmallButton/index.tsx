import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type SmallButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const SmallButton: React.FC<SmallButtonProps> = ({ children, ...rest }) => {
  return (
    <Container>
      <div />
      <div>
        <button {...rest} type="button">
          {children}
        </button>
      </div>
    </Container>
  );
};

export default SmallButton;
