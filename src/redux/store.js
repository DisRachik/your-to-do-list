import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { todosSlice } from "./todos/todosSlice";

const todoPersistConfig = {
	key: "todo",
	storage,
	blacklist: ["filter"],
};

export const store = configureStore({
	reducer: {
		todos: persistReducer(todoPersistConfig, todosSlice.reducer),
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
