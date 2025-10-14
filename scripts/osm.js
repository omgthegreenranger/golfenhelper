  async function courseList() {
    const coursesFetch = await fetch('https://www.overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: "[out:json][timeout:25];way(around:10000,43.6886058, -79.3004177)[\"leisure\"=\"golf_course\"];out body;"
    })
      .then(response => response.json())
      .then(data => { console.log(data); setCourses(data); setCourseLoading(false) })
      .catch(error => console.error("Sorry, no working.", error));
    ;
    console.log("The stuff", coursesFetch)

  }

    async function getHoles() {
    await fetch('https://www.overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: "[out:json][timeout:25];way(" + pickedCourse + ");map_to_area ->.golfcourse;way[\"golf\"=\"hole\"](area.golfcourse);(._;>;);out tags;"
    })
      .then(response => response.json())
      .then(data => { console.log("The data", data); setCourse(data); setHolesLoading(false) })
      .catch(error => console.error("Sorry, no working.", error));
    ;
    // console.log("The hole stuff", await courseFetch)
  }