// Write your code here
import {Component} from 'react'

import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    id: uuidv4(),
    titlename: '',
    dateApp: '',
    initialAppointment: [],
    isFilterActive: false,
  }

  toggelStart = id => {
    this.setState(prevState => ({
      initialAppointment: prevState.initialAppointment.map(items => {
        if (id === items.id) {
          return {...items, star: !items.star}
        }
        return items
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  getAllStarred = () => {
    const {initialAppointment, isFilterActive} = this.state
    if (isFilterActive) {
      return initialAppointment.filter(item => item.star === true)
    }
    return initialAppointment
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {titlename, dateApp} = this.state
    const formattedDate = dateApp
      ? format(new Date(dateApp), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      titlename,
      dateApp: formattedDate,
      star: false,
    }
    this.setState(prevState => ({
      initialAppointment: [...prevState.initialAppointment, newAppointment],
      titlename: '',
      dateApp: '',
    }))
  }

  onChangeTheTitle = event => {
    this.setState({titlename: event.target.value})
  }

  onChangeTheDate = event => {
    this.setState({dateApp: event.target.value})
  }

  render() {
    const {initialAppointment} = this.state
    const filterData = this.getAllStarred()

    return (
      <div className="container">
        <div className="card">
          <form className="card-info" onSubmit={this.onSubmitForm}>
            <div className="info-div">
              <h1 className="main-heading">Add Appointment</h1>
              <label htmlFor="title-box" className="label-el">
                TITLE
              </label>
              <br />
              <input
                type="text"
                placeholder="Title"
                className="input-box"
                id="title-box"
                onChange={this.onChangeTheTitle}
              />
              <br />
              <label htmlFor="date-box" className="label-el">
                DATE
              </label>
              <br />
              <input
                type="date"
                placeholder="Title"
                className="input-box"
                id="date-box"
                onChange={this.onChangeTheDate}
              />
              <div>
                <button type="submit" className="btn">
                  Add
                </button>
              </div>
            </div>

            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="app-image"
              />
            </div>
          </form>
          <div>
            <hr className="horizontal-line" />
            <div className="Appointment-div">
              <h1 className="app-heading">Appointments</h1>
              <button className="app-btn" onClick={this.onFilter}>
                Starred
              </button>
            </div>
            <ul className="unorder-list">
              {filterData.map(items => (
                <AppointmentItem
                  key={items.id}
                  itemDetails={items}
                  toggelStart={this.toggelStart}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
