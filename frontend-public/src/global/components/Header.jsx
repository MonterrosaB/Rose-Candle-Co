// Componente para los encabezados de las paginas
import Title from './Title.jsx';
import Subtitle from './Subtitle.jsx';

const Header = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col text-center gap-6">
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </div>
  );
};

export default Header;