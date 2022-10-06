import axios from 'axios';
export async function getPhotos(number, quantity) {
    const { data } = await axios(`https://picsum.photos/v2/list?page=${number}&limit=${quantity}`);
    return data
  }