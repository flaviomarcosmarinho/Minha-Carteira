import styled, { css } from "styled-components";

interface IContainerProps {
    menuIsOpen: boolean;
}

interface IThemeToggleFooterProps {
    menuIsOpen: boolean;
}

export const Container = styled.div<IContainerProps> `
    grid-area: AS;    
    background-color: ${props => props.theme.colors.secondary};
    padding-left: 20px;
    border-right: 1px solid ${props => props.theme.colors.gray};

    position: relative;

    @media(max-width: 600px){
        padding-left: 20px;
        position: fixed;
        z-index: 2;
        width: 170px;

        height: ${props => props.menuIsOpen ? '100vh' : '70px'};
        overflow: hidden;

        /* Quando quer definir varias propriedades baseado em um condição, tem que importar o css do styled-components*/
        ${props => !props.menuIsOpen && css`
            border: none;
            border-bottom: 1px solid ${props => props.theme.colors.gray};
        `}
    }
`;

export const Header = styled.header `
    height: 70px;
    display: flex;
    align-items: center;    
`;

export const LogoImg = styled.img `
    height: 40px;
    width: 40px;

    @media(max-width: 600px){        
        display: none;
    }
`;

export const Title = styled.h3 `
    color: ${props => props.theme.colors.white};
    margin-left: 10px;

    @media(max-width: 600px){
        display: none;
    }
`;

export const MenuContainer = styled.nav `    
    display: flex;
    flex-direction: column;

    margin-top: 50px;
`;

export const MenuItemLink = styled.a `
    color: ${props => props.theme.colors.info};
    text-decoration: none; /*Remove o sublinhado*/

    margin: 7px 0;
    display: flex;
    align-items: center;

    transition: opacity .3s; /* Transição da opacity vai demorar 3 segundos. */
    &:hover {
        opacity: .7; /* opacity vai de 0 a 1 sendo 1 = 100% */
    }

    > svg {
        font-size: 18px;
        margin-right: 5px;
    }
`;

export const MenuItemButton = styled.button `
    font-size: 16px;
    color: ${props => props.theme.colors.info};

    border: none;
    background: none;

    margin: 7px 0;
    display: flex;
    align-items: center;

    transition: opacity .3s; /* Transição da opacity vai demorar 3 segundos. */
    &:hover {
        opacity: .7; /* opacity vai de 0 a 1 sendo 1 = 100% */
    }

    > svg {
        font-size: 18px;
        margin-right: 5px;
    }
`;

export const ToggleMenu = styled.button `
    width: 40px;
    height: 40px;

    border-radius : 5px;
    font-size: 22px;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.warning};

    transition: opacity .3s;
    &:hover{
        opacity: 0.7;
    }   

    display: none;

    @media(max-width: 600px){
        display: flex; 
        justify-content: center;
        align-items: center;
    }
`;
    
export const ThemeToggleFooter = styled.footer<IThemeToggleFooterProps>`
    display: none;
    position: absolute;
    bottom: 30px;

    @media(max-width: 470px){
        display: ${props => props.menuIsOpen ? 'flex' : 'none'};
    }

`;