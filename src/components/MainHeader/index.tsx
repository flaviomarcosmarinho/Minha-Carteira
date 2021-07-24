import React, {useMemo, useState} from "react";

import Toggle from '../Toggle'
import emojis from "../../utils/emojis";

import { useTheme } from '../../hooks/theme'

import { 
    Container, 
    Profile, 
    Welcome, 
    UserName 
} from "./styles";

const MainHeader: React.FC = () => {
    const { toggleTheme, theme } = useTheme(); //Tras do Hook o thema selecionado

    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false); //Cria um estado para saber se o dark está selecionado

    //Função utilizada para lidar com a troca do thema
    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    const emoji = useMemo(() => {
        const indice = Math.floor(Math.random() * emojis.length)
        return emojis[indice]
    }, []);    

    return (
        <Container>
            <Toggle 
                labelLeft="Light"
                labelRight="Dark"
                checked={darkTheme}
                onChange={handleChangeTheme} //Chama a função utilizada para lidar com o thema
            />
            
            <Profile>
                <Welcome>Olá, {emoji}</Welcome>
                <UserName>Flávio Marcos Marinho</UserName>
            </Profile>
        </Container>        
    );
}

export default MainHeader;