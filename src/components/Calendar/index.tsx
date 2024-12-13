// Components
import Selected from 'components/Calendar/layout/Selected'
import Days from 'components/Calendar/layout/Days'

// Hooks
import useCalendar from 'components/Calendar/hooks/useCalendar'

// Types
import { CalendarProps } from 'components/Calendar/hooks/useCalendar/types'

// Styled
import { Container, Reset, Header, Month, Wrapper } from './styled.ts'

export const DATE_WIDTH = 50
export const DATE_HEIGHT = 50

function Calendar({ months, rangeLimits, onComplete, onReset, singleSelect }: CalendarProps) {
  const { dates, reset, selected } = useCalendar({
    months,
    rangeLimits,
    singleSelect,
    onReset,
    onComplete,
  })

  const handleClick = () => {
    reset()
  }

  return (
    <Container>
      <Header>
        <Reset onClick={handleClick}>reset</Reset>
        {selected && <Selected selected={selected} />}
      </Header>
      <Wrapper>
        {dates.map(_dates => _dates.map((__dates, index) => (
          <Month
            width={7 * DATE_WIDTH}
            height={5 * DATE_HEIGHT}
            key={`${index}-calendar`}
          >
            <Days
              dates={__dates}
              width={DATE_WIDTH}
              height={DATE_HEIGHT}
              start={selected[0]}
              end={selected[selected.length - 1] ?? selected[0]}
            />
          </Month>
        )))}
      </Wrapper>
    </Container>
  )
}

export default Calendar
