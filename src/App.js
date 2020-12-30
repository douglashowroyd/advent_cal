import './App.css';
import Calendar from "./components/Calendar";
import TypeSelector from "./components/TypeSelector";
import {useState} from "react";
import tinsel from './tinsel.png';
import LoadData from "./components/LoadData";
import LoadedCalendar from "./components/LoadedCalendar";
import firebase from './firebase.js';


function App() {

    const [theme, setTheme] = useState("fox");
    const [user, setUser] = useState(null);

    function updateTheme(newTheme) {
        setTheme(newTheme)
    }

    function updateUser(newUser) {
        setUser(newUser)
        if (newUser !== null) {
            setTheme(newUser.theme)
        }
    }

    return (
        <div className="App">
            <header className="App-header">

                <img className="tinsel" src={tinsel} alt="tinsel"/>
                <LoadData updateUser={updateUser}/>

                <TypeSelector theme={theme} childFunc={updateTheme}/>

                { user == null ? <Calendar currentTheme={theme}/> : <LoadedCalendar user={user} currentTheme={theme} updateUser={updateUser}/>}
            </header>
        </div>
    );
}

export default App;
