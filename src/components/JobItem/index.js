import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {eachItem} = props
  const {
    id,
    title,
    companyLogoUrl,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = eachItem

  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`} className="job-item-link">
        <div className="company-logo-card">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-rating-card">
            <h1>{title}</h1>
            <div className="rating-card">
              <AiFillStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-employment-type-package">
          <div className="location-container">
            <MdLocationOn className="location-icon" />
            <p className="location">{location}</p>
          </div>
          <div className="employment-type-container">
            <BsFillBriefcaseFill className="employment-type-icon" />
            <p className="employment-type-title">{employmentType}</p>
          </div>
          <p className="package-per-annum">{packagePerAnnum}</p>
        </div>
        <hr className="seperator" />
        <h2 className="description">Description</h2>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobItem
