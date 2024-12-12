import styled from 'styled-components'

// Components
import CalendarRangeSelect from 'components/Calendar/RangeSelect'

// Styled
import GlobalStyle from 'styles/GlobalStyle.ts'

function App() {

  return (
    <Container>
      <GlobalStyle />
      <CalendarRangeSelect months={[[2024, 12], [2025, 1]]} rangeLimits={[5, 10]}/>
      <CalendarRangeSelect months={[[2024, 12], [2025, 1]]} rangeLimits={[1, 11]}/>
      <CalendarRangeSelect months={[[2024, 12], [2025, 1]]}/>
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
