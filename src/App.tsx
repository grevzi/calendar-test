import React, {FC, useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import {Layout, Row} from "antd";
import moment from "moment";
import './App.css'
import {useActions} from "./hooks/useActions";
import {IUser} from "./models/IUser";

const App: FC = () => {
    const {setUser, setIsAuth} = useActions()

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setUser({username: localStorage.getItem('username'), password: ''} as IUser)
            setIsAuth(true)
        }
    }, [])

    return (
        <Layout>
            <Navbar/>

            <Layout.Content>
                <AppRouter/>
            </Layout.Content>
            <Layout.Footer>
                <Row justify="center">
                    {moment().format('YYYY')}
                </Row>
            </Layout.Footer>
        </Layout>
    );
};

export default App;