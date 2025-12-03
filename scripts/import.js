//temporary import of sample data
// import json from "../test-data/course-data.json" with { type: 'json' };

export function NormalizeCourse(json) {
    console.log(json)
    const data = json.elements;
    console.log(data)
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
    console.log("Return", returnData)
    return returnData
}

// export async function Testjson(testApi) {
//     if (testApi === 'option1') {
//         const { default: data } = await import("../test-data/course-data.json", { with: { type: 'json' } });
//         return data;
//     } else if (condition === 'option2') {
//         const { default: data } = await import("../test-data/courses.json", { with: { type: 'json' } });
//         return data;
//     }
// }
// NormalizeCourse(json)