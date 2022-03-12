import "./Layout.scss";
import React from "react";
import LogoMa from '../../assets/logomadeja.png';
import { NavLink, Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import { FaFacebook, FaInstagramSquare, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return <footer className="footer">
    <div className="container_footer">
      <div className="box__footer">
        <div className="logo">
          <Link to="/">
            <img src={LogoMa} width="200" height="75" />
          </Link>
        </div>
        <div className="terms">
          <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages</p>
        </div>
      </div>
      <div className="box__footer">
        <h2>Soluciones</h2>

        <a href="#"> App </a>
        <a href="#"> App </a>
        <a href="#"> App </a>
      </div>

      <div className="box__footer">
        <h2>Compañia</h2>
        <a href="#"> App </a>
        <a href="#"> App </a>
        <a href="#"> App </a>
        <a href="#"> App </a>
      </div>

      <div className="box__footer">
        <h2> Redes Sociales</h2>

        <a href="#"> <FaFacebook /> </a>
        <a href="#"> <FaInstagramSquare /> </a>
        <a href="#"> <FaTwitter /> </a>
        <a href="#"> <FaYoutube /> </a>
      </div>
    </div>

    <div className="box__copyright">
      <hr />
      <p>Todos los derechos reservados © 2022 {''}
        <b>El Ultimo  & Me Voy</b></p>
    </div>
  </footer>;
}

export default Footer;
