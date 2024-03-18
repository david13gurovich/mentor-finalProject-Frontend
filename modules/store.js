import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './model/auth'
import { historySlice } from './model/history';
import { createWrapper } from "next-redux-wrapper";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
    [historySlice.name]: historySlice.reducer,
});

const makeConfiguredStore = () =>
    configureStore({
        reducer: rootReducer,
        devTools: true,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
        }),
    });

export const makeStore = () => {
    const isServer = typeof window === "undefined";
    if (isServer) {
        return makeConfiguredStore();
    } else {
        // we need it only on client side
        const persistConfig = {
        key: "nextjs",
        whitelist: ["auth", "history"], // make sure it does not clash with server keys
        storage,
        };
        const persistedReducer = persistReducer(persistConfig, rootReducer);
        let store = configureStore({
        reducer: persistedReducer,
        devTools: process.env.NODE_ENV !== "production",
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
            }),
        });
        store.__persistor = persistStore(store); // Nasty hack
        return store;
    }
};

export const wrapper = createWrapper(makeStore);