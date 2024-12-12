import { useReducer } from 'react'

// Reducer
import {
  Actions,
  getInitialState,
  getReducer,
  getSelectedDates, getSelectedRange,
} from 'components/Calendar/hooks/useRangeSelect/reducer'

// Utils
import mapper from 'components/Calendar/hooks/utils/yearsMapper'

// Types
import {
  CalendarRangeSelectProps,
  CalendarResponse,
} from 'components/Calendar/hooks/types'
import dayjs from 'dayjs'


function useRangeSelect({ months, rangeLimits }: CalendarRangeSelectProps): CalendarResponse {
  const [state, dispatch] = useReducer(
    getReducer(months, rangeLimits),
    months,
    getInitialState,
  )

  const { dates } = state

  const selected = getSelectedDates(dates)
  const [start, end] = getSelectedRange(dates)

  const reset = () => {
    dispatch({ type: Actions.RESET })
  }

  const onClick = (date: string) => () => {
    if (!start) {
      dispatch({ type: Actions.SET_SEALED_START, payload: date })
    }

    if (start && !end) {
      dispatch({ type: Actions.SET_SEALED_END, payload: date })
    }
  }

  const onMouseEnter = (date: string) => () => {
    const year = dayjs(date).format('YYYY')
    const month = dayjs(date).format('MM')

    if(!dates?.[year]?.[month]?.[date].sameMonth) {
      return void 0
    }

    if (!start) {
      dispatch({ type: Actions.SET_START, payload: date })
    }

    if (start && !end) {
      dispatch({ type: Actions.SET_END, payload: date })
    }
  }

  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const onMouseLeave = (_date: string) => () => {
    if(!start && !end) {
      dispatch({ type: Actions.RESET })
    }
  }

  return {
    dates: mapper(dates, onClick, onMouseEnter, onMouseLeave),
    selected,
    reset,
  }
}

export default useRangeSelect
