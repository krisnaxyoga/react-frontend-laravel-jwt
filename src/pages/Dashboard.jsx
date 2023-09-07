//import hook react
import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useNavigate } from 'react-router-dom';

//import axios
import axios from 'axios';

function Dashboard() {

    //state user
    const [user, setUser] = useState({});

    //define history
    const history = useNavigate();

    //token
    const token = localStorage.getItem("token");

    //function "fetchData"
    const fetchData = async () => {

        try {
            // set axios header dengan type Authorization + Bearer token
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // fetch user from Rest API
            const response = await axios.get('http://localhost:8776/api/user');
            
            // set response user to state
            setUser(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Token tidak valid, arahkan pengguna kembali ke halaman login
                localStorage.removeItem("token");
                history('/');
            } else {
                // Penanganan kesalahan lainnya
                console.error('Terjadi kesalahan:', error);
            }
        }
    }

    //hook useEffect
    useEffect(() => {

        //check token empty
        if(!token) {

            //redirect login page
            history('/');
        }
        
        //call function "fetchData"
        fetchData();
    }, []);

    //function logout
    const logoutHanlder = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch Rest API
        await axios.post('http://localhost:8776/api/logout')
        .then(() => {

            //remove token from localStorage
            localStorage.removeItem("token");

            //redirect halaman login
            history('/');
        });
    };

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            SELAMAT DATANG <strong className="text-uppercase">{user.name}</strong>
                            <hr />
                            <button onClick={logoutHanlder} className="btn btn-md btn-danger">LOGOUT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Dashboard;