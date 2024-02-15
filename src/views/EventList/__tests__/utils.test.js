import { transformResponseData, isEventDisabled } from '../utils';

describe('utils', () => {
  describe('transformResponseData', () => {
    const selectedEvents = [{ id: 1, start_time: new Date('2021-09-01T09:00:00Z'), end_time: new Date('2021-09-01T11:00:00Z') }];
    const response = [
      { id: 1, start_time: '2021-09-01T09:00:00Z', end_time: '2021-09-01T11:00:00Z' },
      { id: 2, start_time: '2021-09-01T12:00:00Z', end_time: '2021-09-01T13:00:00Z' }
    ];

    it('filters out selected events and converts string dates to Date objects', () => {
      const result = transformResponseData(selectedEvents, response);
      expect(result).toEqual([
        {
          id: 2,
          start_time: new Date('2021-09-01T12:00:00Z'),
          end_time: new Date('2021-09-01T13:00:00Z')
        }
      ]);
    });
  });

  describe('isEventDisabled', () => {
    const selectedEvents = [
      { id: 1, start_time: new Date('2021-09-01T09:00:00Z'), end_time: new Date('2021-09-01T10:00:00Z') }
    ];

    it('returns true if the event overlaps with selected events', () => {
      const currentEvent = { id: 2, start_time: new Date('2021-09-01T09:30:00Z'), end_time: new Date('2021-09-01T11:00:00Z') };
      const result = isEventDisabled(selectedEvents, currentEvent);
      expect(result).toBe(true);
    });

    it('returns false if the event does not overlap with selected events', () => {
      const currentEvent = { id: 3, start_time: new Date('2021-09-01T11:00:00Z'), end_time: new Date('2021-09-01T12:00:00Z') };
      const result = isEventDisabled(selectedEvents, currentEvent);
      expect(result).toBe(false);
    });
  });
});
