import '../App.css';
import {useEffect, useState} from "react";
import {MenuItem, Select} from "@material-ui/core";


function TypeSelector(props) {
    const [imageType, setImageType] = useState('fox');

    function handleChange(event) {
        setImageType(event.target.value);
    };

    useEffect(() =>{
        if (props.theme !== imageType){
            setImageType(props.theme)
        }
    }, [props])

    useEffect(() => {
        props.childFunc(imageType)
        }
    ,[imageType])

    return (
        <div>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={imageType}
                    onChange={handleChange}
                    style={{color: "goldenrod"}}
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
