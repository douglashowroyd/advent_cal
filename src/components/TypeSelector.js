import '../App.css';
import {useEffect, useState} from "react";
import {InputLabel, Menu, MenuItem, Select} from "@material-ui/core";


function TypeSelector(props) {
    const [imageType, setImageType] = useState('fox');

    function handleChange(event) {
        setImageType(event.target.value);
    };


    useEffect(() => {
        props.updateTheme(imageType)
        }
    ,[imageType])

    return (
        <div>
                <InputLabel id="demo-simple-select-label" style={{color: "white"}}>Calendar theme</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={imageType}
                    onChange={handleChange}
                    style={{color: "white"}}
                >
                    <MenuItem value={"cat"}>Cats</MenuItem>
                    <MenuItem value={"dog"}>Dogs</MenuItem>
                    <MenuItem value={"doggo"}>Doggos</MenuItem>
                    <MenuItem value={"fox"}>Foxes</MenuItem>
                </Select>
        </div>
    );

}

export default TypeSelector;
