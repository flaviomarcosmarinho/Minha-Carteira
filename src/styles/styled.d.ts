import "styled-components";

// Sobrescrevendo o thema DefaultTheme para trocar as cores
declare module 'styled-components' {
    export interface DefaultTheme {
        title: string;

        colors: {
            primary: string;
            secondary: string;
            tertiary: string;

            white: string;
            black: string;
            gray: string;

            success: string;
            info: string;
            warning: string;
        },
    }
}