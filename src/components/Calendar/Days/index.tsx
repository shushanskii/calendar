import dayjs from 'dayjs'

// Styled
import { Day } from 'components/Calendar/Days/styled.ts'

// Types
import { Date } from 'components/Calendar/hooks/useCalendar/types'

interface Props {
  dates: Date[]
  width: number
  height: number
  start: string | undefined
  end: string | undefined
}

function Days({ dates, width, height, start, end }: Props) {
  return (
    <>
      {dates.map(({ date, selected, sameMonth, ...rest }, index) => (
        <Day
          key={`${index}-day`}
          $selected={selected}
          $disabled={!sameMonth}
          $selectedFirst={start === date}
          $selectedLast={end === date}
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
