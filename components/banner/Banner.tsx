import React from 'react';
import styled from 'styled-components';
import ButtonLink from '../cta/ButtonLink';

export interface BannerProps {
    className?: string;
    imageUrl: string;
}

const Banner:React.FC<BannerProps> = ({
    className='',
    imageUrl
}) => {


    return (
        <Wrapper className={["banner", className].join(' ')}>
            <img src={imageUrl} alt="banner" />
            <div className="banner-text">
                <h1>
                    SAFE
                    <br/>
                    BETTING
                </h1>
                <h4>
                    WITH 100% RISK-FREE GUARANTEE
                </h4>
                <ButtonLink link="/registration">JOIN US</ButtonLink>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    &.banner {
        position: relative;
        object-fit: contains;
        img {        
            height: auto;
            width: 100%; 
        }
    }
    .banner-text {
        position: absolute;
        top: 20px;
        right: 30px;
        color: white;
        padding: 10px 30px 30px;
        h1 {
            font-size: 40px;
            font-weight: 700;
        }
        h4 {
            font-size: 14px;
            margin-bottom: 30px; 
        }
    }
    @media (min-width: 700px) {
        .banner-text {
            right: 130px;
            padding: 40px 30px 130px;
            h1 {
                font-size: 60px;
                font-weight: 700;
            }
            h4 {
                font-size: 24px;
            }
        }
    }
`;

export default Banner;