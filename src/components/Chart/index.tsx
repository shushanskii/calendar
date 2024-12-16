import { Canvas } from '@react-three/fiber'
import styled from 'styled-components'

import Scene from 'components/Chart/Scene'

function Chart() {
  return (
    <CanvasContainer>
      <Canvas id={'canvas'}>
        <Scene />
      </Canvas>
    </CanvasContainer>
  )
}

const CanvasContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

export default Chart
