import styled from 'styled-components'

// Components
import Calendar from 'components/Calendar'

// Styled
import GlobalStyle from 'styles/GlobalStyle.ts'

function App() {

  const handleComplete = (range: [string, string]) => console.log('range', range)

  const handleReset = () => console.log('reset')

  return (
    <Container>
      <GlobalStyle />
      <Calendar months={[[2024, 12], [2025, 1]]} rangeLimits={[5, 10]} onComplete={handleComplete} singleSelect={false} onReset={handleReset}/>
      <Calendar months={[[2024, 12], [2025, 1]]} rangeLimits={[1, 11]} onComplete={handleComplete} singleSelect={false} onReset={handleReset} />
      <Calendar months={[[2024, 12]]} onComplete={handleComplete} onReset={handleReset}/>
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
