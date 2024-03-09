import ImageColors from "react-native-image-colors";

export const getColorsFromImage = async (image: string) => {
    const fallBackColor='grey';
    const colors = await ImageColors.getColors(image, {
        fallback: fallBackColor
    });

    switch (colors.platform) {
        case 'ios':
            return colors.background ?? fallBackColor;
                           
        case 'android':
            return  colors.dominant ??  fallBackColor                
            
        default:
            return  fallBackColor;
    }

}
