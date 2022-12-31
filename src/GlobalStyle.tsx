import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
*, *::before, *::after{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
} 

body{
  background-color: rgba(131, 28, 228, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family:monospace, sans-serif;
  color:white;
}
`
export default GlobalStyles