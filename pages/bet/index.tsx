import { GetServerSideProps, GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BetList from "../../components/bet-list/BetList";
import CategoryNav, { CategoryNavProps } from "../../components/category-nav/CategoryNav";
import Page from "../../components/page-wrapper/Page";
import { Bet, Category } from "../../model/Model";
import { BetService } from "../../services/bet/bet.service";
import { CategoryService } from "../../services/category/category.service";

interface PageProps {
    categories: Category[];
}

const BetPage = (props: PageProps) => {

    const {
        categories
    } = props;

    const [userBets, setUserBets] = useState<Bet[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
    const [allCategorySelected, setAllCategorySelected] = useState<Boolean>(true);

    const categoryNavProps: CategoryNavProps = {
        categories: categories,
        onChangeCategory: async (category: Category) => {
            if(category) {
                setSelectedCategory(category)
                if(category.id == '-1') {
                    setUserBets(await BetService.getUserBets());
                    setAllCategorySelected(true);
                }
                else  {
                    setUserBets(await BetService.getUserBetsByCategory(category.id));
                    setAllCategorySelected(false);
                }
            }
        }
    }

    useEffect(() => {
        setSelectedCategory(categories[0]);
        BetService.getUserBets()
        .then((res) => {
            setUserBets(res);
        })
    }, []);

    return (
        <Wrapper>
            <Page>
                <CategoryNav className="bet-category" { ...categoryNavProps }/>
                <BetList tableTitle={`${selectedCategory.label} (${userBets.length})`} bets={userBets} />
            </Page>
        </Wrapper>
    );
}

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
    return {
        props: {
            bets: [],
            categories: categories
        }
    }
}

const Wrapper = styled.div`
    .page-container {
        min-height: 50vh;
    }
    .bet-category {
        margin-bottom: 20px;
    }
`;

export default BetPage;