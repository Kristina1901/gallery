import { useState } from 'react';
import './Favorite.scss';
import Modal from 'components/Modal/Modal';
import imageConverter from 'akamai-image-converter'
const Favorite = ({ array }) => {
  const [showModal, setShowModal] = useState(false);
  const [bigPic, setBigPic] = useState(null);
  const toggleModal = () => {
    setShowModal(prevShow => !prevShow);
  };
  function formatted(img) {
    const src = `https://picsum.photos/id//${img}/${360}/${240}`;
    let result = imageConverter._withOutputFormat(src, 'webp')
    return result

  }
  let list;
  if (array.length === 0 && localStorage.length === 0) {
    list = (
      <div className="divStyleSingle">
        <p className="nofound">No item found</p>
      </div>
    );
  }
  if (array.length !== 0 && localStorage.length === 0) {
    list = (
      <ul className="gallery">
        {array &&
          array.map(({ id, author }) => (
            <li key={id} className="galleryListItem">
              <img
                className="galleryItem"
                alt={author}
                height={'240px'}
                src={formatted(id)}
                width={'360px'}
                onClick={() =>setBigPic(formatted(id))}
              />
            </li>
          ))}
      </ul>
    );
  }
  if (localStorage.length !== 0) {
    let values = [];
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      values.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    list = (
      <ul className="gallery">
        {values.map(({ id, author, download_url }) => (
          <li key={id} className="galleryListItem">
            <img
              className="galleryItem"
              alt={author}
              height={'240px'}
              src={download_url}
              width={'360px'}
              onClick={() => {setBigPic(formatted(id)); setShowModal(true)}}
            />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="wrapper">
      <div className="select"></div>
      <div className="galleryContainer">{list}</div>
      {showModal && (
        <Modal onClose={() => toggleModal()} pic={bigPic} />
      )}
    </div>
  );
};

export default Favorite;
