/* ======================================================
                    MAP.JS
====================================================== */


let travelMap = null;
let travelMarker = null;
let placeMarkers = [];


/* ======================================================
                    LOAD MAP
====================================================== */

async function loadMap(destination) {

    try {

        const response = await fetch(
            `/map?destination=${encodeURIComponent(destination)}`
        );

        const data = await response.json();

        if (!data.success) {

            console.log("Map location not found.");

            return;

        }

        createMap(
            data.lat,
            data.lon,
            data.name
        );

    }

    catch (err) {

        console.error("Map Error:", err);

    }

}


/* ======================================================
                    CREATE MAP
====================================================== */

function createMap(lat, lon, place) {

    lat = parseFloat(lat);
    lon = parseFloat(lon);

    if (travelMap) {

        travelMap.remove();

    }

    travelMap = L.map("travelMap").setView([lat, lon], 13);

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "© OpenStreetMap Contributors",
            maxZoom: 19
        }
    ).addTo(travelMap);

    travelMarker = L.marker([lat, lon])
        .addTo(travelMap)
        .bindPopup(`
            <b>📍 ${place}</b><br>
            Destination
        `)
        .openPopup();

    // Wait until map renders properly
    setTimeout(() => {

        travelMap.invalidateSize();

        // Load hotels, restaurants and tourist places
        loadPlaces(place);

    }, 300);

}


/* ======================================================
                    LOAD PLACES
====================================================== */

async function loadPlaces(destination) {

    try {

        const response = await fetch(
            `/places?destination=${encodeURIComponent(destination)}`
        );

        const data = await response.json();

        if (!data.success) return;

        placeMarkers.forEach(marker => {

            travelMap.removeLayer(marker);

        });

        placeMarkers = [];

        data.places.forEach(place => {

            let iconHtml = `
                <i class="fa-solid fa-location-dot"
                style="color:red;font-size:20px;"></i>
            `;

            if(place.type==="hotel"){

                iconHtml = `
                    <i class="fa-solid fa-hotel"
                    style="color:#2563eb;font-size:20px;"></i>
                `;

            }

            else if(place.type==="restaurant"){

                iconHtml = `
                    <i class="fa-solid fa-utensils"
                    style="color:#f97316;font-size:20px;"></i>
                `;

            }

            else if(place.type==="tourist"){

                iconHtml = `
                    <i class="fa-solid fa-camera"
                    style="color:#16a34a;font-size:20px;"></i>
                `;

            }

            const customIcon = L.divIcon({

                html: iconHtml,

                className: "custom-map-icon",

                iconSize: [30,30],

                iconAnchor:[15,30]

            });

            const marker = L.marker(
                [place.lat, place.lon],
                {
                    icon: customIcon
                }
            ).addTo(travelMap);

            marker.bindPopup(`

                <div style="min-width:220px">

                    <h6>${place.name}</h6>

                    <hr>

                    <strong>Category:</strong>

                    ${place.type}

                </div>

            `);

            placeMarkers.push(marker);

        });

        console.log("Places Loaded :", placeMarkers.length);

    }

    catch(err){

        console.error(err);

    }

}