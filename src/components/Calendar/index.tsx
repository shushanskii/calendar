// Components
import Selected from 'components/Calendar/layout/Selected'
import Days from 'components/Calendar/layout/Days'

// Hooks
import { useCalendar } from 'components/Calendar/hooks/useCalendar'

// Const
import { DATE_HEIGHT, DATE_WIDTH } from 'components/Calendar/consts'

// Types
import { RangeSelect, SingleSelect } from 'components/Calendar/hooks/useCalendar/types'

// Styled
import { Wrapper, Container, Reset, Header } from './styled.ts'

interface SingleSelectProps {
  year: number
  month: number
}

export function CalendarSingleSelect({ year, month }: SingleSelectProps) {
  const { dates, reset, selected } = useCalendar<SingleSelect>({ year, month })

  const handleClick = () => {
    reset()
  }

  return (
    <Container>
      <Header>
        <Reset onClick={handleClick}>reset</Reset>
        {selected && <Selected<SingleSelect> selected={selected} />}
      </Header>
      <Wrapper width={7 * DATE_WIDTH} height={5 * DATE_HEIGHT}>
        <Days
          dates={dates}
          width={DATE_WIDTH}
          height={DATE_HEIGHT}
          start={selected}
          end={selected}
        />
      </Wrapper>
    </Container>
  )
}

interface RangeSelectProps {
  year: number
  month: number
  minRange: number
  maxRange: number
}

export function CalendarRangeSelect({ year, month, minRange, maxRange }: RangeSelectProps) {
  const { dates, reset, selected } = useCalendar<RangeSelect>({ year, month, minRange, maxRange })

  const handleClick = () => {
    reset()
  }

  return (
    <Container>
      <Header>
        <Reset onClick={handleClick}>reset</Reset>
        {selected && <Selected<RangeSelect> selected={selected} />}
      </Header>
      <Wrapper width={7 * DATE_WIDTH} height={5 * DATE_HEIGHT}>
        <Days
          dates={dates}
          width={DATE_WIDTH}
          height={DATE_HEIGHT}
          start={selected?.start}
          end={selected?.end ?? selected?.start}
        />
      </Wrapper>
    </Container>
  )
}
