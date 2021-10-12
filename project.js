const url = 'https://private-3923c4-santandercoders809.apiary-mock.com/stations';

// get data asynchronously from the given API
const getData = async() => {
	try {
		const response = await fetch(url);
		const json = await response.json();
		return json.estacoes;
	}
	catch (error) {
		throw new Error('Unable to reach API', error);
	}
}

// group data on new array by criteria given
const groupBy = (stationArray, criteria) => {
	return stationArray.reduce((lineArray, station) => {
		let line = station[criteria].replace(/-/g, ' ').split(' ');
		let key = '';
		if (!line[1]) key = line[0];
		else key = `${line[0]}-${line[1]}`;
		if (!lineArray[key]) lineArray[key] = [];
		lineArray[key].push(station);
		return lineArray;
	}, {});
}

// show on screen results of groupBy() function on data taken from API
const showGroupDataResults = async() => {
	try {
		const data = await getData();
		const result = groupBy(data['estacao'], '_linha');
		console.log(result);
		return result;
	}
	catch (error) {
		throw new Error('Unable to reach API', error);
	}
}

showGroupDataResults();