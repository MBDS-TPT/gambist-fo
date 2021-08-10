import React from 'react';
import styled from 'styled-components';
import Button from '../form/Button';
import TextInput from '../form/TextInput';

export interface EditProfileProps {
    className?: string;
    userInfos: any;
    onEditProfile: any;
    onChangePassword: any;
}

const EditProfile:React.FC<EditProfileProps> = ({
    className='',
    userInfos,
    onEditProfile,
    onChangePassword
}) => {

    const _onEditProfile = () => {
        if(onEditProfile)
            onEditProfile()
    }

    const _onChangePassword = () => {
        if(onChangePassword)
            onChangePassword()
    }

    return (
        <Wrapper className={["edit-profile", className].join(' ')} >
            <form>
                <label>First name</label>
                <TextInput name="firstname" value={userInfos?.firstname} placeholder="First name" />
                <label>Last name</label>
                <TextInput name="lastname" value={userInfos?.lastname} placeholder="Last name" />
                <Button onClick={_onEditProfile} className="submit-btn" value="Edit profile" />
            </form>
            <form>
                <label>Current password</label>
                <TextInput type="password" name="password" placeholder="Password" />
                <label>New password</label>
                <TextInput type="password" name="new-password" placeholder="New Password" />
                <Button onClick={_onChangePassword} className="submit-btn" value="Change password" />
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    &.edit-profile {

    }
    .submit-btn {
        margin-top: 10px;
        float: right;
    }
`;

export default EditProfile;