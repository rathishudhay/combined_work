import PropTypes from 'prop-types';
import './parallax.css';

interface ParallaxProps {
    imageUrl: string;
}

const Parallax: React.FC<ParallaxProps> = ({ imageUrl }) => {
    return (
        <div className="parallax-main">
            <div className='parallax'>
                
                {/* <div className="section1">
                    <div className="text">PARALLAX</div>
                </div> */}

                <img className='parallax-image' src={imageUrl} alt="" />

                <div className="section1">
                    <div className="text">
                        PARALLAX
                    </div>
                </div>

            </div >
        </div>
    );
};

Parallax.propTypes = {
    imageUrl: PropTypes.string.isRequired,
};

export default Parallax;
