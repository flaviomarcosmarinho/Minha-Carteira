import styled from "styled-components";

export const Container = styled.div ``;

export const Content = styled.main ``;

export const Filters = styled.div `
    width: 100%;

    display: flex;
    justify-content: center;

    margin-bottom: 30px;

    .tag-filter {
        font-size: 18px;
        font-weight: 500;

        background: none;
        color: ${props => props.theme.colors.white};

        margin: 0 10px;

        opacity: 0.4; //Default é ficar mais apagado        
        transition: opacity .3s;
        :hover {
            opacity: .7;
        }                
    }

    .tag-filter-recurrent::after { /* Criação da barra embaixo dos filtros */
            content: '';
            display: block;
            width: 55px;
            margin: 0 auto; /* centraliza */
            border-bottom: 10px solid ${props => props.theme.colors.success};
    } 

    .tag-filter-eventual::after { /* Criação da barra embaixo dos filtros */
            content: '';
            display: block;
            width: 55px;
            margin: 0 auto;
            border-bottom: 10px solid ${props => props.theme.colors.warning};
    }

    .tag-actived {
        opacity: 1; //caso ative, fica aceso
    }
`;