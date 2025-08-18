import { Link } from "react-router-dom";
import { Package, Users, Layers, Tags } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../global/hooks/useAuth";


const PageStock = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { user } = useAuth();
  const isAdmin = user?.isAdmin; // true o false





  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const menuItems = [
    {
      title: "Productos",
      path: "/products",
      icon: Package,
      gradient: "from-[#BCA88E] via-[#A78A5E] to-[#7D7954]",
      delay: "delay-500",
    },
    {
      title: "Proveedores",
      path: "/supplies",
      icon: Users,
      gradient: "from-[#7D7954] via-[#86918C] to-[#D3CCBE]",
      delay: "delay-200",
    },
    {
      title: "Materia Prima",
      path: "/materials",
      icon: Package,
      gradient: "from-[#BCA88E] via-[#A78A5E] to-[#7D7954]",
      delay: "delay-700",
    },
    {
      title: "Categorías",
      path: "/categories",
      icon: Tags,
      gradient: "from-[#A78A5E] via-[#BCA88E] to-[#DFCCAC]",
      delay: "delay-100",
    },
    {
      title: "Categorías Materia",
      path: "/categories-materia",
      icon: Package,
      gradient: "from-[#BCA88E] via-[#A78A5E] to-[#7D7954]",
      delay: "delay-400",
    },
    {
      title: "Colecciones",
      path: "/colections",
      icon: Layers,
      gradient: "from-[#86918C] via-[#D3CCBE] to-[#F2EBD9]",
      delay: "delay-300",
    },
  ];


  const filteredMenuItems = menuItems.filter(item => {
    // Por ejemplo: solo admin puede ver "Proveedores" y "Empleados"
    if (!isAdmin && ["/record", "/supplies", "/categories", "/categories-materia", "/colections"].includes(item.path)) {
      return false;
    }
    return true; // resto de items visibles para todos
  });

  return (
    <div className="min-h-dvh bg-[#ffff] relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A78A5E]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#BCA88E]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#86918C]/10 rounded-full blur-3xl animate-ping delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#F9F7F3]/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen w-full p-4 sm:px-6 md:px-8 lg:px-10">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-12 transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#6B8E23] via-[#C0B283] to-[#4B5320] bg-clip-text text-transparent mb-2 text-center capitalize leading-snug">              Panel de Control
            </h1>
            <p className="text-base sm:text-lg text-[#D3CCBE] max-w-2xl mx-auto">
              Gestiona tu sistema
            </p>
          </div>

          {/* Grid menu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredMenuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative transform transition-all duration-700 hover:scale-105 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                    } ${item.delay}`}
                >
                  <div className="relative h-44 sm:h-48 md:h-52 lg:h-56 rounded-2xl overflow-hidden backdrop-blur-sm bg-[#F9F7F3]/10 border border-[#DFCCAC]/20 shadow-2xl hover:shadow-[#A78A5E]/25 transition-all duration-500 hover:border-[#BCA88E]/40">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F9F7F3]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    <div className="relative h-full flex flex-col justify-center items-center p-6 text-center">
                      <div className="mb-4 relative">
                        <div
                          className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <div className="w-full h-full rounded-full bg-[#1C1C1C]/80 flex items-center justify-center">
                            <IconComponent className="w-8 h-8 text-[#F9F7F3] group-hover:rotate-12 transition-transform duration-300" />
                          </div>
                        </div>
                        <div
                          className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-30 animate-ping`}
                        ></div>
                      </div>

                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#000000] mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-black group-hover:via-white group-hover:to-gray-500 group-hover:bg-clip-text transition-all duration-300">
                        {item.title}
                      </h3>

                      <p className="text-sm text-[#000000] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Gestionar {item.title.toLowerCase()}
                      </p>
                    </div>

                    <div
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
                    ></div>
                  </div>

                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#F9F7F3]/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 delay-100"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#A78A5E]/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 delay-200"></div>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div
            className={`text-center mt-12 transform transition-all duration-1000 delay-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
          >
            <p className="text-[#000000] text-sm sm:text-base">
              Selecciona una opción para continuar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageStock;
