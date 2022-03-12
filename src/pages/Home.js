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
  };

  const cambiarPaginaSig = () => {
    setPagina(pagina + 3 * 1);
    console.log(pagina);
  };

  const cambiarPaginaAnt = () => {
    if (pagina === 0) return;
    setPagina(pagina + 3 * -1);
    console.log(pagina);
  };

  return (
    <>
      <Layout>
        <Header />
        <BarraCategorias cambiarCategoria={cambiarCategoria} />
        <Articulos
          categoria={categoria}
          cambiarCategoria={cambiarCategoria}
          orden={orden}
          pagina={pagina}
        />
        <Paginacion
          paginaAtras={cambiarPaginaAnt}
          paginaSig={cambiarPaginaSig}
        />
      </Layout>
    </>
  );
}

export default Home;
