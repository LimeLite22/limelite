export interface IMessage {
	id: string;
	message: string;
	time: string;
	person: boolean;
	images?: {
		id: string;
		url: string;
		file: File;
	}[];
}
