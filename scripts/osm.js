import NormalizeCourse from "./import";

export async function courseList(setCourses, setCourseLoading) {
  const coursesFetch = await fetch('https://www.overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: "[out:json][timeout:25];way(around:10000,43.6886058, -79.3004177)[\"leisure\"=\"golf_course\"];out tags;"
  })
    .then(response => response.json())
    .then(data => { console.log("Fetched courses success: ", setCourses(data)); setCourseLoading(false); return data })
    .catch(error => {console.error("No courses received. See error:", error); setCourseLoading(null); return error});
  ;
  return
}

export async function getHoles(pickedCourse, setHolesLoading, setCourse) {

  const courseFetch = await fetch('https://www.overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // body: "[out:json][timeout:25];way(" + pickedCourse.id + ");map_to_area ->.golfcourse;way[\"leisure\"=\"golf_course\"](area.golfcourse);convert way ::id=id(), lat=lat(), lon=lon(), name=t[\"name\"],streetnumber=t[\"addr:housenumber\"], streetname=t[\"addr:street\"] -> .holeData;way[\"golf\"=\"hole\"](area.golfcourse) ->.holes;.holeData out;.holes out tags;.golfcourse out;"
    body: "[out:json][timeout:25];way(" + pickedCourse.id + ");map_to_area ->.golfcourse;way[leisure=golf_course](area.golfcourse);convert way ::id=id(), type=\"course\", lat=lat(), lon=lon(), name=t[\"name\"], streetnumber=t[\"addr:housenumber\"], streetname=t[\"addr:street\"] -> .courseData;way[golf=hole](area.golfcourse)->.holes;nwr[golf~\"^(fairway|tee|green|pin|water_hazard|bunker|lateral_water_hazard)\"](area.golfcourse)->.restoftheData;.courseData out;.holes out geom;.restoftheData out;"
  })
    .then(response => response.json())
    .then(data => { console.log("Fetched hole data:", data); setCourse(NormalizeCourse(data)); setHolesLoading(false)})
    .catch(error => {console.error("Getting holes failed. See error:", error); setHolesLoading(null); return error});
  ;
  return courseFetch
}