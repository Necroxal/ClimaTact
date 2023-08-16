import { useState } from "react";

export const WheatherApp = () => {

	const url = 'https://api.openweathermap.org/data/2.5/weather';
	const API_KEY = '605507acf87117e111e54a3ab5238541';
	const difKelvin = 273.15;

	const [city, setCity] = useState('');
	const [datawheater, setdataWheather] = useState(null);

	const handleChangeCity = (e) => {
		setCity(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (city.length > 0) fetchWheater();
	}

	const fetchWheater = async () => {
		try {
			const response = await fetch(`${url}?q=${city}&appid=${API_KEY}`);
			const data = await response.json();
			setdataWheather(data);


		} catch (error) {
			console.error('The following problem has occurred: ', error);
		}
	}

	return (
		<div className="container">
			<h1>ClimaTact</h1>

			<form onSubmit={handleSubmit}>
				<input type="text" value={city} onChange={handleChangeCity} />
				<button type="submit">Search Weather </button>
			</form>
			{
				datawheater && (
					<div>
						<h2>{datawheater.name}</h2>
						<p>Temperature: {parseInt(datawheater?.main?.temp - difKelvin)}°C</p>
						´<p>Weather condition: {datawheater.weather[0].description}</p>
						<img src={ `https://openweathermap.org/img/wn/${datawheater.weather[0].icon}@2x.png`}/>
					</div>
				)
			}
		</div>
	)
}
