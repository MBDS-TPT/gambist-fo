import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../form/Button';
import TextInput from '../form/TextInput';

export interface LoginProps {
    className?: string;
    showLoader?: boolean;
    onSubmit: Function;
    errorMessage?: string;
    defaultLogin?: string;
    defaultPassword?: string;
}

const Login: React.FC<LoginProps> = ({
    className='',
    onSubmit,
    showLoader=false,
    errorMessage,
    defaultLogin='',
    defaultPassword=''
}) => {

    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    const onChangeUsername = (e: any) => {
        setUsername(e.target.value);
    }

    const onChangePassword = (e: any) => {
        setPassword(e.target.value);
    }

    const onSubmitForm = (e: any) => {
        if(onSubmit) onSubmit(username, password);
    }

    return (
        <Wrapper className={["login", className].join(' ')}>
            <div className="l-card">
                <div className="l-card-header">
                    Login
                </div>
                <div className="l-card-body">
                    <form>
                        <TextInput disabled={showLoader} required onChange={onChangeUsername} placeholder="Login" name="email" type="email" />
                        <TextInput disabled={showLoader} required onChange={onChangePassword} placeholder="Password" name="password" type="password" />
                        <Button showLoader={showLoader} onClick={onSubmitForm} className="submit-btn" value="SIGN IN" />
                    </form>
                    {errorMessage && <span className="error-message">{errorMessage}</span>}
                </div>
                <div className="l-card-footer"></div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    &.login {
        min-height: 300px;
        width: 570px;
        background-color: var(--white);
        display: flex;
        flex-direction: column;
        margin: auto;
        .error-message {
            color: red;
            font-size: 14px;
        }
    }
    .l-card-header {
        background-color: var(--dark);
        height: 60px;
        text-align: center;
        color: white;
        padding-top: 15px;
        font-size: 20px;
        font-weight: 600;
    }
    .l-card-body {
        padding: 40px 25px;
        form {
            display: flex;
            flex-direction: column;
        }
    }
    .submit-btn {
        height: 60px;
        font-weight: 600;
        margin-bottom: 5px;
    }
`;

export default Login;