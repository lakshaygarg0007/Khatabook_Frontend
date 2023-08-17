import React, { useEffect } from 'react'
import Login from './components/Login';
import BarGraph from './components/Dashboard/dashboard';

function Goto() {

    const user_data = sessionStorage.getItem("user_data")
    console.log(user_data)

    const isAuthenticated = () => {
        console.log('azzzzYUUU')
        if (user_data === null || user_data === 'null') {
            return Login();
        } else {
            console.log('im here')
            return <BarGraph />;
        }
    };


    return (
        isAuthenticated()
    )
}

export default Goto;
