var platform = new H.service.Platform({
    'apikey': 'Gvt4u2dCQBUQ75vUqhvQEbxWh5rkuP6146_zDuIhVag'
});

var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,{
    zoom: 15,
    center: { lat: 8, lng: 38 }
});

var svgMarkup = '<svg width="24" height="24" ' +
'xmlns="http://www.w3.org/2000/svg">' +
'<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
'height="22" /><text x="12" y="18" font-size="12pt" ' +
'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
'fill="white">H</text></svg>';

var icon = new H.map.Icon(svgMarkup)

let url = `ws://${window.location.host}/ws/socket-server/`
const mapSocket = new WebSocket(url)

mapSocket.onmessage = function(e){
    let data = JSON.parse(e.data)

    if(data.type == 'new_insertion'){
        coords = {lat: data.message['latitude'], lng: data.message['longitude']}
        marker = new H.map.Marker(coords, {icon: icon});
        map.addObject(marker);
        map.setCenter(coords);
    }
    
}

function ascii_to_hex(str){
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n ++) {
        var hex = Number(str.charCodeAt(n)).toString(16);
        arr1.push(hex);
    }
    return arr1.join('');
}

fetch('/static/data.txt')
    .then(response => response.text())
    .then(text => {
        var lines = text.split('\n');

        var line = 0
        const inst = setInterval(() => {
            if(line == lines.length) clearInterval(inst)

            mapSocket.send(JSON.stringify({"message": ascii_to_hex(lines[line])}));
            line++;
        }, 2000);
})