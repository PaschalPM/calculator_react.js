import styled, { css } from "styled-components";

const numKeyList: Array<string> = [
  "7", "8", "9", "4",
  "5", "6", "1", "2",
  "3", "0", ".",
];

export interface IProps {
  theme: { color: { numericKey: string, 
                    operator:string, 
                    ac:string, 
                    equalsTo:string } },
  _key: string,
}
export const StyledButton = styled.button`
  all:unset;
  margin:auto;
  display:flex;
  width:100%;
  height:100%;
  justify-content:center;
  align-items:center;
  user-select:none;
  background-color: ${(props: IProps) => 'transparent'};
  font-size:1.15em;
  cursor:pointer;
  &:active{
    transform:scale(95%);
  }
  ${({ _key }) => {
    
      if (numKeyList.includes(_key)){
        return css`
          background-color: ${({theme}) => theme.color.numericKey};
          grid-column: span ${({_key}) => _key == "0"? 2 : 1};
        `
      }
      if (_key == "AC"){
          return css`
            background-color: ${({theme}) => theme.color.ac};
            grid-column: span 2;
            color:black;
        `
      }
      if (_key.match(/[/x-]$/) || _key == "+"){
          return css`
            background-color: ${({theme}) => theme.color.operator};
          `
      }
      if (_key == "="){
        return css`
            background-color: ${({theme}) => theme.color.equalsTo};
            grid-row: span 2;
          `
      }
  }}
`;

export const StyledKeyPad = styled.div`
  display:grid;
  grid-template-columns:repeat(4, 1fr);
  grid-gap:.25em;
  position:relative;

`
export const ErrorAlert = styled.span`
  position:absolute;
  bottom:15%;left:50%;
  transform:translate(-50%, -50%);
  font-size:.7em;
  font-family:cursive;
  transition:all 1s ease-in-out;
  background-color: rgba(255, 255, 255, .85);
  color:#000;
  padding:.5em 1em;
  border-radius:.5em;
`