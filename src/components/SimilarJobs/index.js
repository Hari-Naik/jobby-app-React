import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {data} = props

  const renderListItem = item => (
    <li className="similar-jobs-list-item" key={item.id}>
      <div className="company-logo-card">
        <img
          src={item.companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="title-rating-card">
          <h2>{item.title}</h2>
          <div className="rating-card">
            <AiFillStar className="star-icon" />
            <p className="rating">{item.rating}</p>
          </div>
        </div>
      </div>
      <h2 className="description">Description</h2>
      <p className="job-description">{item.jobDescription}</p>
      <div className="location-employment-type-package">
        <div className="location-container">
          <MdLocationOn className="location-icon" />
          <p className="location">{item.location}</p>
        </div>
        <div className="employment-type-container">
          <BsFillBriefcaseFill className="employment-type-icon" />
          <p className="employment-type-title">{item.employmentType}</p>
        </div>
      </div>
    </li>
  )

  return (
    <div classNames="similar-jobs-container">
      <h2 className="similar-jobs-title">Similar Jobs</h2>
      <ul className="similar-jobs-lists">
        {data.map(item => renderListItem(item))}
      </ul>
    </div>
  )
}

export default SimilarJobs
