import { useState, useEffect } from 'react';
import { getPhotos } from '../../services/photo-api';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import limit from '../../select/limit';
import './HomePage.scss';
import imageConverter from 'akamai-image-converter';
const options = [
  { value: 20, label: 'Limit: 20' },
  { value: 40, label: 'Limit: 40' },
  { value: 60, label: 'Limit: 60' },
  { value: 80, label: 'Limit: 80' },
  { value: 100, label: 'Limit: 100' },
];
const HomePage = ({ filterArray }) => {
  const [photos, setPhotos] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setselectedOption] = useState(20);
  const [prev, setPrev] = useState(20);
  useEffect(() => {
     getPhotos(currentPage, selectedOption).then(data => setPhotos(data));
     setPrev(selectedOption)
     console.log(!selectedOption)
     if (selectedOption !== prev) {
      setCurrentPage(1)
     }
  }, [currentPage, selectedOption, prev]);
   const handlePageClick = data => {
    let num = data.selected + 1;
    setCurrentPage(num);
  };
  function formatted(img) {
    const src = `https://picsum.photos/id//${img}/${360}/${240}`;
    let result = imageConverter._withOutputFormat(src, 'webp');
    return result;
  }
  function pagination() {
    let num = 0;
    if (selectedOption === 20) {
      num = 50;
    }
    if (selectedOption === 40) {
      num = 25;
    }
    if (selectedOption === 60) {
      num = 17;
    }
    if (selectedOption === 80) {
      num = 13;
    }
    if (selectedOption === 100) {
      num = 10;
    }
    return num;
  }
  return (
    <div className="container">
      <div className="select">
        <Select
          options={options}
          loadOptions={options}
          defaultValue={selectedOption}
          styles={limit}
          onChange={({ value }) =>
            setselectedOption(prev => {
              setPrev(prev);
              return value;
            })
          }
          placeholder="Limit: 20"
        />
      </div>
      <div className="galleryContainer">
        <ul className="gallery">
          {photos &&
            photos.map(({ id, author }) => (
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
        <ReactPaginate
          forcePage={currentPage - 1}
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
            currentPage === pagination() ? 'buttonDisable' : 'buttonNext'
          }
          nextLinkClassName="pageLinkWord"
        />
      </div>
    </div>
  );
};

export default HomePage;
