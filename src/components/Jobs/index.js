import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobItem from '../JobItem'
import EmploymentTypeItem from '../EmploymentTypeItem'
import SalaryRangeItem from '../SalaryRangeItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'PROGRESS',
}

class Jobs extends Component {
  state = {
    profileDetails: {},
    jobsData: [],
    apiStatus: apiStatusConstants.initial,
    employmentType: [],
    salaryRange: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  onChangeSearchInput = e => {
    this.setState({searchInput: e.target.value})
  }

  onClickSearchResults = () => {
    this.getJobsData()
  }

  onChangeSalaryRange = e => {
    this.setState({salaryRange: e.target.id}, this.getJobsData)
  }

  onChangeEmploymentType = e => {
    const {employmentType} = this.state
    this.setState(
      {employmentType: [...employmentType, e.target.id]},
      this.getJobsData,
    )
  }

  onClickRetryJobsApiUrl = () => {
    this.getJobsData()
  }

  onClickRetryProfileApiUrl = () => {
    this.getProfileData()
  }

  renderFormattedData = item => ({
    id: item.id,
    title: item.title,
    rating: item.rating,
    companyLogoUrl: item.company_logo_url,
    location: item.location,
    packagePerAnnum: item.package_per_annum,
    employmentType: item.employment_type,
    jobDescription: item.job_description,
  })

  getJobsData = async () => {
    const {employmentType, salaryRange, searchInput} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachItem =>
        this.renderFormattedData(eachItem),
      )
      this.setState({
        jobsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(response)
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsSuccessView = () => {
    const {jobsData} = this.state
    const showNoJobsView = jobsData.length > 0

    return showNoJobsView ? (
      <ul className="list-of-jobs">
        {jobsData.map(eachItem => (
          <JobItem eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          className="failure-view-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="failure-heading-text">No Jobs Found</h1>
        <p className="failure-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#fff" height="50" width="50" />
    </div>
  )

  renderJobsFailureView = () => (
    <div className="failure-view">
      <img
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
        onClick={this.onClickRetryJobsApiUrl}
      >
        Retry
      </button>
    </div>
  )

  renderJobsData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderSalaryRange = () => (
    <div className="container">
      <h1>Salary Range</h1>
      <ul className="list-container">
        {salaryRangesList.map(eachItem => (
          <SalaryRangeItem
            eachItem={eachItem}
            key={eachItem.salaryRangeId}
            onChangeSalaryRange={this.onChangeSalaryRange}
          />
        ))}
      </ul>
    </div>
  )

  renderTypeOfEmployment = () => (
    <div className="container">
      <h1>Type of Employment</h1>
      <ul className="list-container">
        {employmentTypesList.map(eachItem => (
          <EmploymentTypeItem
            key={eachItem.employmentTypeId}
            eachItem={eachItem}
            onChangeEmploymentType={this.onChangeEmploymentType}
          />
        ))}
      </ul>
    </div>
  )

  renderProfileDetails = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails

    return (
      <div className="profile-container">
        <img src={profileImageUrl} className="profile-img" alt="profile" />
        <h2 className="profile-name">{name}</h2>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="profile-failure-view">
      <button type="button" onClick={this.onClickRetryProfileApiUrl}>
        Retry
      </button>
    </div>
  )

  renderProfileData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="jobs-section-container">
        <Header />
        <div className="jobs-category-section">
          <div className="jobs-container">
            <div className="search-container-mobile">
              <input
                type="search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                testid="searchButton"
                type="button"
                className="search-icon"
                onClick={this.onClickSearchResults}
              >
                <AiOutlineSearch className="icon-search" />
              </button>
            </div>
            {this.renderProfileData()}
            <hr className="hr-line" />
            {this.renderTypeOfEmployment()}
            <hr className="hr-line" />
            {this.renderSalaryRange()}
          </div>
          <div className="jobs-list-container">
            <div className="search-container-lg">
              <input
                type="search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                testid=" searchButton"
                type="button"
                className="search-icon"
                onClick={this.onClickSearchInput}
              >
                <AiOutlineSearch className="icon-search" />
              </button>
            </div>
            {this.renderJobsData()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
