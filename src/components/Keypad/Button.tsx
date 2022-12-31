import { StyledButton } from "./StlyedComponent";
import { IProps as IPropsSC } from "./StlyedComponent";
import { Execute } from "../../logic/Calculator";
import { ExpressionContext } from "../../App";
import { useContext } from "react";

interface IProps extends IPropsSC {
  children: string,
  errorState:Function
}

export type BtnKey = string;

const Button = (props: Omit<IProps, "theme">) => {
  const { expression, setexpression } = useContext(ExpressionContext);

  const keyMethod = () => {
    Execute(props._key, expression as string, setexpression as Function, props.errorState);
  };

  return (
    <StyledButton _key={props._key} onClick={keyMethod}>
      {props.children}
    </StyledButton>
  );
};

export default Button;
