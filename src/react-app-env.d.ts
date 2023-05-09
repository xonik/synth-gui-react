/// <reference types="react-scripts" />
// This is here because something keeps changing
// tsconfig
// "jsx": "react"
// to
// "jsx": "react-jsx"
// https://stackoverflow.com/questions/67053345/could-not-find-a-declaration-file-for-module-react-jsx-runtime
declare module 'react/jsx-runtime' {
    const content: string;
    export default content;
}