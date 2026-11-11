"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [favoritos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  async function carregarProdutos() {
    const res = await fetch("/api/favoritos");
    const data = await res.json();
    setProdutos(data);
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function salvarProduto(e) {
    e.preventDefault();

    if (!nome || !preco) {
      alert("Preencha tudo");
      return;
    }

    // 🔹 UPDATE
    if (editandoId !== null) {
      console.log("Atualizando ID:", editandoId);

      const res = await fetch(`/api/favoritos/${editandoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          preco: Number(preco),
        }),
      });

      if (!res.ok) {
        alert("Erro ao atualizar");
        return;
      }

      const atualizado = await res.json();

      setProdutos((prev) =>
        prev.map((p) => (p.id === editandoId ? atualizado : p))
      );

      setEditandoId(null);
    } else {
      // 🔹 CREATE
      const res = await fetch("/api/favoritos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          preco: Number(preco),
        }),
      });

      const novo = await res.json();

      setProdutos((prev) => [...prev, novo]);
    }

    setNome("");
    setPreco("");
  }

  async function deletarProduto(id) {
    const res = await fetch(`/api/favoritos/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Erro ao deletar");
      return;
    }

    setProdutos((prev) => prev.filter((p) => p.id !== id));
  }

  function editarProduto(favorito) {
    setNome(favorito.nome);
    setPreco(favorito.preco);
    setEditandoId(favorito.id);
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>CRUD de Produtos</h1>

      <form onSubmit={salvarProduto} className={styles.form}>
        <input
          className={styles.input}
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Preço"
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <button className={styles.button}>
          {editandoId !== null ? "Atualizar" : "Adicionar"}
        </button>
      </form>

      <ul className={styles.list}>
        {favoritos.map((p) => (
          <li key={p.id} className={styles.item}>
            <span>
              {p.nome} - R$ {p.preco}
            </span>

            <div>
              <button
                onClick={() => editarProduto(p)}
                className={styles.edit}
              >
                ✏️
              </button>

              <button
                onClick={() => deletarProduto(p.id)}
                className={styles.delete}
              >
                𝐗
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}