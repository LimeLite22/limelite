import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { generateUniqueId } from "utils/generateId";

import type { INotification } from "./../../pages/Notifications/interfaces";

const initialState: {
	list: INotification[];
} = {
	list: [
		{
			id: generateUniqueId(),
			time: 20240723073444,
			sender: "LimeLite",
			isRead: false,
			text: "Clay just added a video on your behalf",
		},
		{
			id: generateUniqueId(),
			time: 20240723073444,
			sender: "LimeLite",
			isRead: true,
			text: "Clay just added a video on your behalf",
		},
		{
			id: generateUniqueId(),
			time: 20240723073444,
			sender: "LimeLite",
			isRead: false,
			text: "Clay just added a video on your behalf",
			hyperlink: "https://www.google.com",
		},
		{
			id: generateUniqueId(),
			time: 20240722073444,
			sender: "LimeLite",
			isRead: false,
			text: "Clay just added a video on your behalf",
		},
		{
			id: generateUniqueId(),
			time: 20240722073444,
			sender: "LimeLite",
			isRead: true,
			text: "Clay just added a video on your behalf",
		},

		{
			id: generateUniqueId(),
			time: 20240722073444,
			sender: "LimeLite",
			isRead: false,
			text: "Clay just added a video on your behalf",
		},

		{
			id: generateUniqueId(),
			time: 20240722073444,
			sender: "LimeLite",
			isRead: false,
			text: "Clay just added a video on your behalf",
		},
		{
			id: generateUniqueId(),
			time: 20240722073444,
			sender: "LimeLite",
			isRead: false,
			text: "Clay just added a video on your behalf",
		},
		{
			id: generateUniqueId(),
			time: 20240722073444,
			sender: "LimeLite",
			isRead: false,
			text: "Video Title Changed successfully",
		},
		{
			id: generateUniqueId(),
			time: 20240722073444,
			sender: "LimeLite",
			isRead: false,
			text: "Clay just added a video on your behalf",
		},
		{
			id: generateUniqueId(),
			time: 20240722073444,
			sender: "LimeLite",
			isRead: false,
			text: "Clay just added a video on your behalf",
		},
	],
};
const notificationsReducer = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		setNotifications: (state, action: PayloadAction<any>) => {
			state.list = action.payload;
		},
		readNotification: (state, action: PayloadAction<string>) => {
			state.list = state.list.map((notification) => {
				if (notification.id === action.payload) {
					return {
						...notification,
						isRead: true,
					};
				}
				return notification;
			});
		},
		markAllAsRead: (state) => {
			state.list = state.list.map((notification) => {
				return {
					...notification,
					isRead: true,
				};
			});
		},
	},
});

export const { setNotifications, readNotification, markAllAsRead } =
	notificationsReducer.actions;
export const selectNotifications = (state: any) => state.notifications.list;
export const selectUnreadNotificationsNumber = (state: any) => {
	return state.notifications.list.filter((notification: INotification) => {
		return !notification.isRead;
	}).length;
};

export default notificationsReducer.reducer;