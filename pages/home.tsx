import { GetServerSideProps } from 'next';
import React, { useState } from 'react'; 
import { useEffect } from 'react';
import styled from 'styled-components';
import { BannerProps } from '../components/banner/Banner';
import CategoryNav, { CategoryNavProps } from '../components/category-nav/CategoryNav';
import MatchCard from '../components/match-detail/MatchCard';
import MatchCardResult from '../components/match-detail/MatchCardResult';
import MatchList from '../components/match-list/MatchList';
import Page from '../components/page-wrapper/Page';
import SectionTitle from '../components/section-title/SectionTitle';
import { Bet, Category, Match } from '../model/Model';
import { AuthService } from '../services/auth/auth.service';
import { BetService } from '../services/bet/bet.service';
import { CategoryService } from '../services/category/category.service';
import { MatchService } from '../services/match/match.service';
interface PageProps {
    categories: any;
    matches: any;
    latestMatchResult: Match[];
}

const HomePage = (props: PageProps) => {
    
    const {
        categories,
        matches,
        latestMatchResult
    } = props;

    const [matchList, setMatchList] = useState<Match[]>([]);
    const [upcomingMatch, setUpcomingMatch] = useState<Match>();
    const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
    const [allCategorySelected, setAllCategorySelected] = useState<Boolean>(true);
    const [userBets, setUserBets] = useState<Bet[]>([]);

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
                    setAllCategorySelected(false);
                }
            }
        }
    }

    const OnPostBet = async (bet: any) => {
        BetService.postBet(bet)
        .then((res) => {
            BetService.addBetToLS(res);
            setUserBets([
                ...userBets,
                res
            ]);
        });
    }

    useEffect(() => {
        setUpcomingMatch(MatchService.getUpcomingMatch(matches, categories));
        BetService.getUserBets()
        .then((res) => {
            setUserBets(res);
        })
    }, []);

    return (
        <Wrapper>
            <Page>
                <div className="section">
                    <CategoryNav { ...categoryNavProps }/>
                    
                    {!allCategorySelected ? 
                        <>
                            <SectionTitle title={`${selectedCategory.label} (${matchList.length})`} />
                            <MatchList userBets={userBets} onPostBet={OnPostBet} tableHeader="NATIONAL CHAMPIONSHIP" matchDetailPath='/match' matches={matchList} />
                        </>
                    : 
                        categories.filter((category: Category) => category.id != "-1").map((category: Category) => {
                            const matchList_ = MatchService.getUpcomingMatchByCategoryName(matches, category.label)
                            return (
                                <div key={category.id}>
                                    <SectionTitle title={`${category.label} (${matchList_.length})`} />
                                    <MatchList userBets={userBets} onPostBet={OnPostBet} tableHeader="NATIONAL CHAMPIONSHIP" matchDetailPath='/match' matches={matchList_} />
                                </div>
                            )
                        })
                    } 

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
    }
    .latest-match-result {
        min-width: 25%;
    }
    .match-result {
        margin: 0 0 20px 0 !important;
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
    return {
        props: {
            categories: categories || [],
            matches: matches,
            latestMatchResult
        }
    }
}

export default HomePage;