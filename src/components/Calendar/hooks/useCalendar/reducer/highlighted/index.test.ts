import dayjs from 'dayjs'

// Utils
import highlighted from 'components/Calendar/hooks/useCalendar/reducer/highlighted'

describe('useCalendar', () => {
  describe('reducer', () => {
    describe('highlighted', () => {

      it('should return true when date is within the range', () => {
        const start = dayjs().format('YYYY-MM-DD')  // Today's date as start date
        const rangeLimits: [number, number] = [1, 3]  // Past and future range is 1 to 3 days
        const date = dayjs().add(2, 'day').format('YYYY-MM-DD')  // Date 2 days in future

        const result = highlighted(start, rangeLimits, date)

        expect(result).toEqual(true)
      })

      it('should return false when date is out of the range', () => {
        const start = dayjs().format('YYYY-MM-DD')  // Today's date as start date
        const rangeLimits: [number, number] = [1, 3]  // Past and future range is 1 to 3 days
        const date = dayjs().add(4, 'day').format('YYYY-MM-DD')  // Date 4 days in future

        const result = highlighted(start, rangeLimits, date)

        expect(result).toEqual(false)
      })

    })
  })
})

