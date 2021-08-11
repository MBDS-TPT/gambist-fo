import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../form/Button';
import TextInput from '../form/TextInput';

export interface RechargeAccountFormProps {
    onSubmit: any;
    message?: any;
}

const RechargeAccountForm: React.FC<RechargeAccountFormProps> = ({
    onSubmit,
    message
}) => {

    const [password, setPassword] = useState<string>('');
    const [amount, setAmount] = useState<string>('0');
    const [showLoader, setShowLoader] = useState<boolean>(false); 

    const _onSubmit = async (e: any) => {
        setShowLoader(true);
        if(onSubmit) {
            await onSubmit(password, amount);
        }
        setShowLoader(false);
    }
    
    const handleChange = (e: React.ChangeEvent) => {
        const element = e.target as HTMLInputElement;
        if(element.name == 'amount')setAmount(element.value)
        else if(element.name == 'password') setPassword(element.value)
    }

    return (
        <Wrapper className="recharge-account" >
            <div>{message}</div>
            <label>Amount</label>
            <TextInput type="number" onChange={handleChange} value={amount} name="amount" />
            <label>Password</label>
            <TextInput type="password" onChange={handleChange} value={password} name="password" />
            <Button showLoader={showLoader} className="submit-btn" onClick={_onSubmit} value="Recharge"/>
        </Wrapper>
    );
}

const Wrapper = styled.form`
    &.recharge-account {
        padding: 30px;
    }
    .submit-btn {
        margin: auto;
        margin-top: 10px;
    }
`;

export default RechargeAccountForm;