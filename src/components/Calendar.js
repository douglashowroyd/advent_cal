import '../App.css';
import Door from "./Door";
import {useEffect, useState} from "react";
import getImages from "../Utils/GetImages"
import RandomList from "../Utils/RandomLists";

function Calendar(props) {

    const [enabledList, setEnabledList] = useState([]);
    const [randomRange, setRandomRange] = useState([]);
    const [pictureList, setPictureList] = useState([]);
    const [calTheme, setCalTheme] = useState("fox");

    useEffect(() => {
        const imageURLs = getImages(calTheme)
        imageURLs.then(r => setPictureList(r))

        const lists = RandomList()
        setEnabledList(lists.toEnable)
        setRandomRange(lists.randomList)

    }, [calTheme]);

    useEffect(() => {
        setCalTheme(props.currentTheme)
        }
    , [props])

    useEffect(() => {

    }, [pictureList])

    function makeRow(start, length){
        return(
            <div className="door-row">
                {randomRange.slice(start,start + length).map((i, index) =>
                    <Door key={index} number={i} enabled={enabledList[i]} image={pictureList[i]}/>
                )}
            </div>
        )
    }


    return (
        <div className="calendar">
            {makeRow(0, 6)}
            {makeRow(6, 6)}
            {makeRow(12, 6)}
            {makeRow(18, 6)}
        </div>
    );
}

export default Calendar;
