import s from 'components/Loader/Loader.module.css';
const Loader = () => (
  <div className={s.loader}>
    <div className={s.ldsRipple}>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loader;
