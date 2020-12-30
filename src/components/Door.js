import '../App.css';
import {useEffect, useState} from "react";


function Door(props) {

    const [opened, setOpened] = useState(false)

    function handleClick(){
        if (props.enabled){
            setOpened(!opened)
        }
    }

    useEffect(() => {
        setOpened(false)
        }
    , [props])

    return (
        <div className="door" onClick={handleClick}>
                <div className={opened? 'fadeIn' : 'fadeOut'}><img className="image" src={props.image} alt="rando-animal"/></div>
                <div className={!opened? 'fadeIn' : 'fadeOut'}>Day {props.number}</div>
        </div>
    );
}

export default Door;
