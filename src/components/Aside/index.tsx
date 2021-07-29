import React, { useState } from 'react';
import Toggle from '../Toggle';

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp,
    MdClose,
    MdMenu,
} from 'react-icons/md' /* yarn add react-icons */

import logoImg from '../../assets/logo.svg';

import { useAuth } from "../../hooks/auth";
import { useTheme } from "../../hooks/theme";

import { 
    Container,
    Header,
    LogoImg,
    Title,
    MenuContainer,
    MenuItemLink,
    MenuItemButton,
    ToggleMenu,
    ThemeToggleFooter,
 } from "./styles";

const Aside: React.FC = () => {
    const { sighOut } = useAuth();
    const { toggleTheme, theme } = useTheme(); //Tras do Hook o thema selecionado

    const [toogleMenuIsOpened, setToogleMenuIsOpened] = useState(false);    
    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false); //Cria um estado para saber se o dark está selecionado    

    const handleToggleMenu = () => {
        setToogleMenuIsOpened(!toogleMenuIsOpened);
    };

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    };

    return (
        <Container menuIsOpen={toogleMenuIsOpened}>
            <Header>
                <ToggleMenu onClick={handleToggleMenu}>
                    { toogleMenuIsOpened ? <MdClose/> : <MdMenu/> } {/*Se o menu está aberto, mostra o icone de fechar, caso contrário mostra o icone do menu para mobile*/}
                </ToggleMenu>


                <LogoImg src ={logoImg} alt="Logo Minha Carteira" />
                <Title>Minha Carteira</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href="/">
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>

                <MenuItemLink href="/list/entry-balance">
                    <MdArrowUpward />
                    Entradas
                </MenuItemLink>

                <MenuItemLink href="/list/exit-balance">
                    <MdArrowDownward />
                    Saídas
                </MenuItemLink>

                <MenuItemButton onClick={sighOut}>
                    <MdExitToApp />
                    Sair
                </MenuItemButton>

            </MenuContainer>

            <ThemeToggleFooter menuIsOpen={toogleMenuIsOpened}>
                <Toggle 
                    labelLeft="Light"
                    labelRight="Dark"
                    checked={darkTheme}
                    onChange={handleChangeTheme} //Chama a função utilizada para lidar com o thema
                />
            </ThemeToggleFooter>
        </Container>        
    );
}

export default Aside;