// src/ImageGallery.js
import React, { useState, useEffect, useRef, useCallback } from 'react';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const observer = useRef();

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.example.com/images?page=${page}`); // Replace with your actual API endpoint
      const data = await response.json();
      setImages((prevImages) => [...prevImages, ...data]);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
    setLoading(false);
  };

  const lastImageElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading]);

  const lazyLoadImages = useCallback(() => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    const images = document.querySelectorAll('.lazy-load');
    images.forEach((image) => {
      if (image.src === '') {
        imageObserver.observe(image);
      }
    });

    return () => {
      if (imageObserver) imageObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    lazyLoadImages();
  }, [images, lazyLoadImages]);

  return (
    <div className="image-gallery">
      {images.map((image, index) => {
        if (images.length === index + 1) {
          return (
            <img
              ref={lastImageElementRef}
              key={image.id}
              data-src={image.url}
              alt={image.title}
              className="lazy-load"
              src=""
            />
          );
        } else {
          return (
            <img
              key={image.id}
              data-src={image.url}
              alt={image.title}
              className="lazy-load"
              src=""
            />
          );
        }
      })}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ImageGallery;
