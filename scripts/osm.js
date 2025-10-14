  export async function courseList(courses, setCourses, courseLoading, setCourseLoading ) {
    const coursesFetch = await fetch('https://www.overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: "[out:json][timeout:25];way(around:10000,43.6886058, -79.3004177)[\"leisure\"=\"golf_course\"];out tags;"
    })
      .then(response => response.json())
      .then(data => { console.log("Fetched data success: ", data); setCourses(data); setCourseLoading(false) })
      .catch(error => console.error("Sorry, no working.", error));
    ;

  }

  export async function getHoles(pickedCourse, setHolesLoading, setCourse) {
    await fetch('https://www.overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: "[out:json][timeout:25];way(" + pickedCourse.id + ");map_to_area ->.golfcourse;way[\"golf\"=\"hole\"](area.golfcourse)->.holes;.golfcourse out center;.holes out tags;"
    })
      .then(response => response.json())
      .then(data => { console.log("The data", data); setCourse(data); setHolesLoading(false) })
      .catch(error => console.error("Sorry, no working.", error));
    ;
  }