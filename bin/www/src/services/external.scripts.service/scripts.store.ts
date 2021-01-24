interface Scripts {
    name: string;
    src: string;
}  
export const ScriptsStore: Scripts[] = [
    {name: 'GAPI', src: 'https://apis.google.com/js/client.js'},
    // {name: 'rangeSlider', src: '../../../assets/js/ion.rangeSlider.min.js'}
    // TODO: add soundcloud and other external API dependencies when needed
];