import { useState, useEffect } from "react";
import { Pencil, Trash, X } from "lucide-react";
import Button from "./Button";

const DataGrid = ({
  columns,
  rows,
  deleteRow,
  updateRow,
  loading,
  primaryBtnText,
  secondaryBtnText,
  onClickPrimaryBtn,
  onClickSecondaryBtn,
  showDelete = true,
  checkbox = false,
  checkboxText,
  checkboxChecked = false,
  onCheckboxChange = () => { },
  editable = true
}) => {

  const getNestedValue = (obj, path) => {
    try {
      const value = path.split('.').reduce((acc, key) => {
        const arrayMatch = key.match(/^(\w+)\[(\d+|last)\]$/);
        if (arrayMatch) {
          const [, arrKey, index] = arrayMatch;
          const realIndex = index === "last" ? acc?.[arrKey]?.length - 1 : Number(index);
          return acc?.[arrKey]?.[realIndex];
        }
        return acc?.[key];
      }, obj);

      if (
        typeof value === "string" &&
        value.includes("-") &&
        value.includes("T") &&
        !isNaN(Date.parse(value))
      ) {
        return new Date(value).toLocaleDateString("es-SV", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      }

      return value ?? "-";
    } catch {
      return "-";
    }
  };

  const StatusBadge = ({ status }) => {
    const map = {
      pendiente: ["bg-yellow-100", "text-yellow-600"],
      "en Proceso": ["bg-orange-100", "text-orange-600"],
      enviado: ["bg-blue-100", "text-blue-600"],
      completado: ["bg-green-100", "text-green-600"],
      cancelado: ["bg-red-100", "text-red-600"],
    };
    const [bg, text] = map[status?.toLowerCase()] || ["bg-gray-100", "text-gray-600"];
    return (
      <span className={`px-4 py-1 rounded-full text-sm font-medium ${bg} ${text}`}>
        {status}
      </span>
    );
  };

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Search
  const [search, setSearch] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredRows(rows);
      setCurrentPage(1);
      return;
    }

    const filtered = rows.filter((row) =>
      Object.values(columns).some((columnKey) => {
        const value = getNestedValue(row, columnKey);
        return String(value).toLowerCase().includes(search.toLowerCase());
      })
    );

    setFilteredRows(filtered);
    setCurrentPage(1);
  }, [search, rows, columns]); // 👈 añadimos columns


  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="flex flex-col relative overflow-x-auto sm:rounded-lg bg-stone-50 text-[#333] shadow-xl">
      <div className="flex justify-between items-center p-4">
        <div className="relative">
          <input
            type="search"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded border pl-2 text-sm"
          />
          {search && (
            <X
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-700"
              size={18}
            />
          )}
        </div>
        <div className="flex gap-4 px-4">
          {checkbox && (
            <div className="flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                checked={checkboxChecked}
                onChange={onCheckboxChange}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-[#7D9775]">
                {checkboxText}
              </label>
            </div>
          )}
          {secondaryBtnText && (
            <Button buttonText={secondaryBtnText} showIcon={true} type="button" onClick={onClickSecondaryBtn} />
          )}
          {primaryBtnText && (
            <Button buttonText={primaryBtnText} showIcon={true} type="button" onClick={onClickPrimaryBtn} />
          )}
        </div>
      </div>

      <div className="w-full shadow-md border border-gray-300 rounded-full"></div>

      <table className="w-full text-sm text-center rtl:text-right text-gray-500">
        <thead className="text-xs uppercase text-black bg-white">
          <tr>
            {Object.keys(columns).map((columnName) => (
              <th key={columnName} className="px-4 py-2">
                {columnName}
              </th>
            ))}
            {editable && <th className="px-6 py-3">Acciones</th>}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={Object.keys(columns).length + (editable ? 1 : 0)} className="text-center py-4">
                Cargando...
              </td>
            </tr>
          ) : (
            paginatedRows.map((row, index) => (
              <tr key={row._id || index} className="odd:bg-[#F0ECE6] even:bg-white">
                {Object.entries(columns).map(([columnName, columnKey], colIndex) => {
                  const value = getNestedValue(row, columnKey);
                  const isBadgeColumn = columnName === "Estado" && typeof value === "string" && isNaN(value);
                  return (
                    <td key={colIndex} className="px-6 py-4">
                      {isBadgeColumn ? <StatusBadge status={value} /> : String(value)}
                    </td>
                  );
                })}
                {editable && (
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-4">
                      {showDelete &&
                        <Trash onClick={() => deleteRow(row)} className="cursor-pointer" />

                      }
                      <Pencil onClick={() => updateRow(row)} className="cursor-pointer" />
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-center items-center mt-4 mb-4 gap-4 text-sm text-[#333]">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default DataGrid;

