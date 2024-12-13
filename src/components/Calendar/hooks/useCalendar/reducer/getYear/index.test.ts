import getYear from 'components/Calendar/hooks/useCalendar/reducer/getYear'

describe('useCalendar', () => {
  describe('reducer', () => {
    describe('getYear', () => {
      it("should throw an error when given non-number year or month", () => {
        const invalidYearType = [["2022", 1]];  // Year as string
        const invalidMonthType = [[2022, "01"]];  // Month as string

        // @ts-expect-error: 'invalid type'
        expect(() => getYear(invalidYearType)).toThrow('Year and month values must be numbers.');
        // @ts-expect-error: 'invalid type'
        expect(() => getYear(invalidMonthType)).toThrow('Year and month values must be numbers.');
      });

      it("should throw an error when given invalid year or month", () => {
        const invalidMonths = [[2022, 13], [2022, 15]];  // Months beyond valid range
        const invalidYears = [[-1, 1], [NaN, 1]];  // Invalid year values

        // @ts-expect-error: 'invalid type'
        expect(() => getYear(invalidMonths)).toThrow('Invalid year or month value.');
        // @ts-expect-error: 'invalid type'
        expect(() => getYear(invalidYears)).toThrow('Invalid year or month value.');
      });

      it("should return correct object when given valid year and month", () => {
        const validInput: [number, number][] = [[2022, 1], [2023, 2]]; // Valid year and month pairs

        const result = getYear(validInput);

        // Validate the result
        // Here, we're just checking the existence of the years and months in the result
        // Depending on the definition of your getDays function, you may want to add more specific checks
        expect(result).toHaveProperty('2022');
        expect(result['2022']).toHaveProperty('01');
        expect(result).toHaveProperty('2023');
        expect(result['2023']).toHaveProperty('02');
      });
    })
  })
})
