import { TextField } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import ButtonLink from '../cta/ButtonLink';
import Button from '../form/Button';
import TextInput from '../form/TextInput';

export interface RegistrationProps {
    className?: string;
    onSubmit: any;
    showLoader: any;
    errorMessage?: any;
}

const Registration: React.FC<RegistrationProps> = ({
    className='',
    onSubmit,
    showLoader=false,
    errorMessage
}) => {

    const [username, setUsername] = useState<string>('');
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [dayOfBirth, setDayOfBirth] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent) => {
        const elt = e.target as HTMLInputElement;
        if(elt.name == 'username') 
            setUsername(elt.value);
        else if(elt.name == 'firstname') 
            setFirstname(elt.value);
        else if(elt.name == 'lastname') 
            setLastname(elt.value);
        else if(elt.name == 'password') 
            setPassword(elt.value);
        else if(elt.name == 'confirm-password') 
            setConfirmPassword(elt.value);
        else if(elt.name == 'email') 
            setEmail(elt.value);
        else if(elt.name == 'day-of-birth') 
            setDayOfBirth(new Date(elt.value));
    }

    const register = () => {
        if(onSubmit)
            onSubmit({
                username,
                firstname,
                lastname,
                password,
                confirmPassword,
                dayOfBirth,
                email
            });
    }

    return (
        <Wrapper className={["registration", className].join(' ')}>
            <div className="l-card">
                <div className="l-card-header">
                    Registration
                </div>
                <div className="l-card-body">
                    <form>
                        <label>Username</label>
                        <TextInput onChange={handleChange} value={username} placeholder="Username" name="username" type="text" />
                        <label>Firstname</label>
                        <TextInput onChange={handleChange} value={firstname} placeholder="Firstname" name="firstname" type="text" />
                        <label>Lastname</label>
                        <TextInput onChange={handleChange} value={lastname} placeholder="Lastname" name="lastname" type="text" />
                        <label>Email</label>
                        <TextInput onChange={handleChange} value={email} placeholder="E-mail" name="email" type="email" />
                        <label>Day of birth</label>
                        <TextField onChange={handleChange} defaultValue={dayOfBirth} name="day-of-birth" type="date" variant="outlined"/>
                        <label>Password</label>
                        <TextInput onChange={handleChange} value={password} placeholder="Password" name="password" type="password" />
                        <label>Confirmation Password</label>
                        <TextInput onChange={handleChange} value={confirmPassword} placeholder="Repeat Password" name="confirm-password" type="password" />
                        <div className="error-message">{errorMessage}</div>
                        <Button showLoader={showLoader} onClick={register} className="submit-btn" value="CREATE NEW ACCOUNT" />
                    </form>
                </div>
                <div className="l-card-footer">
                    <ButtonLink link="/registration" 
                        bgColorHover="transparent" 
                        textColor="var(--green)" 
                        textColorHover="var(--green)" >Log in</ButtonLink>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    &.registration {
        min-height: 300px;
        width: 570px;
        background-color: var(--white);
        display: flex;
        flex-direction: column;
        margin: auto;
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
    }
    .error-message {
        color: red;
        margin: 15px 0;
    }
    .l-card-footer {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 20px;
    }
`;

export default Registration;