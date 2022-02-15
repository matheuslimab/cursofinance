import 'styled-components';
import theme from './theme';

declare module 'styled-components' {
    // criando um tipo e atribuindo os campos de theme 
    type ThemeType = typeof theme

    // extendendo o tipo para o Provider em geral
    export interface DefaultTheme extends ThemeType {}
}