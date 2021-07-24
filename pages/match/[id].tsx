import { GetServerSideProps, GetStaticPaths } from "next";
import React from "react";
import styled from "styled-components";
import MatchCard from "../../components/match-detail/MatchCard";
import MatchResult from "../../components/match-result/MatchResult";
import Page from "../../components/page-wrapper/Page";
import { Match } from "../../model/Model";
import { MatchService } from "../../services/match/match.service";

interface PageProps {
    match: Match;
}

const MatchDetailPage: React.FC<PageProps> = ({
    match
}) => {
    return (
        <Wrapper className="match-details">
            <Page>
                <MatchCard match={match} />
                <MatchResult  />
            </Page>
        </Wrapper>   
    )
}

const Wrapper = styled.div`
`;

// export const getStaticPaths: GetStaticPaths = async (ctx) => {
//     const paths: any = MatchService.getAllMatchId();
//     return {
//         paths,
//         fallback: false
//     };
// }

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const match = await MatchService.getMatch(ctx.query.id);
    return {
        props: {
            match
        }
    }
}

export default MatchDetailPage;
