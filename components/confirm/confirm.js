import { getHoles } from "../../scripts/osm";
import { useEffect } from "react";
import { NormalizeCourse } from "../../scripts/import";

export async function gamePrepare(course, players, setHolesLoading) {
    const courseData = NormalizeCourse(course)
    
    let courseInfo = courseData.course
    let holeCount = courseData.features;
    let holeValue = Array.from({ length: holeCount }, (_, index) => 0);
    const playerInfo = players.map((player, i) => {
        return {
            player: player,
            scores: holeValue,
        };
    });
    console.log("CourseData", holeCount, holeValue)
    console.log( "Course", courseData.course, "players", playerInfo, "holes", holeCount.hole)
    setHolesLoading(false)
    return {courseInfo, holeCount, playerInfo}

}