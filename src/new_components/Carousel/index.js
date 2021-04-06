import PropTypes from 'prop-types'
import Carousel, {Dots} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

const Carousels = ({slidesList}) => {
    const [value, setValue] = useState(0);

    const onChange = e => setValue(e);
    return (
        <>
            carousel
        </>
    )
}

Carousels.propTypes = {

}

export default Carousels
