import { rest } from "msw";
import { MOCK_EVENT_URL } from "../views/EventList/constants";
import { mockEvents } from "./mockData";

export const apiHandlers = [
  // Mock GET request to the mock event URL
  rest.get(MOCK_EVENT_URL, (_, res, ctx) => {
    // Return a successful response with mock event data
    return res(
      ctx.json({
        status_code: 200,
        data: mockEvents,
      })
    );
  }),
];
