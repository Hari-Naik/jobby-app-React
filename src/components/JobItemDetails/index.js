import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {jobItemDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getJobItemDetails()
  }

  onClickRetryJobDetailsApiUrl = () => {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    const updatedData = {
      jobDetails: {
        id: data.job_details.id,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        rating: data.job_details.rating,
        packagePerAnnum: data.job_details.package_per_annum,
        title: data.job_details.title,
      },
      skills: data.job_details.skills.map(item => ({
        name: item.name,
        imageUrl: item.image_url,
      })),
      similarJobs: data.similar_jobs.map(item => ({
        id: item.id,
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        jobDescription: item.job_description,
        location: item.location,
        rating: item.rating,
        title: item.title,
      })),
    }
    if (response.ok) {
      this.setState({
        jobItemDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSkillsView = () => {
    const {jobItemDetails} = this.state

    return (
      <div className="skills-container">
        <h2 className="skills-title">Skills</h2>
        <ul className="skills-list">
          {jobItemDetails.skills.map(item => (
            <li className="skill-item" key={item.name}>
              <img src={item.imageUrl} alt={item.name} className="skill-img" />
              <h3>{item.name}</h3>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetailsSuccessView = () => {
    const {jobItemDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      title,
      rating,
      packagePerAnnum,
    } = jobItemDetails.jobDetails

    return (
      <>
        <div className="job-item-details">
          <div className="company-logo-card">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-rating-card">
              <h2 className="title">{title}</h2>
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
          <div className="description-container">
            <h2 className="description">Description</h2>
            <div className="company-website">
              <div>
                <a
                  href={companyWebsiteUrl}
                  className="visit"
                  rel="noreferrer"
                  target="_blank"
                >
                  Visit
                </a>
              </div>
              <FiExternalLink className="link-icon" />
            </div>
          </div>
          <p className="job-description">{jobDescription}</p>
          {this.renderSkillsView()}
          <div className="life-at-company-container">
            <div className="life-at-company-content">
              <h2 className="life-at-company-title">Life at Company</h2>
              <p className="life-at-company-description">
                {lifeAtCompany.description}
              </p>
            </div>
            <img src={lifeAtCompany.image_url} alt="life at company" />
          </div>
        </div>
        <SimilarJobs data={jobItemDetails.similarJobs} />
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#fff" height="50" width="50" />
    </div>
  )

  renderJobDetailsFailureView = () => (
    <div className="failure-view">
      <img
        className="failure-view-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickRetryJobDetailsApiUrl}
      >
        Retry
      </button>
    </div>
  )

  renderStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-details-container">
        <Header />
        {this.renderStatusView()}
      </div>
    )
  }
}

export default JobItemDetails
