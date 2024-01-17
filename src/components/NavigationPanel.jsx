import '../styles/nav.scss';
import { NavLink } from 'react-router-dom';


const NavigationPanel = () => {
  return (
    <header className='header'>
        <NavLink to="/" className={'nav-item'}>
            Home
        </NavLink>
    </header>
  )
}

export default NavigationPanel