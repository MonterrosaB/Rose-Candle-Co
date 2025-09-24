import { Link } from "react-router-dom";
import { Package, Users, Layers, Tags, History } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../global/hooks/useAuth";
import { useTranslation } from "react-i18next"; // Soporte para múltiples idiomas

const PageStock = () => {
  const { t, i18n } = useTranslation("stock"); // Traducciones del namespace "stock"
  const { user } = useAuth();
  const isAdmin = user?.isAdmin;

  const [isLoaded, setIsLoaded] = useState(false);

  // Establece el título del documento basado en el idioma
  useEffect(() => {
    document.title = `${t("document_title")} | Rosé Candle Co.`;
  }, [t, i18n.language]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Menú principal de navegación
  const menuItems = [
    {
      key: "products",
      path: "/products",
      icon: Package,
      gradient: "from-[#BCA88E] via-[#A78A5E] to-[#7D7954]",
      delay: "delay-500",
    },
    {
      key: "suppliers",
      path: "/supplies",
      icon: Users,
      gradient: "from-[#7D7954] via-[#86918C] to-[#D3CCBE]",
      delay: "delay-200",
    },
    {
      key: "raw_materials",
      path: "/materials",
      icon: Package,
      gradient: "from-[#BCA88E] via-[#A78A5E] to-[#7D7954]",
      delay: "delay-700",
    },
    {
      key: "record",
      path: "/record",
      icon: History,
      gradient: "from-[#86918C] via-[#D3CCBE] to-[#F2EBD9]",
      delay: "delay-300",
    },
    {
      key: "categories",
      path: "/categories",
      icon: Tags,
      gradient: "from-[#A78A5E] via-[#BCA88E] to-[#DFCCAC]",
      delay: "delay-100",
    },
    {
      key: "material_categories",
      path: "/categories-materia",
      icon: Package,
      gradient: "from-[#BCA88E] via-[#A78A5E] to-[#7D7954]",
      delay: "delay-400",
    },
    {
      key: "collections",
      path: "/colections",
      icon: Layers,
      gradient: "from-[#86918C] via-[#D3CCBE] to-[#F2EBD9]",
      delay: "delay-300",
    },
  ];

  // Filtrar ítems visibles para usuarios no administradores
  const filteredMenuItems = menuItems.filter((item) => {
    const restrictedPaths = [
      "/record",
      "/supplies",
      "/categories",
      "/categories-materia",
      "/colections",
    ];
    if (!isAdmin && restrictedPaths.includes(item.path)) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-dvh bg-[#ffff] relative overflow-hidden">
      {/* Efectos visuales de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A78A5E]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#BCA88E]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#86918C]/10 rounded-full blur-3xl animate-ping delay-2000"></div>
      </div>

      {/* Partículas flotantes animadas */}
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

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col min-h-screen w-full p-4 sm:px-6 md:px-8 lg:px-10">
        <div className="w-full max-w-6xl mx-auto">

          {/* Encabezado del panel */}
          <div
            className={`text-center mb-12 transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#6B8E23] via-[#C0B283] to-[#4B5320] bg-clip-text text-transparent mb-2 capitalize leading-snug">
              {t("dashboard_title")}
            </h1>
            <p className="text-base sm:text-lg text-[#D3CCBE] max-w-2xl mx-auto">
              {t("dashboard_subtitle")}
            </p>
          </div>

          {/* Menú en forma de tarjetas */}
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
                    {/* Fondo animado de tarjeta */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F9F7F3]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <div className="relative h-full flex flex-col justify-center items-center p-6 text-center">
                      {/* Icono animado */}
                      <div className="mb-4 relative">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                          <div className="w-full h-full rounded-full bg-[#1C1C1C]/80 flex items-center justify-center">
                            <IconComponent className="w-8 h-8 text-[#F9F7F3] group-hover:rotate-12 transition-transform duration-300" />
                          </div>
                        </div>
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-30 animate-ping`} />
                      </div>

                      {/* Título y descripción */}
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#000000] mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-black group-hover:via-white group-hover:to-gray-500 group-hover:bg-clip-text transition-all duration-300">
                        {t(`menu.${item.key}`)}
                      </h3>
                      <p className="text-sm text-[#000000] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        {t("manage")} {t(`menu.${item.key}`).toLowerCase()}
                      </p>
                    </div>

                    {/* Línea decorativa inferior */}
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />
                  </div>

                  {/* Partículas decorativas de hover */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#F9F7F3]/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 delay-100" />
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#A78A5E]/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 delay-200" />
                </Link>
              );
            })}
          </div>

          {/* Footer del panel */}
          <div
            className={`text-center mt-12 transform transition-all duration-1000 delay-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
          >
            <p className="text-[#000000] text-sm sm:text-base">
              {t("footer_message")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageStock;
