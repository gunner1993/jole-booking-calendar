import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { Event } from "../../src/components/Calendar/CalendarTypes";

export type Events = {
  [key: string]: {
    [key: string]: Event[];
  };
};
export interface EventsData {
  events: Events;
}

const initialState: EventsData = {
  events: {},
};

export const events = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Events>) => {
      state.events = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(PURGE, (state, action) => {
      state.events = {};
    });
  },
});

export const { setEvents } = events.actions;

export default events.reducer;
