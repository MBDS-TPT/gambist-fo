import React from 'react';
import styled from 'styled-components';
import Button from '../form/Button';
import TextInput from '../form/TextInput';

export interface EditProfileProps {
    className?: string;
    userInfos: any;
    onSubmit: any;
}

const EditProfile:React.FC<EditProfileProps> = ({
    className='',
    userInfos,
    onSubmit
}) => {

    return (
        <Wrapper className={["edit-profile", className].join(' ')} autoComplete="off" >
            <label>First name</label>
            <TextInput name="firstname" value={userInfos?.firstname} placeholder="First name" />
            <label>Last name</label>
            <TextInput name="lastname" value={userInfos?.lastname} placeholder="Last name" />
            <label>Current password</label>
            <TextInput type="password" name="password" placeholder="Password" />
            <label>New password</label>
            <TextInput type="password" name="new-password" placeholder="New Password" />
            <Button onClick={onSubmit} className="submit-btn" value="Edit profile" />
        </Wrapper>
    );
}

const Wrapper = styled.form`
    &.edit-profile {

    }
    .submit-btn {
        margin-top: 10px;
        float: right;
    }
`;

export default EditProfile;