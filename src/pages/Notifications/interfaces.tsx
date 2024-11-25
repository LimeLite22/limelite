export interface INotification {
	id: string;
	time: number;
	sender: string;
	isRead: boolean;
	text: string;
	hyperlink?: string;
}
