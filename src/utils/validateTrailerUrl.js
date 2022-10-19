import { regex } from "../constants/constants";

const validateTrailerLink = (trailerLink) => {
    if (regex.test(trailerLink)){
        return trailerLink
    }
    else {
        return 'https://www.youtube.com';
    }
}

export default validateTrailerLink;