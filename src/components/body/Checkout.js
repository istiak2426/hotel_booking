import React, { Component } from 'react'
import { Button, Modal, ModalBody } from 'reactstrap';
import axios from 'axios';
import Spinner from '../Spinner/Spinner'

class Checkout extends Component {

	state = {
        values: {
            name: "",
            phone: "",
        },
		isLoading: false,
        isModalOpen: false,
        modalMsg: "",
    }

    goBack = () => {
        this.props.history.goBack("/");
    }

    inputChangerHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value,
            }
        })
    }

    submitHandler = () => {

		let reservation = {
			room_info: this.props.location.state.title,
			customer_info :this.state.values,
			booking_time: new Date(),
		}

		axios.post("https://hotel-booking-75bed-default-rtdb.firebaseio.com/orders.json", reservation)
		.then(response => {

			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					isLoading: false,
					isModalOpen: true,
					modalMsg: "Reservtion completed!",
				})
				this.setState({values: {name: "", phone: "",}})
			} 

			else {
				this.setState({
					isLoading: false,
					isModalOpen: true,
					modalMsg: "Something Went Wrong! Try Again!",
				})
			}
		})
		.catch(err => {
			this.setState({
				isLoading: false,
				isModalOpen: true,
				modalMsg: "Something Went Wrong! Try Again!",
			})
		})
    }
	render(){
		let form= (<div>
			<h3  style={{
			border: "1px solid grey",
			boxShadow: "1px 1px #888888",
			borderRadius: "5px",
			padding: "20px",
			}}>Payment : {this.props.location.state.title.charge}</h3>
					<form style={{
						border: "1px solid grey",
						boxShadow: "1px 1px #888888",
						borderRadius: "5px",
						padding: "20px",
					}}>
						<input name="name" value={this.state.values.name} type="name" className="form-control" placeholder="Enter your name"  onChange={(e) => this.inputChangerHandler(e)} />
						<br />
						<input name="phone" className="form-control" type="number"  value={this.state.values.phone} placeholder="Enter your phone number" onChange={(e) => this.inputChangerHandler(e)} />
						<br />
						
						<Button style={{ backgroundColor: "black" }} className="mr-auto" onClick={this.submitHandler}>Book Reservation</Button>
						<Button color="secondary" className="ml-1" onClick={this.goBack}>Cancel</Button>
					</form>
				</div>)

		return (
			<div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
					<Button>Close</Button>
                </Modal>
            </div>
		  )
	}
}

export default Checkout