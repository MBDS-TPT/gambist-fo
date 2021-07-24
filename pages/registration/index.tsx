import { GetStaticProps } from "next";
import React from "react";
import styled from "styled-components";
import Page from "../../components/page-wrapper/Page";
import Registration from "../../components/registration/Registration";
import CategoriesData from '../../dumy-data/categories.content.json';
import MatchsData from '../../dumy-data/matchs.content.json';

interface PageProps {
    categories: any;
    matches: any;
}

const RegistrationPage = (props: PageProps) => {

    const {
        categories,
        matches
    } = props;

    return (
        <Wrapper>
            <Page categories={categories}>
                <Registration className="registration"/>
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
        margin-top: 100px;
    }
`;

export default RegistrationPage;