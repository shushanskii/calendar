import dayjs from 'dayjs'

// Styled
import { Day } from 'components/Calendar/Days/styled.ts'

// Types
import { Date } from 'components/Calendar/hooks/useCalendar/types'

interface Props {
  dates: Date[]
  width: number
  height: number
}

function Days({ dates, width, height }: Props) {
  return (
    <>
      {dates.map(({ date, selected, sameMonth, ...rest }, index) => (
        <Day
          key={`${index}-day`}
          $selected={selected}
          $disabled={!sameMonth}
          width={width}
          height={height}
          {...rest}
        >
          {dayjs(date).format('D')}
        </Day>
      ))}
    </>
  )
}

export default Days
