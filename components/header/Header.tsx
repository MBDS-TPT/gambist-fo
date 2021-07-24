import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { User } from '../../model/Model';
import { AuthService } from '../../services/auth/auth.service';
import ButtonLink from '../cta/ButtonLink';
import CTA from '../cta/CTA';
import Button from '../form/Button';
import { Logout } from '../svg-icons/Icons';


export interface NavLinkProps {
    text: string;
    link: string;
}
export interface HeaderProps {
    className?: string;
    loginLink?: string;
    navigationLinks?: NavLinkProps[];
    onLogout?: Function;
    user?: User;
}

const Header: React.FC<HeaderProps> = ({
    className='',
    loginLink='#',
    navigationLinks=[],
    onLogout,
    user
}) => {

    const [userLogged, setUserLogged] = useState<Boolean>(false);

    useEffect(() => {
        const user = AuthService.getUserInfosFromLS();
        setUserLogged(!!user)
    }, []);

    return (
        <Wrapper className={["header", className].join(' ')}>
            <div className="container header-content">
                <div className="left-section">
                    <div className="header-logo">
                        <span>Gamebist</span>
                    </div>
                    <div className="header-menu">
                        <ul className="nav">
                            {navigationLinks && navigationLinks.map((nav, index) => {
                                return (
                                    <li key={index} className="nav-item">
                                        <a href={nav.link} className="nav-link">{nav.text}</a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="right-section">
                    {!userLogged 
                    ? (
                        <ButtonLink
                            bgColor="var(--green)"
                            borderColor="transparent"
                            bgColorHover="var(--gray)"
                            className='login-btn'
                            link={loginLink}
                            >
                            LOGIN
                        </ButtonLink>
                    )
                    : (
                        <>
                        <span>{user?.firstname}</span>
                        <CTA
                            // bgColor="var(--gray)"
                            // borderColor="transparent"
                            // bgColorHover="var(--green)"
                            className='logout-btn'
                            onClick={onLogout}
                            >
                            <Logout width={20} />
                        </CTA>
                        </>
                    )}
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    &.header {
        min-height: 54px;
        width: 100%;
        background-color: var(--dark);
        color: white;
        display: flex;
        font-weight: 600;
        flex-direction: row;
    }
    .header-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .left-section {
        display: flex;
        flex-direction: row;
    }
    .header-logo {
        display: flex;
        align-items: center;
        padding: 0 10px; 
    }
    .button-link.login-btn,
    .cta.logout-btn {
        height: 25px;
        font-size: 12px;
        font-weight: 600;
        line-height: 6px;
        :hover {
            background-color: var(--dark-gray);
            color: var(--white);
        }
    }
    .cta.logout-btn {
        height: 36px;
    }
    .nav-link {
        text-transform: uppercase;
        font-size: 12px;
        color: white;
        :hover {
            color: var(--green);
        }
    }
`;

export default Header;