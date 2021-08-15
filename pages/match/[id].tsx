import { GetServerSideProps, GetStaticPaths } from "next";
import React from "react";
import styled from "styled-components";
import MatchCard from "../../components/match-detail/MatchCard";
import MatchResult from "../../components/match-result/MatchResult";
import Page from "../../components/page-wrapper/Page";
import { Match } from "../../model/Model";
import { MatchService } from "../../services/match/match.service";
import QRCode  from "react-qr-code";
import { useState } from "react";
import { useEffect } from "react";
import SectionTitle from "../../components/section-title/SectionTitle";
import MatchCardResult from "../../components/match-detail/MatchCardResult";
import { CategoryService } from "../../services/category/category.service";

interface PageProps {
    match: Match;
    categories: any;
    matches: any;
    latestMatchResult: Match[];
}

const MatchDetailPage: React.FC<PageProps> = ({
    match,
    categories,
    matches,
    latestMatchResult
}) => {

    const [upcomingMatch, setUpcomingMatch] = useState<Match>();
    const [qrCodeUrl, setQrCodeUrl] = useState<string>("/");

    useEffect(() => {
        setUpcomingMatch(MatchService.getUpcomingMatch(matches, categories));
        setQrCodeUrl(MatchService.getMatchUrl(match.id));
    }, []);

    return (
        <Wrapper className="match-details">
            <Page>
                <div className="section">
                    <div>
                        <SectionTitle title="Match result" />
                        <MatchCard match={match} />
                        <MatchResult match={match} />
                    </div>
                    <div className="qr-code">
                        <SectionTitle title="QR Code" /> 
                        <QRCode value={qrCodeUrl} />
                        <p>Scan to open on the mobile app.</p>
                    </div>
                </div>
                <div className="section">
                    <div className="upcoming-match">
                        <SectionTitle title="Upcoming match" />
                        {matches && (
                            <MatchCard 
                            match={upcomingMatch}
                            />
                            )}
                    </div>
                    <div className="latest-match-result">
                        <SectionTitle title="Latest game results" />
                        {latestMatchResult && latestMatchResult.map((match, index) => {
                            return (
                                <MatchCardResult
                                    className="match-result"
                                    key={index}
                                    match={match}
                                />
                            )
                        })}
                    </div>
                </div>
            </Page>
        </Wrapper>   
    )
}

const Wrapper = styled.div`
    .section {
        margin: 20px 0;
    }
    .section {
        display: flex;
        justify-content: space-between;
    }
    .latest-match-result {
        min-width: 25%;
    }
    .match-result {
        margin: 0 0 20px 0 !important;
    }
    .qr-code {
        p {
            margin-top: 10px;
            font-size: 12px;
            font-style: italic;
        }
    }
`;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let categories = await CategoryService.getCategories();
    categories = [
        {
            id: -1,
            label: "All sports",
            state: 0
        },
        ...categories || [] 
    ];
    const matches = await MatchService.getUpcomingMatchGroupedByCategory();
    const latestMatchResult = await MatchService.getLatestGameResult();
    const match = await MatchService.getMatch(ctx.query.id);
    return {
        props: {
            match,
            categories,
            matches,
            latestMatchResult
        }
    }
}

export default MatchDetailPage;
