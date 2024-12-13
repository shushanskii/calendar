import dayjs from 'dayjs'

// Styled
import { Day } from 'components/Calendar/layout/Days/styled'

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
      {dates.map(({ date, selected, highlighted, sameMonth, ...rest }, index) => (
        <Day
          key={`${index}-day`}
          $selected={selected}
          $disabled={!sameMonth}
          $selectedFirst={start === date}
          $selectedLast={end === date}
          $highlighted={highlighted}
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
