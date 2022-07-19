import type * as Leaflet from 'leaflet';

export type ButtonClickEvent = Event & { currentTarget: EventTarget & HTMLButtonElement };

export interface MapEvent {
	leaflet: typeof Leaflet;
	map: Leaflet.Map;
}

export interface PickLocationEvent {
	event: Leaflet.LeafletMouseEvent;
	marker: Leaflet.Marker;
	picked: Leaflet.LatLngTuple;
}
