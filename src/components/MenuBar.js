import { useRef, forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoSrc from '../images/JCBenny.png';

const Overlay = forwardRef((props, ref) => {
  return <div id='overlay' ref={ref}></div>;
});

const Logo = () => {
  const navigate = useNavigate();

  return (
    <img
      id='jcb-logo'
      height='30px'
      width='auto'
      src={LogoSrc}
      alt=''
      onClick={() => {
        navigate('/');
      }}
    />
  );
};

const MenuIcon = (props) => {
  const [xified, setXified] = useState(false);
  const [clickedOnce, setClickedOnce] = useState(false);
  const opacifiables = [props.menuRef, props.overlayRef, props.loginBarRef];

  const toggleOpacity = (elem) => {
    if (elem) {
      elem.current.classList.add(xified ? 'hidden' : 'shown');
      elem.current.classList.remove(xified ? 'shown' : 'hidden');

      var items;
      const isMenu = elem === props.menuRef;
      const isLoginBar = elem === props.loginBarRef;
      if (isMenu || isLoginBar)
        items = elem.current.querySelectorAll(isMenu ? 'a' : '#login-bar > a');

      if (items) {
        if (xified) {
          for (let item of items) item.classList.remove('active');
        } else {
          for (let item of items) item.classList.add('active');
        }
      }
    }
  };

  return (
    <div
      id='menu-icon'
      onClick={() => {
        setXified(!xified);
        if (!clickedOnce) setClickedOnce(true);

        const pageTopElem = document.querySelector('#root :nth-child(1)');
        const coverables = pageTopElem.querySelectorAll(
          ':not(#menu-bar *, #login-bar *, #menu *, #menu, #menu-bar, #login-bar)'
        );
        for (let elem of coverables) elem.style.opacity = xified ? 1 : 0;

        const html = document.documentElement;
        html.style.maxHeight = xified ? 0 : '100%';
        html.style.overflowY = xified ? 'visible' : 'hidden';

        for (let elem of opacifiables) toggleOpacity(elem);
      }}
      className={xified ? 'x-ified' : clickedOnce ? 'de-x-ified' : ''}
    >
      <div style={{ cursor: 'pointer' }}></div>
      <div></div>
      <div style={{ cursor: 'pointer' }}></div>
    </div>
  );
};

const MenuBar = (props) => {
  const overlayRef = useRef(null);
  return (
    <div id='menu-bar'>
      <Overlay ref={overlayRef} />
      <Logo />
      <MenuIcon
        menuRef={props.menuRef}
        overlayRef={overlayRef}
        loginBarRef={props.loginBarRef}
      />
    </div>
  );
};

export default MenuBar;
