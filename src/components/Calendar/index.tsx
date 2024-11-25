import dayjs from 'dayjs'

// Components
import Selected from 'components/Calendar/Selected'

// Hooks
import useCalendar from 'components/Calendar/hooks/useCalendar'

// Styled
import { Wrapper, Day, Container, Reset, Header } from './styled.ts'

interface Props {
  year: number
  month: number
  mode: 'single' | 'range'
}

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
      <Wrapper>
        {dates.map(({ date, selected, sameMonth, ...rest }, index) => (
          <Day
            key={`${index}-day`}
            $selected={selected}
            $disabled={!sameMonth}
            {...rest}
          >
            {dayjs(date).format('D')}
          </Day>
        ))}
      </Wrapper>
    </Container>
  )
}

export default Calendar
