// PageSettings.jsx
import React, { useState, useEffect } from 'react';
import { Settings, Tag, Sparkles, ShoppingBag, Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import PrincipalDiv from "../../../global/components/PrincipalDiv";
import TitleH1 from "../../../global/components/TitleH1";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useSettings from "../hooks/usePersonalize";
import useCollections from "../../PageCollections/hooks/useCollections"; // Hook para las colecciones

export default function PageSettings() {
  const [activeTab, setActiveTab] = useState('marquee');
  const [editMode, setEditMode] = useState({});
  const [tempData, setTempData] = useState({});
  const [newProductId, setNewProductId] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const methods = useForm();
  const { collections } = useCollections(methods);

  const {
    settings,
    loading,
    updateMarquee,
    updateSeasonalCollection,
    updateInspiration,
    updateRecommendedProducts,
    removeRecommendedProduct,
  } = useSettings();

  useEffect(() => {
    document.title = "Personalizar | Rosé Candle Co.";
  }, []);

  const tabs = [
    { id: 'marquee', label: 'Marquee', icon: Tag },
    { id: 'seasonal', label: 'Temporada', icon: Sparkles },
    { id: 'inspiration', label: 'Inspiración', icon: Sparkles },
    //{ id: 'recommended', label: 'Recomendados', icon: ShoppingBag }
  ];

  const handleEdit = (section) => {
    setEditMode({ ...editMode, [section]: true });
    // Para seasonalCollection, asegurarse de que idCollection contenga el ID correcto
    if (section === 'seasonalCollection' && settings[section]) {
      setTempData({
        ...tempData,
        [section]: {
          ...settings[section],
          idCollection: settings[section].idCollection?._id || settings[section].idCollection
        }
      });
    } else {
      setTempData({ ...tempData, [section]: { ...settings[section] } });
    }
  };

  const handleCancel = (section) => {
    setEditMode({ ...editMode, [section]: false });
    setTempData({ ...tempData, [section]: {} });
    if (section === 'seasonalCollection') {
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  // Manejo de selección de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejo de guardado
  const handleSave = async (section) => {
    try {
      switch (section) {
        case 'marquee':
          await updateMarquee(tempData[section].name);
          break;
        case 'seasonalCollection':
          // Enviar solo el ID de la colección, no el objeto poblado
          await updateSeasonalCollection({
            idCollection: tempData[section].idCollection,
            name: tempData[section].name,
            description: tempData[section].description,
            availableUntil: tempData[section].isConstant ? '' : tempData[section].availableUntil,
            isConstant: tempData[section].isConstant || false,
            image: selectedImage // Agregar la imagen
          });
          // Limpiar imagen después de guardar
          setSelectedImage(null);
          setImagePreview(null);
          break;
        case 'inspiration':
          await updateInspiration(tempData[section]);
          break;
        default:
          break;
      }
      setEditMode({ ...editMode, [section]: false });
    } catch (error) {
      // desde el hook
    }
  };

  // Manejo de cambios en los inputs
  const handleChange = (section, field, value) => {
    setTempData({
      ...tempData,
      [section]: { ...tempData[section], [field]: value }
    });
  };

  const handleUpdateRecommendedProducts = async () => {
    try {
      await updateRecommendedProducts({
        name: settings.recommendedProducts.name,
        description: settings.recommendedProducts.description,
        products: settings.recommendedProducts.products
      });
    } catch (error) {
      // desde el hook
    }
  };

  const addProduct = async () => {
    if (!newProductId) {
      toast.error("Por favor ingresa un ID de producto");
      return;
    }

    if (settings.recommendedProducts.products.length >= 4) {
      toast.error("Máximo 4 productos permitidos");
      return;
    }

    try {
      const updatedProducts = [
        ...settings.recommendedProducts.products,
        { idProduct: newProductId }
      ];

      await updateRecommendedProducts({
        name: settings.recommendedProducts.name,
        description: settings.recommendedProducts.description,
        products: updatedProducts
      });

      setNewProductId('');
    } catch (error) {
      // desde el hook
    }
  };

  const removeProduct = async (productId) => {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Se quitará de la lista de recomendados",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await removeRecommendedProduct(productId);
      } catch (error) {
        // El error ya se maneja en el hook
      }
    }
  };

  if (loading || !settings) {
    return (
      <PrincipalDiv>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Cargando configuración...</div>
        </div>
      </PrincipalDiv>
    );
  }

  // Filtrar colecciones activas (no eliminadas)
  const activeCollections = collections?.filter(col => !col.deleted) || [];

  const renderContent = () => {
    const buttonStyle = { backgroundColor: '#7D9775' };
    const buttonHover = (e) => e.currentTarget.style.backgroundColor = '#6f865f';
    const buttonLeave = (e) => e.currentTarget.style.backgroundColor = '#7D9775';

    switch (activeTab) {
      case 'marquee':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-semibold text-gray-800">Configuración de Marquee</h2>
              {!editMode.marquee ? (
                <button
                  onClick={() => handleEdit('marquee')}
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 text-white rounded-md hover:opacity-90 transition-colors shadow-md"
                  style={buttonStyle}
                  onMouseEnter={buttonHover}
                  onMouseLeave={buttonLeave}
                >
                  <Edit2 size={16} />
                  Editar
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleSave('marquee')}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 text-white rounded-md shadow-md transition-colors"
                    style={buttonStyle}
                    onMouseEnter={buttonHover}
                    onMouseLeave={buttonLeave}
                  >
                    <Save size={16} />
                    Guardar
                  </button>
                  <button
                    onClick={() => handleCancel('marquee')}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    <X size={16} />
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Texto del Marquee</label>
              {editMode.marquee ? (
                <input
                  type="text"
                  value={tempData.marquee?.name || ''}
                  onChange={(e) => handleChange('marquee', 'name', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C2A878] focus:border-transparent text-gray-800 text-sm sm:text-base"
                  placeholder="Escribe el texto del marquee..."
                />
              ) : (
                <div className="bg-gray-50 px-4 sm:px-6 py-3 rounded-md border border-gray-200 text-gray-800 font-medium text-sm sm:text-base">
                  {settings.marquee?.name || 'Sin configurar'}
                </div>
              )}
            </div>
          </div>
        );

      case 'seasonal':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-semibold text-gray-800">Colección de Temporada</h2>
              {!editMode.seasonalCollection ? (
                <button
                  onClick={() => handleEdit('seasonalCollection')}
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 text-white rounded-md hover:opacity-90 transition-colors shadow-md"
                  style={buttonStyle}
                  onMouseEnter={buttonHover}
                  onMouseLeave={buttonLeave}
                >
                  <Edit2 size={16} />
                  Editar
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleSave('seasonalCollection')}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 text-white rounded-md shadow-md transition-colors"
                    style={buttonStyle}
                    onMouseEnter={buttonHover}
                    onMouseLeave={buttonLeave}
                  >
                    <Save size={16} />
                    Guardar
                  </button>
                  <button
                    onClick={() => handleCancel('seasonalCollection')}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    <X size={16} />
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 space-y-6">
              {/* Seleccionar Colección */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  Seleccionar Colección
                </label>
                {editMode.seasonalCollection ? (
                  <select
                    value={tempData.seasonalCollection?.idCollection || ''}
                    onChange={(e) => {
                      const selectedCollection = activeCollections.find(col => col._id === e.target.value);
                      if (selectedCollection) {
                        setTempData({
                          ...tempData,
                          seasonalCollection: {
                            ...tempData.seasonalCollection,
                            idCollection: selectedCollection._id,
                            name: selectedCollection.name
                          }
                        });
                      }
                    }}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C2A878] focus:border-transparent text-gray-800 text-sm sm:text-base"
                  >
                    <option value="">Selecciona una colección</option>
                    {activeCollections.map((collection) => (
                      <option key={collection._id} value={collection._id}>
                        {collection.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="bg-gray-50 px-4 sm:px-6 py-3 rounded-md border border-gray-200 text-gray-800 font-medium text-sm sm:text-base">
                    {settings.seasonalCollection?.idCollection?.name || settings.seasonalCollection?.name || 'Sin colección seleccionada'}
                  </div>
                )}
                {editMode.seasonalCollection && activeCollections.length === 0 && (
                  <p className="text-xs sm:text-sm text-red-500 mt-1">
                    No hay colecciones disponibles. Crea una colección primero.
                  </p>
                )}
              </div>

              {/* Imagen de la Colección */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  Imagen de la Colección
                </label>
                {editMode.seasonalCollection ? (
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C2A878] focus:border-transparent text-gray-800 text-sm sm:text-base"
                    />
                    {(imagePreview || settings.seasonalCollection?.image) && (
                      <div className="mt-3">
                        <img
                          src={imagePreview || settings.seasonalCollection?.image}
                          alt="Preview"
                          className="w-full max-w-md h-48 object-cover rounded-md border border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {settings.seasonalCollection?.image ? (
                      <img
                        src={settings.seasonalCollection.image}
                        alt="Imagen de colección"
                        className="w-full max-w-md h-48 object-cover rounded-md border border-gray-200"
                      />
                    ) : (
                      <div className="bg-gray-50 px-4 sm:px-6 py-3 rounded-md border border-gray-200 text-gray-800 text-sm sm:text-base">
                        Sin imagen
                      </div>
                    )}
                  </div>
                )}
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Formato: JPG, PNG. Tamaño recomendado: 800x600px
                </p>
              </div>

              {/* Checkbox Colección Permanente */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  {editMode.seasonalCollection ? (
                    <>
                      <input
                        type="checkbox"
                        checked={tempData.seasonalCollection?.isConstant || false}
                        onChange={(e) => {
                          setTempData({
                            ...tempData,
                            seasonalCollection: {
                              ...tempData.seasonalCollection,
                              isConstant: e.target.checked,
                              availableUntil: e.target.checked ? '' : tempData.seasonalCollection?.availableUntil
                            }
                          });
                        }}
                        className="w-4 h-4 text-[#7D9775] bg-white border-gray-300 rounded focus:ring-[#C2A878] focus:ring-2"
                      />
                      <span className="text-sm sm:text-base font-medium text-gray-700">
                        Colección permanente (siempre disponible)
                      </span>
                    </>
                  ) : (
                    <div className="bg-gray-50 px-4 sm:px-6 py-3 rounded-md border border-gray-200 w-full">
                      <span className={`text-sm sm:text-base font-medium ${settings.seasonalCollection?.isConstant ? 'text-green-600' : 'text-gray-600'}`}>
                        {settings.seasonalCollection?.isConstant ? '✓ Colección permanente' : 'Colección temporal'}
                      </span>
                    </div>
                  )}
                </label>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 ml-6">
                  Si está marcada, la colección estará siempre disponible sin fecha límite
                </p>
              </div>

              {/* Disponible hasta */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  Disponible hasta
                </label>
                {editMode.seasonalCollection ? (
                  <>
                    <input
                      type="date"
                      disabled={tempData.seasonalCollection?.isConstant}
                      value={
                        tempData.seasonalCollection?.availableUntil && !tempData.seasonalCollection?.isConstant
                          ? (() => {
                            try {
                              // Extraer la fecha del string "Disponible hasta el 31 de diciembre de 2025"
                              const dateString = tempData.seasonalCollection.availableUntil.replace('Disponible hasta el ', '');
                              const months = {
                                'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3,
                                'mayo': 4, 'junio': 5, 'julio': 6, 'agosto': 7,
                                'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
                              };

                              const parts = dateString.match(/(\d+)\s+de\s+(\w+)\s+de\s+(\d+)/);
                              if (parts) {
                                const day = parseInt(parts[1]);
                                const month = months[parts[2].toLowerCase()];
                                const year = parseInt(parts[3]);
                                const date = new Date(year, month, day);
                                return date.toISOString().split('T')[0];
                              }
                              return '';
                            } catch (e) {
                              return '';
                            }
                          })()
                          : ''
                      }
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        const formattedDate = selectedDate.toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        });

                        setTempData({
                          ...tempData,
                          seasonalCollection: {
                            ...tempData.seasonalCollection,
                            availableUntil: `Disponible hasta el ${formattedDate}`
                          }
                        });
                      }}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C2A878] focus:border-transparent text-gray-800 text-sm sm:text-base ${tempData.seasonalCollection?.isConstant ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    />
                    {tempData.seasonalCollection?.isConstant && (
                      <p className="text-xs sm:text-sm text-green-600 mt-1 font-medium">
                        Esta colección es permanente, no requiere fecha límite
                      </p>
                    )}
                  </>
                ) : (
                  <div className="bg-gray-50 px-4 sm:px-6 py-3 rounded-md border border-gray-200 text-gray-800 font-medium text-sm sm:text-base">
                    {settings.seasonalCollection?.isConstant ?
                      'Siempre disponible' :
                      (settings.seasonalCollection?.availableUntil || 'Sin fecha establecida')
                    }
                  </div>
                )}
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {tempData.seasonalCollection?.isConstant || settings.seasonalCollection?.isConstant ?
                    'Colección sin fecha de vencimiento' :
                    'Esta colección estará disponible hasta la fecha seleccionada'
                  }
                </p>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Descripción</label>
                {editMode.seasonalCollection ? (
                  <textarea
                    value={tempData.seasonalCollection?.description || ''}
                    onChange={(e) => handleChange('seasonalCollection', 'description', e.target.value)}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C2A878] focus:border-transparent text-gray-800 text-sm sm:text-base"
                    placeholder="Descripción de la colección de temporada..."
                  />
                ) : (
                  <div className="bg-gray-50 px-4 sm:px-6 py-3 rounded-md border border-gray-200 text-gray-800 min-h-[100px] text-sm sm:text-base">
                    {settings.seasonalCollection?.description || 'Sin descripción'}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'inspiration':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-semibold text-gray-800">Sección de Inspiración</h2>
              {!editMode.inspiration ? (
                <button
                  onClick={() => handleEdit('inspiration')}
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 text-white rounded-md hover:opacity-90 transition-colors shadow-md"
                  style={buttonStyle}
                  onMouseEnter={buttonHover}
                  onMouseLeave={buttonLeave}
                >
                  <Edit2 size={16} />
                  Editar
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleSave('inspiration')}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 text-white rounded-md shadow-md transition-colors"
                    style={buttonStyle}
                    onMouseEnter={buttonHover}
                    onMouseLeave={buttonLeave}
                  >
                    <Save size={16} />
                    Guardar
                  </button>
                  <button
                    onClick={() => handleCancel('inspiration')}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    <X size={16} />
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 space-y-6">
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  Frase Inspiracional
                </label>
                {editMode.inspiration ? (
                  <textarea
                    value={tempData.inspiration?.phrase || ''}
                    onChange={(e) => handleChange('inspiration', 'phrase', e.target.value)}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C2A878] focus:border-transparent text-gray-800 text-sm sm:text-base"
                    placeholder="Escribe una frase inspiradora..."
                    maxLength={300}
                  />
                ) : (
                  <div className="bg-gray-50 px-4 sm:px-6 py-3 rounded-md border border-gray-200 text-gray-800 italic text-lg whitespace-pre-line">
                    {settings.inspiration?.phrase || 'Sin frase configurada'}
                  </div>
                )}
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Máximo 300 caracteres</p>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                {editMode.inspiration ? (
                  <textarea
                    value={tempData.inspiration?.description || ''}
                    onChange={(e) => handleChange('inspiration', 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C2A878] focus:border-transparent text-gray-800 text-sm sm:text-base"
                    placeholder="Descripción breve..."
                    maxLength={100}
                  />
                ) : (
                  <div className="bg-gray-50 px-4 sm:px-6 py-3 rounded-md border border-gray-200 text-gray-800 min-h-[120px] text-sm sm:text-base">
                    {settings.inspiration?.description || 'Sin descripción'}
                  </div>
                )}
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Máximo 100 caracteres</p>
              </div>
            </div>
          </div>
        );

      case 'recommended':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-semibold text-gray-800">Productos Recomendados</h2>
              <button
                onClick={handleUpdateRecommendedProducts}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-md shadow-md transition-colors"
                style={buttonStyle}
                onMouseEnter={buttonHover}
                onMouseLeave={buttonLeave}
              >
                <Save size={16} />
                Guardar Cambios
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 space-y-6">
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Título de la Sección</label>
                <input
                  type="text"
                  value={settings.recommendedProducts?.name || ''}
                  onChange={(e) => {
                    settings.recommendedProducts.name = e.target.value;
                  }}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C2A878] focus:border-transparent text-gray-800 text-sm sm:text-base"
                  placeholder="Ej: Productos en liquidación"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Descripción</label>
                <textarea
                  value={settings.recommendedProducts?.description || ''}
                  onChange={(e) => {
                    settings.recommendedProducts.description = e.target.value;
                  }}
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C2A878] focus:border-transparent text-gray-800 text-sm sm:text-base"
                  placeholder="Descripción opcional..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm sm:text-base font-medium text-gray-700">Productos</label>
                  <span className="text-sm sm:text-base text-gray-500">
                    {settings.recommendedProducts?.products?.length || 0}/4
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  {settings.recommendedProducts?.products?.map((product, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center bg-gray-50 px-4 sm:px-6 py-3 rounded-md border border-gray-200">
                      <div>
                        <p className="text-gray-800 font-medium">
                          {product.idProduct?.name || 'Producto sin nombre'}
                        </p>
                        <p className="text-sm text-gray-600">
                          ID: {product.idProduct?._id || product.idProduct}
                        </p>
                      </div>
                      <button
                        onClick={() => removeProduct(product.idProduct?._id || product.idProduct)}
                        className="mt-2 sm:mt-0 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}

                  {(!settings.recommendedProducts?.products || settings.recommendedProducts.products.length === 0) && (
                    <div className="text-center py-8 text-gray-500 text-sm sm:text-base">
                      No hay productos agregados
                    </div>
                  )}
                </div>

                {(!settings.recommendedProducts?.products || settings.recommendedProducts.products.length < 4) && (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={newProductId}
                      onChange={(e) => setNewProductId(e.target.value)}
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C2A878] focus:border-transparent text-gray-800 text-sm sm:text-base"
                      placeholder="ID del producto..."
                    />
                    <button
                      onClick={addProduct}
                      className="flex items-center justify-center gap-2 px-6 py-3 text-white rounded-md shadow-md transition-colors"
                      style={buttonStyle}
                      onMouseEnter={buttonHover}
                      onMouseLeave={buttonLeave}
                    >
                      <Plus size={18} />
                      Agregar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PrincipalDiv>
      <TitleH1 title="Personalizar" />

      {/* Tabs - Desktop */}
      <div className="hidden md:block mb-6">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-2">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all text-sm sm:text-base ${activeTab === tab.id
                    ? 'text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  style={activeTab === tab.id ? { backgroundColor: '#7D9775' } : {}}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs - Mobile */}
      <div className="md:hidden mb-6">
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-800 shadow-md text-sm"
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div className="overflow-x-auto">
        {renderContent()}
      </div>
    </PrincipalDiv>
  );
}