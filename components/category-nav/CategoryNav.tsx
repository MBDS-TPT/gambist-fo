import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Category } from '../../model/Model';
import CategoryCard from './CategoryCard';

export interface CategoryNavProps {
    className?: string;
    categories: Category[];
    onChangeCategory?: Function;
}

const CategoryNav: React.FC<CategoryNavProps> = ({
    className = '',
    categories = [],
    onChangeCategory
}) => {

    const [categoryList, setCategoryList] = useState(categories.map((category) => {
        return {
            ...category,
            active: category.id == "-1"
        }
    }));

    const OnSelectCategory = (event:any, category: Category) => {
        setCategoryList(categories.map((cat)=>{
            return {
                ...cat,
                active: cat.id === category.id
            };
        }));
        if(onChangeCategory) {
            onChangeCategory(category);
        }
    } 


    return (
        <Wrapper className={["categories", className].join(' ')}>
            <div className="category-header">
                <span>Sports</span>
            </div>
            <div className="categories-container">
                {categoryList && categoryList.map((category) => {
                    return (
                        <CategoryCard active={category.active} onClick={(e:any) => {OnSelectCategory(e, category)}} key={category.id} category={category}/>
                    );
                })}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    &.category-nav {
        min-width: 280px;
        background-color: var(--white);
        margin: 0 10px;
        min-height: 400px;
        border-radius: 5px;
        padding: 10px;
    }
    .category-header span {
        font-weight: 700;
        font-size: 16px;
    }
    .categories-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
    .category {
        width: 120px;
        height: 130px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        text-transform: uppercase;
    }
    .category-link {
        color: #c0c0c0;
    }
    .category-link.active,
    .category-link:hover {
        color: var(--dark);
        background-color: unset;
    }
`;

export default CategoryNav;