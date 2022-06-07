import './index.css'

const EmploymentTypeItem = props => {
  const {eachItem, onChangeEmploymentType} = props
  const {employmentTypeId, label} = eachItem

  return (
    <li className="list-item">
      <input
        type="checkbox"
        className="checkbox"
        id={employmentTypeId}
        onChange={onChangeEmploymentType}
      />
      <div>
        <label htmlFor={eachItem.employmentTypeId}>{label}</label>
      </div>
    </li>
  )
}

export default EmploymentTypeItem
