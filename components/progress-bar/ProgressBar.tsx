import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

export interface FooterProps {
    className?: string;
    progressValue: number;
    progressionColor?: string;
}

const ProgressBar: React.FC<FooterProps> = ({
    className='',
    progressValue=0,
    progressionColor='blue'
}) => {

    const [value, setValue] = useState(progressValue);

    useEffect(() => {
        let v = isNaN(progressValue) ? 0 : !isFinite(progressValue) ? 100 : progressValue;
        // v = !isFinite(v) ? 100 : v;
        setValue(v);
    }, [progressValue]);

    return (
        <Wrapper 
            progressionColor={progressionColor} 
            progression={value} 
            className={["progress-bar-container", className].join(' ')}
            >
            <div className="progress-label"><span>{value}%</span></div>
            <div className="progress-bar">
                <div className="bar"></div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div<{progression: any; progressionColor: any}>`
    .progress-bar {
        height: 16px;
        border-radius: 6px;
        background-color: var(--light-gray);
    }
    .progress-label {
        text-align: right;
        span {
            font-size: 12px;
            font-weight: 600;
            color: ${props => props.progressionColor};
        }
    }
    .bar {
        height: 16px;
        border-radius: 0px;
        background-color: ${props => props.progressionColor};
        width: ${props => props.progression}%;
        height: 100%;
    }
`;

export default ProgressBar;