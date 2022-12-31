import { MainScreen, TitleScreen, OuterScreen, Wrapper } from "./StlyedComponent"
import { ExpressionContext } from "../../App"
import { useContext, useEffect, useState } from "react"

const Screen = () => {
  const {expression} = useContext(ExpressionContext)
  const [dynamicsize, setdynamicsize] = useState({})

  useEffect(() => {

    if((expression as string).length >= 1 && (expression as string).length <=3)
    {
      setdynamicsize({})
    }
    let mainScreenWidth = getComputedStyle(
                            document.getElementById("mainscreen") as HTMLElement)
                            .getPropertyValue("width").slice(0, -2)
    let screenWrapperWidth = getComputedStyle(
                              document.getElementById("screen-wrapper") as HTMLElement)
                              .getPropertyValue("width").slice(0, -2)
    
    if (parseInt(screenWrapperWidth) > (parseInt(mainScreenWidth) / 2))
    {
        (setdynamicsize as any)({fontSize:".75em"})
    }    
  }, [expression])
  
  return (
    <OuterScreen>
      <TitleScreen>
          React Calculator
      </TitleScreen>
      <MainScreen>
        <Wrapper style={dynamicsize}>
          { expression }
        </Wrapper>
      </MainScreen>
    </OuterScreen>
  )
}

export default Screen
