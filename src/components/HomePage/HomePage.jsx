import { useState, useEffect } from 'react';
import { getPhotos } from '../../services/photo-api';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import limit from '../../select/limit';
import './HomePage.scss';
import Loader from '../Loader/Loader';
import imageConverter from 'akamai-image-converter'
const options = [
  { value: 20, label: 'Limit: 20' },
  { value: 40, label: 'Limit: 40' },
  { value: 60, label: 'Limit: 60' },
  { value: 80, label: 'Limit: 80' },
  { value: 100, label: 'Limit: 100' },
];
const HomePage = ({ filterArray }) => {
  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setselectedOption] = useState(20);
  useEffect(() => {
    if (currentPage === 1 && selectedOption === 20) {
      getPhotos(1, 20).then(data => setPhotos(data));
    }
    if (currentPage === 1 && selectedOption !== 20) {
      getPhotos(1, selectedOption).then(data => setPhotos(data));
    }
    if (currentPage !== 1 || !selectedOption) {
      setLoading(true);
      getPhotos(currentPage, selectedOption)
        .then(data => setPhotos(data))
        .then(setLoading(false));
    }
    if(selectedOption > 20 && currentPage ===50) {
       setCurrentPage(1)
    }
    if(selectedOption > 40 && currentPage === 25) {
      setCurrentPage(1)
   }
   if(selectedOption > 80 && currentPage ===13) {
    setCurrentPage(1)
 }
  
  }, [currentPage, selectedOption]);
  const handlePageClick = data => {
    let num = data.selected + 1;
    setCurrentPage(num);
  };
  function formatted(img) {
    const src = `https://picsum.photos/id//${img}/${360}/${240}`;
    let result = imageConverter._withOutputFormat(src, 'webp')
    return result

  }
  function pagination () {
    let num = 0
    if (selectedOption === 20) {
      num = 50
    }
    if(selectedOption === 40) {
      num = 25
    }
    if(selectedOption === 60) {
      num = 17
    }
    if(selectedOption === 80) {
      num = 13
    }
    if(selectedOption === 100) {
      num = 10
    }
    return num
  }
  return (
    <div className="container">
      <div className="select">
        <Select
          options={options}
          loadOptions={options}
          defaultValue={selectedOption}
          styles={limit}
          onChange={({ value }) => setselectedOption(value)}
          placeholder="Limit: 20"
        />
      </div>
      <div className="galleryContainer">
        {loading === false ? (
          <ul className="gallery">
            {photos &&
              photos.map(({ id, author, download_url }) => (
                <li key={id} className="galleryListItem">
                  <div className="modalName">
                    <button
                      className="buttonLike"
                      onClick={() => filterArray(photos, id)}
                    ></button>
                  </div>
                  <img
                    className="galleryItem"
                    alt={author}
                    height={'240px'}
                    src={formatted(id)}
                    width={'360px'}
                  />
                </li>
              ))}
          </ul>
        ) : (
          <Loader />
        )}
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={pagination()}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          pageClassName="button"
          pageLinkClassName="pageLink"
          breakLinkClassName="buttonDots"
          previousClassName={currentPage !== 1 ? 'buttonPrev' : 'buttonDisable'}
          containerClassName="buttonContainer"
          activeClassName="activePage "
          previousLinkClassName="pageLinkWord"
          nextClassName={
            currentPage === pagination()
              ? 'buttonDisable'
              : 'buttonNext'
          }
          nextLinkClassName="pageLinkWord"
        />
      </div>
    </div>
  );
};

export default HomePage;
