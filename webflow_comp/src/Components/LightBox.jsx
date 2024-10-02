import React, { useState, useEffect } from 'react';
import './lightBox.css';
import PREV from '../assets/prev.png';
import NEXT from '../assets/next.png';
import IMG1 from '../assets/img-1.jpg';
import IMG2 from '../assets/img-2.jpg';
import IMG3 from '../assets/img-3.jpg';
import IMG4 from '../assets/img-4.jpg';
import IMG5 from '../assets/img-5.jpg';

const imagesData = [
  {
    img: IMG1,
    title: 'Image 1',
    caption: 'Spiderman 01',
  },
  {
    img: IMG2,
    title: 'Image 2',
    caption: 'Spiderman 02',
  },
  {
    img: IMG3,
    title: 'Image 3',
    caption: 'Astronaut',
  },
  {
    img: IMG4,
    title: 'Image 4',
    caption: 'Car',
  },
  {
    img: IMG5,
    title: 'Image 5',
    caption: 'Reindeer',
  },
];

const LightBox = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const lightboxLinks = document.querySelectorAll('.example-image-link');
    lightboxLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        openLightbox(event.target.parentElement.href, event.target.alt);
      });
    });

    const closeBtn = document.querySelector('.lb-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }

    const overlay = document.getElementById('lightboxOverlay');
    if (overlay) {
      overlay.addEventListener('click', closeLightbox);
    }

    // document.addEventListener('keydown', handleKeydown);

    return () => {
      lightboxLinks.forEach(link => {
        link.removeEventListener('click', (event) => {
          event.preventDefault();
          openLightbox(event.target.parentElement.href, event.target.alt);
        });
      });

      if (closeBtn) {
        closeBtn.removeEventListener('click', closeLightbox);
      }

      if (overlay) {
        overlay.removeEventListener('click', closeLightbox);
      }

      // document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const openLightbox = (src, alt) => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lb-image');
    const loader = document.querySelector('.lb-loader');
    loader.style.display = 'block';
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxImage.onload = () => {
      loader.style.display = 'none';
    };
    lightbox.style.display = 'block';
    document.getElementById('lightboxOverlay').style.display = 'block';
  };

  const closeLightbox = () => {
    document.getElementById('lightbox').style.display = 'none';
    document.getElementById('lightboxOverlay').style.display = 'none';
  };

  const navigateLightbox = (direction) => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + direction;
      if (newIndex < 0) {
        newIndex = imagesData.length - 1;
      } else if (newIndex >= imagesData.length) {
        newIndex = 0;
      }
      return newIndex;
    });
  };

  // const handleKeydown = (event) => {
  //   if (event.key === 'Escape') {
  //     closeLightbox();
  //   } else if (event.key === 'ArrowLeft') {
  //     navigateLightbox(-1);
  //   } else if (event.key === 'ArrowRight') {
  //     navigateLightbox(1);
  //   }
  // };

  return (
    <div>
      <section>
        <div>
          {imagesData.map((image, index) => (
            <a key={index} className="example-image-link" href={image.img} data-lightbox="example-set" data-title={image.caption}>
              <img className="example-image" src={image.img} alt={image.title} />
            </a>
          ))}
        </div>
      </section>
      <div id="lightboxOverlay" className="lightboxOverlay">
        <div className="lb-closeContainer"><a className="lb-close">&#10005;</a></div>
      </div>
      <div id="lightbox" className="lightbox">
        <div className="lb-outerContainer">
          <div className="lb-container">
            <img className="lb-image" src={imagesData[currentIndex].img} alt={imagesData[currentIndex].title} />
            <div className="lb-nav">
              <span className="lb-prev bg-transparent" onClick={() => navigateLightbox(-1)}>
                <img src={PREV} alt="&#9664;" />
              </span>
              <span className="lb-next bg-transparent" onClick={() => navigateLightbox(1)}>
                <img src={NEXT} alt="&#9654;" />
              </span>
            </div>
          </div>
          <div className="lb-loader"><a className="lb-cancel"></a></div>
        </div>
        <div className="lb-dataContainer">
          <div className="lb-data">
            {imagesData[currentIndex].title}
            <div className="lb-details">
              <span className="lb-caption">
                {imagesData[currentIndex].caption}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightBox;
