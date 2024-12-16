import { animated, useSpring } from '@react-spring/three'
import usePrevious from 'components/Chart/usePrev'

interface Props {
  y: number
}

function Square({ y }: Props) {
  const prevY = usePrevious<number>(y)

  const { position } = useSpring({
    from: {
      position: [0, prevY ?? y, 0],
    },
    to: {
      position: [0, y, 0],
    },
    config: { duration: 1000 },
    reset: true,
  })

  return (
    <animated.mesh
      position={position.to((x, y, z) => [x, y, z])}
    >
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color={'red'} />
    </animated.mesh>
  )
}

export default Square;
