import { GetStaticProps } from "next";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Page from "../../components/page-wrapper/Page";
import Registration from "../../components/registration/Registration";
import CategoriesData from '../../dumy-data/categories.content.json';
import MatchsData from '../../dumy-data/matchs.content.json';
import { AuthService } from "../../services/auth/auth.service";

interface PageProps {
    categories: any;
    matches: any;
}

const RegistrationPage = (props: PageProps) => {

    const {
        categories,
        matches
    } = props;

    const [showLoader, setShowLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState<any>();

    const register = async (userinfo: any) => {
        setShowLoader(true);
        AuthService.registration(userinfo)
        .then((res) => {
            if(res.result == "OK") {
                AuthService.saveUserInfosToLS(res.data)
                setShowLoader(false);
                document.location.href = '/home';
            } else {
                setErrorMessage(res.message);
            }
            setShowLoader(false);
        }).catch((err) => {
            setShowLoader(false);
            console.log(err);
        });
    }

    return (
        <Wrapper>
            <Page categories={categories}>
                <Registration 
                    errorMessage={errorMessage}
                    showLoader={showLoader} 
                    onSubmit={register} 
                    className="registration"/>
            </Page>
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
    .registration {
        margin-top: 0px;
    }
`;

export default RegistrationPage;