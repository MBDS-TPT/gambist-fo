import React from 'react';
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
    return (
        <Wrapper 
            progressionColor={progressionColor} 
            progression={progressValue} 
            className={["progress-bar-container", className].join(' ')}
            >
            <div className="progress-label"><span>{progressValue}%</span></div>
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