"use client";

import React, { useState } from "react";
import { ItemList } from "@/components/features";
import { Spinner, Card, Select } from "@/components/common";
import { useItems } from "@/hooks";

const HomePage: React.FC = () => {
  const [limit, setLimit] = useState(2000);
  const { items, loading, error, refetch } = useItems(limit);

  const limitOptions = [
    { value: 1000, label: "1000 cartas" },
    { value: 2000, label: "2000 cartas" },
    { value: 5000, label: "5000 cartas" },
    { value: 10000, label: "10000 cartas" },
  ];

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Magic: The Gathering Cards
          </h2>
          {!loading && (
            <p className="text-gray-600 text-sm md:text-base mt-1">
              Mostrando {items.length} cartas
            </p>
          )}
        </div>

        {!loading && (
          <Select
            id="limit-select"
            label="Cantidad de cartas:"
            value={limit.toString()}
            onChange={handleLimitChange}
            options={limitOptions}
          />
        )}
      </div>

      {loading && (
        <Card className="py-12">
          <Spinner size="lg" />
          <p className="text-center text-gray-600 mt-4">Cargando</p>
        </Card>
      )}

      {error && (
        <Card className="bg-red-50 border-red-200">
          <div className="text-center">
            <p className="text-red-700 font-medium">
              Error al cargar las cartas
            </p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
            <button
              onClick={refetch}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Reintentar
            </button>
          </div>
        </Card>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-md p-4 flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <ItemList items={items} />
          </div>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <Card className="py-12 text-center">
          <p className="text-gray-600">No hay cartas para mostrar</p>
        </Card>
      )}
    </div>
  );
};

export default HomePage;
