import React, { useState } from 'react';
import styled from 'styled-components';

export interface BetSpinnerProps {
    className?: string;
    name: string;
    onChange?: Function;
    value?: number;
}

const BetSpinner:React.FC<BetSpinnerProps> = ({
    className='',
    name='',
    value=0,
    onChange,
}) => {

    const [_value, _setValue] = useState<number>(value);
    const [errorMessage, setErrorMessage] = useState<string>();


    const Increment = () => {
        const value = _value + 1;
        _setValue(value);
        validateValue(value);
        if(onChange) onChange(value);
    }

    const Decrement = () => {
        const value = _value - 1 >= 0 ? _value - 1 : 0;
        _setValue(value);
        validateValue(value);
        if(onChange) onChange(value)
    }

    const OnChange = (event: any) => {
        var value = event.target.value+"";
        if(value === "") {
            value="0";
            if(onChange) onChange(value)
        }
        validateValue(parseInt(value));
        if(value.match("^[0-9]*$")) {
            value = value.replaceAll(/^0+(?!$)/g, '');
            _setValue(parseInt(value))
            if(onChange) onChange(parseInt(value))
        }
    }

    const validateValue = (value: number) => {
        if(value == 0) {
            setErrorMessage('Bet value must be greater than 0')
        } else setErrorMessage('');
    }

    return (
        <Wrapper className={["bet-spinner", className].join(' ')} >
            <div>
                <span onMouseDown={Decrement} className="bet-spin-action unselectable">-</span>
                <input min="0" onChange={OnChange} value={_value} name={name}/>
                <span onMouseDown={Increment} className="bet-spin-action unselectable">+</span>
            </div>
            {errorMessage && <span className="error-message">{ errorMessage }</span>}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    &.bet-spinner {
        display: flex;
        flex-direction: column;
        align-items: center;
        div {
            display: flex;
            flex-direction: row;
            height: 60px;
            width: 180px;
        }
        .error-message {
            color: var(--red);
            font-size: 12px;
            margin-top: 4px;
        }
    }
    .bet-spin-action {
        background-color: var(--dark-gray);
        border: none;
        color: white;
        width: 33.33%;
        cursor: pointer;
        height: 100%;
        font-weight: 500;
        font-size: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 8px;
    }
    input {
        width: 33.33%;
        height: 100%;
        text-align: center;
        border: 1px solid var(--light-gray);
    }
`;

export default BetSpinner;