// app/entorpecentes/page.js
"use client";

import { useState, useEffect } from "react";
import EntorpecentesSearchBar from "@/components/EntorpecentesSearchBar";
import EntorpecentesTable from "@/components/EntorpecentesTable";
import Pagination from "@/components/Pagination";
import Link from "next/link";

export default function EntorpecentesPage() {
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    procedimento: "",
    numero: "",
    tipo: "",
  });
  const limit = 16;

  async function fetchRecords(currentPage, searchObj = {}) {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        ...searchObj,
      });
      const res = await fetch(`/api/entorpecentes?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setRecords(data.records);
        setTotal(data.total);
        setPage(data.page);
      }
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
    }
  }

  useEffect(() => {
    fetchRecords(page, searchParams);
  }, [page, searchParams]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen p-2 rounded-md bg-c_deep_black text-white border border-gray-500 shadow">
      <div className="flex justify-between items-start mb-2">
        <EntorpecentesSearchBar searchParams={searchParams} setSearchParams={setSearchParams} />
        <Link
          href="/entorpecentes/registrar"
          className="bg-green-500 text-white py-1 px-10 rounded hover:bg-green-600 transition duration-600"
          title="Registrar novo entorpecente"
        >
          +
        </Link>
      </div>
      <EntorpecentesTable records={records} />
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrevious={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
      />
    </div>
  );
}
