import '../App.css';
import {useState} from "react";
import {Button, TextField} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import firebase from '../firebase.js';

function LoadData(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [alert, setAlert] = useState(false);


    function login() {
        /*
        const url = "http://localhost:3002/" + username + "/password"

        fetch(url, {method: 'post', body: password} ).then(r => { !r.ok ? setAlert(true) : r.json().then(r => {r ? getUser() : setAlert(true)})
        })
        */

        firebase.database().ref('/users/' + username).once('value').then((snapshot) => {
            console.log(snapshot.val())
            props.updateUser(snapshot.val())
            setLoggedIn(true)
            setAlert(false)
        });
    }

    function createAccount() {
        /*
        const url = "http://localhost:3002/"
        const body= JSON.stringify({'id':0, "userName":username, "theme":"fox", "password":password, "images":[""] })

        fetch(url, {method: 'post', headers:{'Content-Type': 'application/json'}, body: body})
            .then(r => { !r.ok ? setAlert(true) : r.json().then(r => {r ? getUser() : setAlert(true)})
        })
        */

        const usersRef = firebase.database().ref('users/' + username);
        const user = {
            userName: username,
            theme: "fox",
            password: password,
            images: ["www.com"]
        }
        usersRef.set(user);
    }

    function getUser() {
        setLoggedIn(true)
        setAlert(false)
        const GETURL = "http://localhost:3002/" + username
        fetch(GETURL).then(r => { r.json().then(r => props.updateUser(r))})
    }

    function logout() {
        setLoggedIn(false)
        setUsername("")
        setPassword("")
        props.updateUser(null)
    }

    function renderLogIn() {
        if (loggedIn) {
            return (
            <div>
                Logged in as {username} &nbsp;&nbsp; <Button onClick={logout} variant="contained" size="medium">Logout</Button>
            </div> )
        } else {
            return (
            <div>
                <TextField
                    id="standard-basic-name"
                    label="Username"
                    variant="outlined"
                    size="small"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <TextField
                    id="standard-basic-pass"
                    label="Password"
                    variant="outlined"
                    size="small"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button onClick={login} variant="contained" size="medium">Login</Button>
                <Button onClick={createAccount} variant="contained" size="medium">Create account</Button>
            </div> )
        }
    }

    return (
        <div>
            { renderLogIn() }
            {alert ? <Alert severity="error">Wrong username or password</Alert> : null}
        </div>
    );

}

export default LoadData;
