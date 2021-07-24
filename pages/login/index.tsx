import { GetStaticProps } from "next";
import React, { useState } from "react";
import styled from "styled-components";
import Page from "../../components/page-wrapper/Page";
import Login from "../../components/login/Login";
import CategoriesData from '../../dumy-data/categories.content.json';
import MatchsData from '../../dumy-data/matchs.content.json';
import { AuthService } from "../../services/auth/auth.service";
import { useEffect } from "react";

interface PageProps {
    
}

const LoginPage = (props: PageProps) => {

    const {
        
    } = props;

    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [logged, setLogged] = useState<Boolean>(true);

    const doLogin = (login: string, password: string) => {
        setShowLoader(true);
        AuthService.login(login, password)
        .then((res) => {
            if(res.message == "OK") {
                AuthService.saveUserInfosToLS(res.data)
                document.location.href = '/home';
            } else {
                setErrorMessage(res.message);
            }
            setShowLoader(false);
        })
        .catch((error) => {
            setErrorMessage(error+"");
            setShowLoader(false);
        })
    }

    useEffect(() => {
        const user = AuthService.getUserInfosFromLS();
        if(user) {
            document.location.href = '/home'
        } else setLogged(false);
    }, []);

    return (
        <Wrapper>
            {!logged &&<Page>
                <Login
                    // defaultLogin={'johnatan@gmail.com'} 
                    // defaultPassword={'password'}
                    errorMessage={errorMessage} 
                    showLoader={showLoader} 
                    onSubmit={doLogin} />
            </Page>}
        </Wrapper>
    );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    return {
        props: {
            categories: CategoriesData,
            matches: MatchsData
        }
    }
}

const Wrapper = styled.div`
    @media (min-width: 700px) {
        .page-container {
            padding-top: 150px;
        }
        .login {
            margin-bottom: 200px;
        }
    }
`;

export default LoginPage;