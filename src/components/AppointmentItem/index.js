// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {itemDetails, toggelStart} = props
  const {id, titlename, dateApp, star} = itemDetails

  const stars = star
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const changeTheStar = () => {
    toggelStart(id)
  }

  return (
    <div className="">
      <li className="list-order">
        <div>
          <p className="title-para">{titlename}</p>
          <p className="date-para">Date: {dateApp}</p>
        </div>
        <div>
          <button
            type="button"
            className="btn1"
            onClick={changeTheStar}
            dataa-testid="star"
          >
            <img src={stars} alt="star" />
          </button>
        </div>
      </li>
    </div>
  )
}
export default AppointmentItem
