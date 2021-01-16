import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type RedButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const RedButton: React.FC<RedButtonProps> = ({ children, ...rest }) => {
  return (
    <Container>
      <button {...rest} type="button">
        {children}
      </button>
    </Container>
  );
};

export default RedButton;
