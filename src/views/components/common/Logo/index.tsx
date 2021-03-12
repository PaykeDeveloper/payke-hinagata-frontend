import React, { FC } from 'react';

// FIXME: SAMPLE CODE
import logo from './logo.svg';

export interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = (props) => {
  const { className } = props;
  return <img className={className} src={logo} alt="Logo" />;
};

export default Logo;
