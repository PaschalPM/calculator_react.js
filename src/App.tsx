import { ThemeProvider } from "styled-components"
import Screen from "./components/Screen"
import Keypad from "./components/Keypad"
import Calculator from "./StyledCalculator"
import GlobalStyle from "./GlobalStyle"
import { useState, createContext } from "react"
import {theme} from "./ThemeProvider"

type StateType = {
  expression:string,
  setexpression:React.Dispatch<React.SetStateAction<string>>,
  dynamicsize:{fontSize?:string}, 
  setdynamicsize:React.Dispatch<React.SetStateAction<boolean>>,
}
export const ExpressionContext = createContext({} as Partial<StateType>)

const App = () => {

  const [expression, setexpression] = useState("0")
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <ExpressionContext.Provider value={{expression, setexpression}}>
            <Calculator>
              <Screen/>
              <Keypad/>
            </Calculator>
      </ExpressionContext.Provider>
    </ThemeProvider>
  )
}

export default App
