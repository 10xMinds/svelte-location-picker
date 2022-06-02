import type * as Leaflet from 'leaflet';
import type { LatLngTuple, LeafletMouseEvent, Map as MapType } from 'leaflet';

export type ButtonClickEvent = Event & { currentTarget: EventTarget & HTMLButtonElement };

export interface MapEvent {
	leaflet: typeof Leaflet;
	map: MapType;
}

export interface PickLocationEvent {
	event: LeafletMouseEvent;
	picked: LatLngTuple;
}
