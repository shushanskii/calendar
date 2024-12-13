import getDays from 'components/Calendar/hooks/useCalendar/reducer/getDays/index.ts'

describe('useCalendar', () => {
  describe('reducer', () => {
    describe('getDays', () => {
      it("should throw an error when year and month are not numbers", () => {
        // @ts-expect-error: 'invalid type'
        expect(() => getDays("2022", 1)).toThrow(/Year and month values must be numbers./);
        // @ts-expect-error: 'invalid type'
        expect(() => getDays(2022, "January")).toThrow(/Year and month values must be numbers./);
      });

      it("should throw an error when given invalid year or month", () => {
        expect(() => getDays(2022, 13)).toThrow(/Invalid year or month value./);
        expect(() => getDays(1800, -1)).toThrow(/Invalid year or month value./);
      });
    })
  })
})
