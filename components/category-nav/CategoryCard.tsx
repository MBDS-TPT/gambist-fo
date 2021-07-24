import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Category } from '../../model/Model';
import CTA from '../cta/CTA';
import CategoryIcon from '../svg-icons/CategoryIcon';

export interface CategoryCardProps {
    className?: string;
    category: Category;
    onClick: Function;
    active: Boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
    className = '',
    category,
    onClick,
    active = false
}) => {

    // const [active, setActive] = useState<Boolean>(false);

    const OnClick = (e:any) => {
        if(onClick)onClick(e);
        e.preventDefault();
    }

    

    return (
        <Wrapper onClick={OnClick} className={["category-link", active ? 'active' : '', className].join(' ')}>
            <div className="category">
                <CategoryIcon color={active ? 'var(--dark)' : 'var(--gray)'} categoryName={category.label} />
                { category.label }
            </div>
        </Wrapper>
    )
}

const Wrapper = styled(CTA)`
    .category {
        width: 120px;
        height: 130px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        font-weight: 700;
        text-transform: uppercase;
    }
    .category-link {
        color: var(--gray);
    }
    svg {
        /* fill: var(--gray); */
        margin-bottom: 10px;
    }
    .category-link.active,
    .category-link:hover svg {
        fill: var(--dark);
    }
    .category-link:hover {
        color: var(--dark);
        background-color: unset;
    }
`;

export default CategoryCard;