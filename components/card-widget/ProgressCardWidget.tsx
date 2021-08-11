import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import ProgressBar from '../progress-bar/ProgressBar';

export interface ProgressCardWidgetProps {
    className?: string;
    label?: string;
    value: number;
    color?: string;
    total: number
}

const ProgressCardWidget: React.FC<ProgressCardWidgetProps> = ({
    className='',
    label,
    value,
    color="#fff",
    total
}) => {

    const [_value, setValue] = useState(0);

    useEffect(() => {
        setValue(value*100/total);
    }, [value]);

    return (
        <Wrapper borderColor={color} className={["card-widget", className].join(' ')}>
            <div className="card-content">
                <span className="value">{value}/{total}</span>
                <span className="label">{label}</span>
                <ProgressBar progressValue={total == 0 ? 0 : _value} progressionColor={color} />
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div<{ borderColor: any }>`
    &.card-widget {
        border-radius: 5px;
        /**border: 1px solid ${props => props.borderColor};
        border-top: 8px solid ${props => props.borderColor};*/
        max-width: 500px;
        background-color: var(--white);
        min-width: 350px;
        min-height: 100px;
        padding: 20px;
    }
    .label {
        font-size: .875rem;
    }
    .value {
        font-size: 1.3125rem;
        font-weight: 600;
        color: ${props => props.borderColor};
    }
    .card-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .progress-bar {
        width: 100%;
    }  
`;

export default ProgressCardWidget;