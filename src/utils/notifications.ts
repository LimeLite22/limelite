export const isWithinLast10Hours = (timestamp: number): boolean => {
	if (typeof timestamp !== "number") {
		throw new Error("Invalid timestamp format");
	}

	const dateTime = new Date(timestamp);
	const now = new Date();

	const tenHoursAgo = new Date(now.getTime() - 10 * 60 * 60 * 1000);

	return dateTime >= tenHoursAgo;
};
export const timeAgo = (timestamp: number): string => {
	const dateTime = new Date(timestamp);
	const now = new Date();

	const diffInMilliseconds = now.getTime() - dateTime.getTime();
	const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	const diffInHours = Math.floor(diffInMinutes / 60);
	const diffInDays = Math.floor(diffInHours / 24);

	if (diffInMinutes < 60) {
		return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
	} else if (diffInHours < 24) {
		return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
	} else {
		return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
	}
};

export function getDayOfWeek(timestamp: number) {
	// Перетворюємо мілісекунди в об'єкт Date
	const dateTime = new Date(timestamp);

	// Отримуємо компоненти дати і часу
	const year = dateTime.getFullYear();
	const month = String(dateTime.getMonth() + 1).padStart(2, "0"); // Місяці з нуля
	const day = String(dateTime.getDate()).padStart(2, "0");
	const hours = String(dateTime.getHours()).padStart(2, "0");
	const minutes = String(dateTime.getMinutes()).padStart(2, "0");
	const seconds = String(dateTime.getSeconds()).padStart(2, "0");

	// Формуємо строку у форматі YYYYMMDDHHMMSS
	const dateStr = `${year}${month}${day}${hours}${minutes}${seconds}`;

	// Перевіряємо формат дати
	const regex = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/;
	const match = regex.exec(dateStr);

	if (!match) {
		throw new Error("Неправильний формат дати");
	}

	// Розпаковуємо компоненти дати
	const [, yearPart, monthPart, dayPart, hoursPart, minutesPart, secondsPart] =
		match;

	// Створюємо об'єкт Date для отримання дня тижня
	const formattedDate = new Date(
		`${yearPart}-${monthPart}-${dayPart}T${hoursPart}:${minutesPart}:${secondsPart}`,
	);

	const dayOfWeek = formattedDate.getDay();
	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	return daysOfWeek[dayOfWeek];
}

export function extractFormattedTime(timestamp: number): string {
	// Перевіряємо, чи timestamp є числом
	if (typeof timestamp !== "number") {
		throw new Error("Invalid timestamp format");
	}

	// Перетворюємо timestamp в об'єкт Date
	const date = new Date(timestamp);

	// Форматуємо час
	return date.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true, // або false, в залежності від ваших уподобань
	});
}
