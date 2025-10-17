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
    .catch(error => console.error("No courses received. See error:", error));
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
    body: "[out:json][timeout:25];way(" + pickedCourse.id + ");map_to_area ->.golfcourse;way[\"golf\"=\"hole\"](area.golfcourse)->.holes;.golfcourse out center;.holes out tags;"
  })
    .then(response => response.json())
    .then(data => { console.log("Fetching hole data:", data); setCourse(data); setHolesLoading(false); return data })
    .catch(error => console.error("Getting holes failed. See error:", error));
  ;
  return
}