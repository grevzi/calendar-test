import React, {FC} from 'react';
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import {Layout, Row} from "antd";
import moment from "moment";
import './App.css'

const App: FC = () => {
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