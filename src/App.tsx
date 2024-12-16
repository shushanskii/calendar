import styled from 'styled-components'

// Styled
import GlobalStyle from 'styles/GlobalStyle.ts'
import Chart from 'components/Chart'

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Chart />
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
