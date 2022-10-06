import { useState, useEffect } from 'react';
import { getPhotos } from '../../services/photo-api';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import limit from '../../select/limit';
import './HomePage.scss';
import Loader from '../Loader/Loader';

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
    if (currentPage === 1) {
      getPhotos(1, 100).then(data => setPhotos(data.slice(0, selectedOption)));
    }
    if (currentPage !== 1) {
      setLoading(true);
      getPhotos(currentPage, 100)
        .then(data => setPhotos(data.slice(0, selectedOption)))
        .then(setLoading(false));
    }
  }, [currentPage, selectedOption]);
  const handlePageClick = data => {
    let num = data.selected + 1;
    setCurrentPage(num);
  };
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
                    src={download_url}
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
          pageCount={10}
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
            currentPage !== 1 && photos.length < selectedOption
              ? 'buttonDisable'
              : 'buttonNext'
          }
          nextLinkClassName="pageLinkWord{"
        />
      </div>
    </div>
  );
};

export default HomePage;
