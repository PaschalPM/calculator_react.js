import Button from "./Button"
import { StyledKeyPad, ErrorAlert } from "./StlyedComponent"
import { useState } from "react"

const keyList:Array<string> = [
  "AC", "/", "x", 
  "7", "8", "9", "-",
  "4", "5", "6", "+",
  "1", "2", "3", "=",
  "0", "."
]

const Keypad = () => {

  const [error, seterror] = useState(false)
  let errorAlert = error && <ErrorAlert> Invalid format used. </ErrorAlert>

  return (
    <StyledKeyPad>
      {errorAlert}
      {keyList.map(key=>(
        <Button _key={key} key={key} errorState={seterror}>
          { key }
        </Button>
      ))}
    </StyledKeyPad>
  )
}

export default Keypad