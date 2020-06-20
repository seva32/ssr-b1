/* eslint-disable no-undef */
import styled from 'styled-components';
import tw from 'twin.macro';

export const Button = styled('button')`
  ${tw`font-mono text-sm text-red-400 hover:text-blue-400`};
`;

export const Container = styled('div')`
  width: 50vw;
  height: 50px;
  background-color: blue;
`;
