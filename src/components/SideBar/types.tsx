export const WELCOME = "Welcome";
export const NEW_REQUEST = "New Request";
export const PROJECTS = "Projects";
export const LEARN = "Learn";
export const ADD_ONS = "Add ons";
export const INSPIRATION = "Inspiration";
export const NOTIFICATIONS = "Notifications";
export const SETTINGS = "Settings";
export const SUPPORT = "Support";

export type selectedPages =
	| typeof WELCOME
	| typeof NEW_REQUEST
	| typeof PROJECTS
	| typeof LEARN
	| typeof ADD_ONS
	| typeof NOTIFICATIONS
	| typeof SETTINGS
	| typeof SUPPORT
	| typeof INSPIRATION;
