
const velibMap = {
	center: "",
	canvas: "",
	options: {},
	map(){
		map = new google.maps.Map(this.canvas, this.options);
	},
	makeMarker(station){
		const marker = new google.maps.Marker({
			position: new google.maps.LatLng(station.position.lat, station.position.lng),
			map: map,
			title: station.name
		});
		marker.addListener('click', function() {
			    //map.setZoom(20);
			    console.log(station);
			    map.setCenter(marker.getPosition());
			    stationsHandler.stationSelected(station);
			    // currentStation = station; => passé dans stationsHandler.statationSelected.done
			});
		marker.setMap(map);

	},
	init(lat, lng, canvas, zoom){
		this.center = new google.maps.LatLng(lat, lng);
		this.canvas = document.getElementById(canvas);
		this.options = {center: this.center, zoom: zoom};
	}
}