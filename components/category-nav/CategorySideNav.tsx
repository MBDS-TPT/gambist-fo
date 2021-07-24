import React, { useCallback } from 'react';
import styled from 'styled-components';
import BetCategory from './ICategory';

export interface CategorySideNavProps {
    className?: string;
    categories: BetCategory[];
}

const CategorySideNav: React.FC<CategorySideNavProps> = ({
    className = '',
    categories
}) => {
    return (
        <Wrapper className={["category-nav", className].join(' ')}>
            <div className="category-title">
                <span>Sports</span>
            </div>
            <ul className="nav flex-column category-list">
                {categories.map((category) => {
                    return (
                        <li key={category.id} className="nav-item">
                            <a className="nav-link" href={"/"}>{ category.label }</a>     
                        </li>
                    );
                })}                
            </ul>
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
    .category-title span {
        font-weight: 700;
        font-size: 16px;
    }
    .nav-item {
        border-bottom: 1px solid lightgray;
    }
    .nav-link {
        color: var(--dark);
        font-weight: 600;
    }
    .nav-link:hover {
        color: var(--dark);
        opacity: 0.7;
    }
`;

export default CategorySideNav;