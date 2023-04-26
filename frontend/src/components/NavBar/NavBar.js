import "./NavBar.css"
import Logo from "../../img/logo.svg"
import { NavLink } from "react-router-dom"

function NavBar() {
  return (
    <header>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <NavLink className="navbar-brand" to="/">
        <img src={Logo} alt="Agenda"/>
      </NavLink>
      <div>
        <div className="navbar-nav">
          <NavLink className="nav-link active" to="/">Agenda</NavLink>
          <NavLink className="nav-link active" to="/newContact">Adicionar Contato</NavLink>
        </div>
      </div>
    </nav>
  </header>
  )
}

export default NavBar