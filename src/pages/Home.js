import React, { useState } from "react";
import Articulos from "../components/common/Articulos";
import BarraCategorias from "../components/common/BarraCategorias";
import Header from "../components/Layout/Header";
import Layout from "../components/Layout/Layout";
import Paginacion from "../components/common/Paginacion";

function Home() {
  const [categoria, setCategoria] = useState("");
  const [orden, setOrden] = useState("-fechaPublicacion");
  const [pagina, setPagina] = useState(0);

  const cambiarCategoria = (x) => {
    setCategoria(x);
    setPagina(0);
  };

  const cambiarPaginaSig = () => {
    setPagina(pagina + 6);
  };

  const cambiarPaginaAnt = () => {
    if (pagina === 0) return;
    setPagina(pagina - 6);
  };

  const cambiarOrden = (o) => {
    setOrden(o);
  };

  return (
    <>
      <Layout>
        <Header />
        <BarraCategorias cambiarCategoria={cambiarCategoria} />
        <Paginacion
          paginaAtras={cambiarPaginaAnt}
          paginaSig={cambiarPaginaSig}
          order={cambiarOrden}
        />
        <Articulos
          categoria={categoria}
          cambiarCategoria={cambiarCategoria}
          ultimaPag={cambiarPaginaAnt}
          orden={orden}
          pagina={pagina}
        />
      </Layout>
    </>
  );
}

export default Home;
