import type { LatLngTuple } from 'leaflet';

export function toLatLng(str: string): LatLngTuple {
	const arr = str
		.split(',')
		.map((i) => Number(i.trim()))
		.filter((i) => !isNaN(i));

	if (arr.length !== 2) {
		throw new Error('Invalid format.');
	}

	const [lat, lng] = arr;

	if (!(lat >= -90 && lat <= 90)) {
		throw new Error('Invalid latitude.');
	}

	if (!(lng >= -180 && lng <= 180)) {
		throw new Error('Invalid longitude.');
	}

	return [lat, lng];
}
