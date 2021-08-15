import { GetServerSideProps } from 'next';
import React, { useState } from 'react'; 
import { useContext } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { BannerProps } from '../components/banner/Banner';
import CategoryNav, { CategoryNavProps } from '../components/category-nav/CategoryNav';
import MatchCard from '../components/match-detail/MatchCard';
import MatchCardResult from '../components/match-detail/MatchCardResult';
import MatchList from '../components/match-list/MatchList';
import Page from '../components/page-wrapper/Page';
import SectionTitle from '../components/section-title/SectionTitle';
import UIContext from '../components/ui-context/UIContext';
import { Bet, Category, Match } from '../model/Model';
import { AuthService } from '../services/auth/auth.service';
import { BetService } from '../services/bet/bet.service';
import { CategoryService } from '../services/category/category.service';
import { MatchService } from '../services/match/match.service';
import FormatUtil from '../utils/format.util';
interface PageProps {
    categories: any;
    matches: any;
    latestMatchResult: Match[];
    todaysMatch: Match[];
}

const HomePage = (props: PageProps) => {
    
    const {
        categories,
        matches,
        latestMatchResult,
        todaysMatch
    } = props;

    const [matchList, setMatchList] = useState<Match[]>([]);
    const [upcomingMatch, setUpcomingMatch] = useState<Match>();
    const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
    const [allCategorySelected, setAllCategorySelected] = useState<Boolean>(true);
    const [userBets, setUserBets] = useState<Bet[]>([]);
    const [userBalance, setUserBalance] = useState<number>(0);
    const [onGoingMatch, setOnGoingMatch] = useState<Match[]>(todaysMatch);
    const appContext = useContext(UIContext);

    const bannerProps:BannerProps = {
        imageUrl: "/images/banner/banner-1.jpg"
    }
    
    const categoryNavProps: CategoryNavProps = {
        categories: categories,
        onChangeCategory: (category: Category) => {
            if(category) {
                setSelectedCategory(category)
                if(category.id == '-1') setAllCategorySelected(true);
                else  {
                    setMatchList(MatchService.getUpcomingMatchByCategoryName(matches, category.label));
                    setOnGoingMatch(todaysMatch.filter((m)=> {
                        console.log(m.categoryId, category.id)
                        return m.category?.id == category.id
                    }));
                    setAllCategorySelected(false);
                }
            }
        }
    }

    const OnPostBet = async (bet: any, successCallback = () => {}, errorCallback = (message: any) => {}) => {
        const minBet = parseInt(appContext?.minimumBet+"") || 0;
        const maxBet = parseInt(appContext?.maximumBet+"") || 9999999;
        if(bet.betValue < minBet) {
            errorCallback(`The minimum bet value is ${FormatUtil.formatCurrency(minBet)}${appContext?.currency}.`);
        }
        else if(bet.betValue > maxBet) {
            errorCallback(`The maximum bet value is ${FormatUtil.formatCurrency(maxBet)}${appContext?.currency}.`);
        } else {
            BetService.postBet(bet)
            .then((res) => {
                if(res.result !== "KO") {
                    BetService.addBetToLS(res);
                    setUserBets([
                        ...userBets,
                        res.data
                    ]);
                    AuthService.updateUserBalance(userBalance - bet.betValue);
                    setUserBalance(userBalance - bet.betValue);
                    successCallback();
                }
                else {
                    errorCallback(`${res.message} (${FormatUtil.formatCurrency(AuthService.getUserBalance())} ${appContext?.currency})`);
                }
            });
        }
    }

    useEffect(() => {
        setUpcomingMatch(MatchService.getUpcomingMatch(matches, categories));
        BetService.getUserBets()
        .then((res) => {
            setUserBets(res);
        });
        if(AuthService.isLogged()) 
            setUserBalance(AuthService.getUserBalance());
        }, []);
        
        return (
            <Wrapper>
            <Page>
                <div className="section">
                    <CategoryNav { ...categoryNavProps }/>
                    <div>
                        <SectionTitle title={selectedCategory.label}/>
                        <MatchList userBalance={userBalance} userBets={userBets} onPostBet={OnPostBet} tableHeader="Ongoing" matchDetailPath='/match' matches={onGoingMatch} />
                    </div>
                    {!allCategorySelected ? 
                        <>
                            <SectionTitle title={`${selectedCategory.label} (${matchList.length})`} />
                            <MatchList userBalance={userBalance} userBets={userBets} onPostBet={OnPostBet} tableHeader="NATIONAL CHAMPIONSHIP" matchDetailPath='/match' matches={matchList} />
                        </>
                    : 
                        categories.filter((category: Category) => category.id != "-1").map((category: Category) => {
                            const matchList_ = MatchService.getUpcomingMatchByCategoryName(matches, category.label)
                            return (
                                <div key={category.id}>
                                    <SectionTitle title={`${category.label} (${matchList_.length})`} />
                                    <MatchList userBalance={userBalance} userBets={userBets} onPostBet={OnPostBet} tableHeader="NATIONAL CHAMPIONSHIP" matchDetailPath='/match' matches={matchList_} />
                                </div>
                            )
                        })
                    } 
                </div>
                <div className="section">
                    <div >
                        <SectionTitle title="Today's match"></SectionTitle>
                        <MatchList userBalance={userBalance} userBets={userBets} onPostBet={OnPostBet} matchDetailPath='/match' matches={todaysMatch} />
                    </div>
                </div>            
                <div className="section-2">
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
    );
}


const Wrapper = styled.div`
    .section,
    .section-2 {
        margin: 20px 0;
    }
    .section-2 {
        display: flex;
        justify-content: space-between;
        @media only screen and (max-width: 480px) {
            flex-direction: column;
            justify-content: center;
        }
    }
    .latest-match-result {
        min-width: 25%;
        display: flex;
        flex-direction: column;
    }
    .match-result {
        margin-bottom: 20px !important;
        margin-left: auto;
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
    const todaysMatch = await MatchService.getOngoingMatch();
    const latestMatchResult = await MatchService.getLatestGameResult();
    return {
        props: {
            categories: categories || [],
            matches: matches,
            latestMatchResult,
            todaysMatch
        }
    }
}

export default HomePage;