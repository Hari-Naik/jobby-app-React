import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogIn} from 'react-icons/fi'
import Cookie from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')
    Cookie.remove('jwt_token')
  }

  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <Link to="/" className="nav-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo"
          />
        </Link>
      </div>
      <ul className="nav-icons">
        <li>
          <Link to="/" className="nav-link">
            <AiFillHome className="icon" />
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-link">
            <BsFillBriefcaseFill className="icon" />
          </Link>
        </li>
        <button
          type="button"
          className="logout-icon-btn"
          onClick={onClickLogout}
        >
          <FiLogIn className="icon" />
        </button>
      </ul>
      <ul className="nav-middle">
        <Link to="/" className="nav-link">
          <li className="nav-home">Home</li>
        </Link>
        <Link to="/jobs" className="nav-link">
          <li className="nav-jobs">Jobs</li>
        </Link>
      </ul>
      <div className="nav-right">
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
