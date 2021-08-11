import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../form/Button';
import TextInput from '../form/TextInput';
import SectionTitle from '../section-title/SectionTitle';
import UIContext from '../ui-context/UIContext';

export interface EditProfileProps {
    className?: string;
    onEditProfile: any;
    onChangePassword: any;
    userInfos: any;
    editProfilMessage?: any;
    editPasswordMessage?: any;
}

const EditProfile:React.FC<EditProfileProps> = ({
    className='',
    onEditProfile,
    onChangePassword,
    userInfos,
    editPasswordMessage,
    editProfilMessage
}) => {

    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');

    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    
    // const [editProfilMessage, setEditProfilMessage] = useState();
    // const [editPasswordMessage, setEditPasswordMessage] = useState();

    const [showEditProfilLoader, setShowEditProfilLoader] = useState<boolean>(false); 
    const [showEditPasswordLoader, setShowEditPasswordLoader] = useState<boolean>(false); 

    const _onEditProfile = async () => {
        setShowEditProfilLoader(true);
        if(onEditProfile) {
            await onEditProfile(firstname, lastname);
            setShowEditProfilLoader(false);
        }
    }
    
    const handleInputChange = (e: React.ChangeEvent) => {
        const element = e.target as HTMLInputElement;
        if(element.name == 'firstname')
            setFirstname(element.value);
        else if(element.name == 'lastname') 
            setLastname(element.value);
        else if(element.name == 'password') 
            setPassword(element.value)
        else if(element.name == 'new-password') 
            setNewPassword(element.value)
    }

    const _onChangePassword = async () => {
        setShowEditPasswordLoader(true);
        if(onChangePassword) {
            await onChangePassword(password, newPassword);
            setShowEditPasswordLoader(false);
        }
    }

    useEffect(() => {
        setFirstname(userInfos?.firstname || '');
        setLastname(userInfos?.lastname || '');
    }, [userInfos]);

    return (
        <Wrapper className={["edit-profile", className].join(' ')} >
            <form>
                <div>{editProfilMessage}</div>
                <label>First name</label>
                <TextInput name="firstname" onChange={handleInputChange} value={firstname} placeholder="First name" />
                <label>Last name</label>
                <TextInput name="lastname" onChange={handleInputChange} value={lastname} placeholder="Last name" />
                <Button loaderSize={20} showLoader={showEditProfilLoader} onClick={_onEditProfile} className="submit-btn" value="Edit profile" />
            </form>
            <SectionTitle title="Change password" />
            <form>
            <div>{editPasswordMessage}</div>
                <label>Current password</label>
                <TextInput type="password" name="password" onChange={handleInputChange} value={password} placeholder="Password" />
                <label>New password</label>
                <TextInput type="password" name="new-password" onChange={handleInputChange} value={newPassword} placeholder="New Password" />
                <Button loaderSize={20} showLoader={showEditPasswordLoader} onClick={_onChangePassword} className="submit-btn" value="Change password" />
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    &.edit-profile {

    }
    .submit-btn {
        margin-top: 10px;
        margin-right: 0;
        margin-left: auto;
    }
`;

export default EditProfile;