import { useEffect } from 'react'
import { useImmerReducer } from 'use-immer'
import dayjs from 'dayjs'

// Reducer
import {
  Actions,
  getInitialState,
  getReducer,
} from 'components/Calendar/hooks/useCalendar/reducer'
import getSelectedRange from 'components/Calendar/hooks/useCalendar/reducer/getSelectedRange'
import getSelectedDates from 'components/Calendar/hooks/useCalendar/reducer/getSelectedDates'

// Utils
import mapper from 'components/Calendar/hooks/useCalendar/reducer/mapper'

// Types
import {
  CalendarProps,
  CalendarResponse,
} from 'components/Calendar/hooks/useCalendar/types'

function useRangeSelect({ months, rangeLimits, singleSelect, onComplete, onReset }: CalendarProps): CalendarResponse {
  const [state, dispatch] = useImmerReducer(
    getReducer(months, singleSelect ? undefined : rangeLimits),
    getInitialState(months),
  )

  const { dates } = state
  const selected = getSelectedDates(dates)
  const [start, end] = getSelectedRange(dates)

  useEffect(() => {
    if (start?.date && end?.date && onComplete) {
      onComplete([start.date, end.date])
    }
  }, [start?.date, end?.date])

  const reset = () => {
    dispatch({ type: Actions.RESET })

    if (onReset) {
      onReset()
    }
  }

  const onClick = (date: string) => () => {
    if (singleSelect && !start && !end) {
      dispatch({ type: Actions.SET_SEALED_START, payload: date })
      dispatch({ type: Actions.SET_SEALED_END, payload: date })
      return void 0
    }

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

    if (!dates?.[year]?.[month]?.[date].sameMonth) {
      return void 0
    }

    if (singleSelect && !start && !end) {
      dispatch({ type: Actions.SET_START, payload: date })
      dispatch({ type: Actions.SET_END, payload: date })
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
    if (!start && !end) {
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
