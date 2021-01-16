import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type BigButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const BigButton: React.FC<BigButtonProps> = ({ children, ...rest }) => {
  return (
    <Container>
      <div />
      <div>
        <button type="button" {...rest}>
          {children}
        </button>
      </div>
    </Container>
  );
};

export default BigButton;
