import './App.css';
import Calendar from "./components/Calendar";
import TypeSelector from "./components/TypeSelector";
import {useState} from "react";

function App() {

    const [theme, setTheme] = useState("fox");

    function updateTheme(newTheme) {
        setTheme(newTheme)
    }

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Hold the door

                <TypeSelector updateTheme={updateTheme}/>
                </p>
                <Calendar currentTheme={theme}/>
            </header>
        </div>
    );
}

export default App;
