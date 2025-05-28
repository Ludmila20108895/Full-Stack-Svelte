import { VITE_OPENWEATHER_API_KEY } from '$env/static/private';
const API_KEY = VITE_OPENWEATHER_API_KEY;

export async function getWeather(lat: number, lon: number) {
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

	const res = await fetch(url);
	if (!res.ok) {
		throw new Error('Failed to fetch weather');
	}
	const data = await res.json();

	return {
		temperature: data.main.temp,
		description: data.weather[0].description,
		icon: data.weather[0].icon
	};
}
