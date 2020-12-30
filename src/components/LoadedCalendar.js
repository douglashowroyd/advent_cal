import '../App.css';
import Door from "./Door";
import {useEffect, useState} from "react";
import getImages from "../Utils/GetImages"
import RandomList from "../Utils/RandomLists";
import firebase from "../firebase";

function Calendar(props) {

    const [enabledList, setEnabledList] = useState([]);
    const [randomRange, setRandomRange] = useState([]);
    const [pictureList, setPictureList] = useState([]);
    const [calTheme, setCalTheme] = useState("fox");

    useEffect(() => {

        if (props.user.theme === calTheme) {
            setPictureList(props.user.images)

        } else {
            const imageURLs = getImages(calTheme)
            imageURLs.then(r => {
                setPictureList(r)

                let updatedUser = props.user
                updatedUser.theme = calTheme
                updatedUser.images = r

                props.updateUser(updatedUser)

                const usersRef = firebase.database().ref('users/' + updatedUser.userName);
                usersRef.set(updatedUser);
                console.log(updatedUser)

                /*
                const url = "http://localhost:3002/" + updatedUser.userName
                fetch(url, {method: 'post', headers:{'Content-Type': 'application/json'}, body: JSON.stringify(updatedUser)})
                    .then(r => { console.log(r)})
                */
            })
        }

        const lists = RandomList()
        setEnabledList(lists.toEnable)
        setRandomRange(lists.randomList)

    }, [calTheme]);

    useEffect(() => {
            setCalTheme(props.currentTheme)
    }
    , [props]);

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
