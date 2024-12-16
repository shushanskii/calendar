import { animated, useSpring } from '@react-spring/three'
import usePrevious from 'components/Chart/usePrev'
import Square from 'components/Chart/Scene/Space/Square'
import { Line } from '@react-three/drei'

interface Props {
  y: number
  z: number
}

function Space({ z, y }: Props) {
  const prevZ = usePrevious<number>(z)

  const { position } = useSpring({
    from: {
      position: [0, 0, prevZ ?? z],
    },
    to: {
      position: [0, 0, z],
    },
    config: { duration: 500 },
    reset: true,
  })

  return (
    <animated.mesh
      position={position.to((x, y, z) => [x, y, z])}
    >
      <Line
        color={'black'}
        points={
          [[-50, -50, 0], [-50, 50, 0], [50, 50, 0], [50, -50, 0], [-50, -50, 0]]
      }
      />
      <Square y={y} />
    </animated.mesh>
  )
}

export default Space
