import React, { ChangeEventHandler } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

export interface TextInputProps {
    className?: string;
    onChange?: any;
    onFocus?: any;
    type?:string;
    value?: string;
    placeholder?: string;
    name: string;
    required?: boolean;
    disabled?: boolean;
}

const TextInput:React.FC<TextInputProps> = ({
    className='',
    onChange = () => {},
    onFocus = () => {},
    type = 'text',
    value,
    name,
    placeholder,
    required = false,
    disabled = false
}) => {

    const [_value, _setValue] = useState<any>(value);

    const _onChange = (e: any) => {
        if(onChange) onChange(e);
    }

    return (
        <Wrapper className={["text-input", className].join(' ')} >
            <input 
                disabled={disabled}
                type={type} 
                onChange={_onChange} 
                onFocus={onFocus}
                value={value}
                name={name}
                placeholder={placeholder}
                required={required}
                />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    &.text-input {
        padding: 10px 0;
    }
    input {
        border: 1px solid var(--light-gray);
        min-height: 60px;
        width: 100%;
        padding: 17px 19px;
        color: #9b9b9b;
    }
`;

export default TextInput;