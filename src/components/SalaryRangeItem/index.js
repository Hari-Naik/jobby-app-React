import './index.css'

const SalaryRangeItem = props => {
  const {eachItem, onChangeSalaryRange} = props

  return (
    <li className="list-item">
      <input
        type="radio"
        id={eachItem.salaryRangeId}
        className="checkbox"
        onChange={onChangeSalaryRange}
      />
      <div>
        <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
      </div>
    </li>
  )
}

export default SalaryRangeItem
