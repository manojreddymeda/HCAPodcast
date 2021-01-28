import SearchFilter from '../SearchFilter/SearchFilter'

import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';


const Header = (props) => {

  return (
    <div className="flex-fill">
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">HCA Healthcare</NavbarBrand>
        <div className="m-auto" style={{ width: '80%' }} >
          <SearchFilter {...props} />
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
