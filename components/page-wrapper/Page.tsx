import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Category, User } from '../../model/Model';
import { AuthService } from '../../services/auth/auth.service';
import Banner, { BannerProps } from '../banner/Banner';
import BetCategory from '../category-nav/ICategory';
import Footer from '../footer/Footer';
import Header from '../header/Header';

export interface PageProps {
    categories?: Category[];
    bannerProps?: BannerProps;
}

const Page: React.FC<PageProps> = ({
    categories,
    children,
    bannerProps,
}) => {

    const [user, setUser] = useState<User>();    
    const [headerNavigation, setHeaderNavigation] = useState<any>([{
        text: 'Home',
        link: '/home'
    }]);

    const userNavigationLinks = [
        // {
        //     text: 'History',
        //     link: '/match/result'
        // },
        {
            text: 'My bets',
            link: '/bet'
        }
    ]

    useEffect(() => {
        const user = AuthService.getUserInfosFromLS();
        if(user) {
            setUser(user);
            if(headerNavigation.length < 2) {
                setHeaderNavigation([
                    ...headerNavigation,
                    ...userNavigationLinks
                ]);
            }
        }
    }, []);

    const logout = (e: any) => {
        AuthService.logout();
        // e.preventDefault();
    }

    return (
        <Wrapper className="page-wrapper">
            <div className="page-header">
                <Header user={user} onLogout={logout} loginLink="/login" navigationLinks={headerNavigation} />
                {bannerProps && <Banner {...bannerProps} />}
            </div>
            <div className="page-container">
                {/* <CategorySideNav className="page-side-nav" categories={categories}/> */}
                <div className="container">
                    {children}
                </div>
            </div>
            <Footer/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    &.page-wrapper {
        background-color: var(--light-gray);
        padding-bottom: 10px;
    }
    .page-header {
        margin-bottom: 50px;
    }
    .page-container {
        display: flex;
        flex-direction: row;
        margin-bottom: 40px;
    }
    .page-content {
        width: 100%;
        margin-right: 10px;
    }
`;

export default Page;