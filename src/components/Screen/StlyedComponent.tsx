import styled from "styled-components";

export const OuterScreen = styled.div`
    overflow:auto;
`
export const TitleScreen = styled.small`
    color:#ddd;
    font-size:.75em;
    font-weight:800;
    font-style:italic;
`
export const MainScreen = styled.div.attrs({id:"mainscreen"})`
    height:70%;
    display:flex;
    justify-content:end;
    align-items:flex-end;
    font-size:1.5em;
    color:#eee;
`
export const Wrapper = styled.div.attrs({id:"screen-wrapper"})`
    display:inline-block;
`