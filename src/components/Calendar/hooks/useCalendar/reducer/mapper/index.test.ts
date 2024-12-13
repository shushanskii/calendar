import mapper from 'components/Calendar/hooks/useCalendar/reducer/mapper'

// Utils
import getYear from 'components/Calendar/hooks/useCalendar/reducer/getYear'

// Types
import { Years } from 'components/Calendar/hooks/useCalendar/types'

describe('useCalendar', () => {
  describe('reducer', () => {
    describe('mapper', () => {
      it('should return a correct structure', () => {
        const years: Years = getYear([[2000, 1]])

        const onClick = jest.fn()
        const onMouseEnter = jest.fn()
        const onMouseLeave = jest.fn()

        const result = mapper(years, onClick, onMouseEnter, onMouseLeave)

        expect(result[0][0][0]).toEqual({
          date: '1999-12-27',
          start: false,
          end: false,
          highlighted: false,
          selected: false,
          sameMonth: false,
          onClick: undefined,
          onMouseEnter: undefined,
          onMouseLeave: undefined,
        })

        expect(result[0][0][20]).toEqual({
          date: '2000-01-16',
          start: false,
          end: false,
          highlighted: false,
          selected: false,
          sameMonth: true,
          onClick: undefined,
          onMouseEnter: undefined,
          onMouseLeave: undefined,
        })

        expect(result[0][0][41]).toEqual({
          date: '2000-02-06',
          start: false,
          end: false,
          highlighted: false,
          selected: false,
          sameMonth: false,
          onClick: undefined,
          onMouseEnter: undefined,
          onMouseLeave: undefined,
        })
      })
    })
  })
})
