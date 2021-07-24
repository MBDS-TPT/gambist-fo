import React from 'react';
import styled from 'styled-components';
import Button from '../form/Button';
import TextInput from '../form/TextInput';

export interface RegistrationProps {
    className?: string;
}

const Registration: React.FC<RegistrationProps> = ({
    className=''
}) => {
    return (
        <Wrapper className={["registration", className].join(' ')}>
            <div className="l-card">
                <div className="l-card-header">
                    Registration
                </div>
                <div className="l-card-body">
                    <form>
                        <TextInput placeholder="E-mail" name="email" type="email" />
                        <TextInput placeholder="Username" name="username" type="text" />
                        <TextInput placeholder="Password" name="password" type="password" />
                        <TextInput placeholder="Repeat Password" name="repeat-password" type="password" />
                        <Button className="submit-btn" value="CREATE NEW ACCOUNT" />
                    </form>
                </div>
                <div className="l-card-footer"></div>
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
`;

export default Registration;