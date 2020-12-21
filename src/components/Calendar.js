import '../App.css';
import Door from "./Door";
import {useEffect, useState} from "react";

function Calendar(props) {

    const [enabledList, setEnabledList] = useState([]);
    const [randomRange, setRandomRange] = useState([]);
    const [pictureList, setPictureList] = useState([]);
    const [calTheme, setCalTheme] = useState("fox");

    useEffect(() => {
        const today = Date.now()

        const toEnable = range(25, 1).map( day => {
            return daysDiff(today, new Date(2020, 11, day)) < 0;
        })
        setEnabledList(toEnable)

        const randomList = range(25, 1).sort(() => Math.random() - 0.5)
        setRandomRange(randomList)

        getImages()

    }, [calTheme]);

    useEffect(() => {
        setCalTheme(props.currentTheme)
        }
    , [props])

    useEffect(() => {

    }, [pictureList])

    async function getImage() {
        if (calTheme === "fox"){
            return getFoxImage()
        } else if (calTheme === "dog") {
            return getDogImage()
        } else if (calTheme === "cat") {
            return getCatImage()
        } else if (calTheme === "doggo") {
            return getDoggoImage()
        }
    }

    async function getFoxImage() {
        let response = await fetch("https://randomfox.ca/floof/")
        if (!response.ok) {
            throw new Error('API call failed:')
        } else {
            let json = await response.json();
            return json["image"]
        }
    }

    async function getCatImage() {
        const api_key = "abcf538e-de0b-40e3-9e6f-186e3f79958c"
        let response = await fetch("https://api.thecatapi.com/v1/images/search", {headers: {'x-api-key':api_key}})
        if (!response.ok) {
            throw new Error('API call failed:')
        } else {
            let json = await response.json();
            return json[0].url
        }
    }

    async function getDogImage() {
        let response = await fetch("https://dog.ceo/api/breeds/image/random")
        if (!response.ok) {
            throw new Error('API call failed:')
        } else {
            let json = await response.json();
            return json["message"]
        }
    }

    async function getDoggoImage() {
        let response = await fetch("https://random.dog/woof?filter=mp4,webm")
        if (!response.ok) {
            throw new Error('API call failed:')
        } else {
            let image = 'https://random.dog/' + await response.text();
            return  image
        }
    }


    async function getImages() {
        let i
        let imageURLs = []
        let image = ""
        for (i = 0; i < 25; i++) {
            image = await getImage()
            imageURLs.push(image)
        }
        setPictureList(imageURLs)

    }


    function daysDiff(start, end) {
       return  Math.round((end-start)/(1000*60*60*24))
    }


    function range(size, startAt = 0) {
        return [...Array(size).keys()].map(i => i + startAt);
    }

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
