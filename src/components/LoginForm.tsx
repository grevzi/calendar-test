import React, {FC, useState} from 'react';
import {Alert, Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const LoginForm: FC = () => {
    const {error, isLoading} = useTypedSelector(state => state.auth)

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const {login} = useActions()

    const submit = () => login(username, password)

    return (
        <Form
            name="login"
            onFinish={submit}
            autoComplete="off"
        >
            {error && <Alert message={error} type="error" showIcon style={{margin: "0 0 2vw"}} />}

            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required('Please input your username!')]}
            >
                <Input
                    value={username}
                    onChange={e => setUsername(e.target.value)}/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required('Please input your password!')]}
            >
                <Input.Password
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;