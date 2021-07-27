import styled from "styled-components";

/* 
 *   Layout
 *   MH = Main Header
 *   AS = Aside
 *   CT = Content
    */
export const Grid = styled.div `
    display: grid;
    grid-template-columns: 250px auto;
    grid-template-rows: 70px auto;

    grid-template-areas:
    'AS MH'
    'AS CT';

    height: 100vh; /* view height */

    @media(max-width: 600px){ /* utilizando @media para esconder o Aside para resoluções menores que 600px */
        grid-template-columns: 100%;
        grid-template-rows: 70px auto;

        grid-template-areas:
        'MH'
        'CT';
    }
`;