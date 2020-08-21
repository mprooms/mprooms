import days from './days';
import moment from 'moment';

describe("When days are queried", () => {
    let dayValues;
    days.subscribe(x => { dayValues = x });

    it("should return the next 7 days", () => {
        expect(dayValues).toHaveLength(7);
    });
    it("should return the days in a valid format", () => {
        expect(dayValues.every(
            (day) => (
                moment(day, 'YYYY-MM-DD', true).isValid()
            )
        )).toEqual(true);
    });
});
