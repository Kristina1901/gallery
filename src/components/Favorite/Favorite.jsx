import './Favorite.scss'
const Favorite = ({array}) => {
  let list;
  if (array.length === 0 && localStorage.length===0) {
    list = (
      <div className='divStyleSingle'>
        <p className='nofound'>No item found</p>
     </div>
    );
  }
  if (array.length !== 0 && localStorage.length===0) {
    list = (
      <ul className='gallery'>
      {array && (array.map(({ id, author, download_url}) => (
        <li key={id} className='galleryListItem'>
       <img
         className='galleryItem'
         alt={author}
         height={'240px'}
         src={download_url} 
         width={'360px'} />
       </li>
      )))}
    </ul>
    );
  }
 if(localStorage.length!==0) {
  let values = []
   for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    values.push( JSON.parse(localStorage.getItem( localStorage.key( i ))));
   }
   list = (
    <ul className='gallery'>
    {values.map(({ id, author, download_url}) => (
      <li key={id} className='galleryListItem'>
     <img
       className='galleryItem'
       alt={author}
       height={'240px'}
       src={download_url} 
       width={'360px'} />
     </li>
    ))}
  </ul>
  );
  }
   return (
    <div className='wrapper'>
    <div className='select'>
    </div>
    <div className='galleryContainer'>
     {list}
     </div>
    </div>
  );
};

export default Favorite;