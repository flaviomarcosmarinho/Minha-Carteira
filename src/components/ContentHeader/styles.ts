import styled from "styled-components";

interface ITitleContainerProps {
    lineColor: string;
}

export const Container = styled.div `
    width: 100%;
    
    display: flex;
    justify-content:  space-between; /*Suficiente para cada um ficar de um lado*/

    margin-bottom: 25px;    
`;

export const TitleContainer = styled.div<ITitleContainerProps> `
    > h1 { /* o sinal de > é para garantir que vou alterar somente o H1 que está no TitleContainer, e não sair alterando todos h1 que tem no script */
        color: ${props => props.theme.colors.white };

        &::after { /* Pseudo elemento */
            content: ''; 
            display: block;
            width: 55px;
            border-bottom: 10px solid ${props => props.lineColor};
        }
    }
`;

export const Controllers = styled.div `
    display: flex;
`;