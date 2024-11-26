// Components
import Selected from 'components/Calendar/Selected'
import Days from 'components/Calendar/Days'

// Hooks
import useCalendar from 'components/Calendar/hooks/useCalendar'

// Styled
import { Wrapper, Container, Reset, Header } from './styled.ts'
import { RangeSelect, SingleSelect } from 'components/Calendar/hooks/useCalendar/types'

interface Props {
  year: number
  month: number
  mode: 'single' | 'range'
}

const DATE_WIDTH = 50
const DATE_HEIGHT = 50

function Calendar<T>({ year, month, mode }: Props) {
  const { dates, reset, selected } = useCalendar<T>(year, month, mode)

  const handleClick = () => {
    reset()
  }

  return (
    <Container>
      <Header>
        <Reset onClick={handleClick}>reset</Reset>
        {selected && <Selected<T> selected={selected} />}
      </Header>
      <Wrapper width={7 * DATE_WIDTH} height={5 * DATE_HEIGHT}>
        <Days
          dates={dates}
          width={DATE_WIDTH}
          height={DATE_HEIGHT}
          start={(selected as RangeSelect)?.start ?? (selected as SingleSelect)}
          end={(selected as RangeSelect)?.end ?? (selected as SingleSelect)}/>
      </Wrapper>
    </Container>
  )
}

export default Calendar
