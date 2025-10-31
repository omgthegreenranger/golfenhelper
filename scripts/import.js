//temporary import of sample data
// import json from "../test-data/course-data.json" with { type: 'json' };

export default function NormalizeCourse(json) {
    const data = json.elements;

    // create the base Course data
    let course = []

    // create list of unique items
    let types = new Set()
    data.map(way => {
        if (Object.hasOwn(way.tags, "golf")) {
            types.add(way.tags.golf)
        }
        if (way.tags.type === "course") {
            course = {
                "id": way.id,
                "name": way.tags.name,
                "address": way.tags.streetnumber + " " + way.tags.streetname,
                "location": {
                    "lat": way.tags.lat,
                    "lon": way.tags.lon
                }
            }
        }
    })
    types = [...types];
    // iterate types and create object for that type
    const features = [];
    types.map((type, i) => {
        // console.log(type)
        let feature = [];
        data.map((datum) => {
            if (datum.tags.golf === type) {
                // console.log(datum.tags.golf)
                if (type === "hole") {
                    feature.push({
                        "id": datum.id,
                        "coords": datum.geometry,
                        "hole": Number(datum.tags.ref),
                        "par": Number(datum.tags.par)
                    })
                } else {
                    feature.push({
                        "id": datum.id,
                        "coords": datum.geometry,
                        "nodes": datum.nodes
                    })
                }
            }
        })
        // console.log("Feature:", feature)
        features[type] = feature
        // console.log(features)
    })
    console.log("Responses", features, course)

    // assemble the return data
    const returnData = {
        "course": course,
        "features": features
    }
    // console.log("Return", JSON.stringify(returnData))
    return returnData
}

// NormalizeCourse(json)