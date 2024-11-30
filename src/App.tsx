import { CalendarRangeSelect, CalendarSingleSelect } from 'components/Calendar'
import GlobalStyle from 'styles/GlobalStyle.ts'
import styled from 'styled-components'

function App() {

  return (
    <Container>
      <GlobalStyle />
      <CalendarSingleSelect year={2024} month={11} />
      <CalendarRangeSelect year={2024} month={11} minRange={5} maxRange={10} />
    </Container>
  )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
    gap: 10px
`

export default App
