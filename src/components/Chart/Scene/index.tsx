import { Line, PerspectiveCamera } from '@react-three/drei'
import Space from 'src/components/Chart/Scene/Space'
import { useEffect, useState } from 'react'
import useGetValue from 'components/Chart/hooks/useGetValue'

const DEFAULT_Z = -50

function Scene() {
  const y = useGetValue(0)
  const [scale, setScale] = useState(DEFAULT_Z)

  useEffect(() => {
    setScale( Math.floor(Math.abs(y) / Math.abs(DEFAULT_Z) + 1))
  }, [y])

  return (
    <>
      <PerspectiveCamera
        makeDefault={true}
        position={[0, 0, 0]}
        fov={100}
        far={3000}
        near={0.1}
      />

      <directionalLight
        color={'white'}
        intensity={3}
        position={[0, 0, 1]}
        rotation={[0, 0, 0]}
      />

      <Line
        color={'black'}
        points={
          [[-50, -50, 0], [-50, 50, 0], [50, 50, 0], [50, -50, 0], [-50, -50, 0]]
        }
      />

      <Space z={scale * DEFAULT_Z} y={y} />
    </>
  )
}

export default Scene
