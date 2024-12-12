// Components
import Selected from 'components/Calendar/layout/Selected'
import Days from 'components/Calendar/layout/Days'

// Hooks
import useRangeSelect from 'components/Calendar/hooks/useRangeSelect'

// Const
import { DATE_HEIGHT, DATE_WIDTH } from 'components/Calendar/consts'

// Styled
import { Container, Reset, Header, Month, Wrapper } from '../styled.ts'


interface Props {
  months: [number, number][]
  rangeLimits?: [number, number]
  singleSelect?: boolean
}

function CalendarRangeSelect({ months, rangeLimits, singleSelect = true }: Props) {
  const { dates, reset, selected } = useRangeSelect({ months, rangeLimits, singleSelect })

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

export default CalendarRangeSelect
