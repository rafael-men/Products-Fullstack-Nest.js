import { Link } from 'react-router-dom';
import nest_logo from '../assets/nest-js-icon.png';

const Navbar = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  return (
    <nav className="bg-slate-800 p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <button onClick={onToggleSidebar} className="text-white text-lg md:hidden">
          ☰
        </button>
        
        <div className="flex items-center gap-2">
          <a href='/' className="text-white text-lg font-bold">
            Gerenciador de Recursos com
          </a>
          <img src={nest_logo} alt="logo" width="24" height="24" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

