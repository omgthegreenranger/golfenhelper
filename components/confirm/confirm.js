import { getHoles } from "../../scripts/osm";
import { useEffect } from "react";

export function gamePrepare(course, holesLoading, players) {
    console.log("The Course", course)
    console.log(holesLoading, players, JSON.stringify(course.features))
    const holes = []
    // if (!holesLoading) {
    //     let i = 0
    //     course.features.hole.map((hole, i) => {
    //         if (hole.tags.golf === "hole") {
    //             holes[i] = { "hole": Number(hole.tags.ref), "par": Number(hole.tags.par) };
    //             i++
    //         }
    //     })
    //     return holes
    // }

    let courseInfo = course.course
    let holeCount = course.features;
    let holeValue = Array.from({ length: holeCount }, (_, index) => 0);
    const playerInfo = players.map((player, i) => {
        return {
            player: player,
            scores: holeValue,
        };
    });

    console.log( "Course", course.course, "players", playerInfo, "holes", holes)
    return {courseInfo, holes, playerInfo}

}