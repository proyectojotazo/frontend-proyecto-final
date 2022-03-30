import React from 'react'
import { useAuth } from '../../contexts/authContext';
import '../../pages/SearchArticle.scss';
import { MdSearchOff } from "react-icons/md";

export default function NotFoundList() {

  const { t } = useAuth();

  return (
    <div className="not-found">
      <div>
        <MdSearchOff
          className="search-off"
        ></MdSearchOff>

      </div>
      <p className="error-text" > {t("main.articulosFound.notFound")}
      </p>
      <p className="error-text">  {t("main.articulosFound.tryagain")}</p>
    </div>
  )
}
