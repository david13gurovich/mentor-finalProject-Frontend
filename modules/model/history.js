import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from "next-redux-wrapper";
//import { toRaw } from 'vue';


export const historySlice = createSlice({
  name: 'history',
  initialState: {
    historyState: {},
  },
  reducers: {
    setHistoryState: (state, action) => {
      console.log("Action", action);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // {userName: [event1, event2, ...], userName2: [event1, event2, ...]}
      Object.entries(action.payload).forEach(([key, value]) => {
        mappedVals = value.map((element) => {element.history = true;element.id = "his"; element.editable = false; return element;})
        state[key] = mappedVals;
      });
    },
    addHistory: (state, action) => {
        console.log("Action", action);
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        // {user: userName, event: event}
        action.payload.event.history = true;
        action.payload.event.id = "his";
        state[action.payload.user].push(action.payload.event);
    },
    addAllHistory: (state, action) => {
      console.log("Action", action);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // {user: userName, events: [ event1, event2, ...]}
      const newVals = action.payload.events.forEach((element) => {element.history = true;element.id = "his";element.editable = false; return element;})
      state[action.payload.user] = state[action.payload.user].concat(newVals);
  },
    newHistory: (state, action) => {
        console.log("Action", action);
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        // userName
        console.log("History state", state.historyState);
        state[action.payload] = [];
        // const newVals = [];
        // const newHistory = structuredClone(toRaw(state.historyState));
        // newHistory[action.payload] = newVals;
        // state.historyState = newHistory;
    }
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      console.log("HYDRATE", action);
      if(action.payload.history.historyState === {}) {
        return{
          ...state,
        }
      }
      return {
        ...state,
        ...action.payload.history,
      };
    });
  },
})

// Action creators are generated for each case reducer function
export const { setHistoryState, addHistory, newHistory, addAllHistory } = historySlice.actions

export const selectHistoryState = (state) => state.history.historyState;


export default historySlice.reducer