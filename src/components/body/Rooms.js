import React, { Component } from 'react';
import { CardColumns, Modal, ModalBody, ModalFooter, Button,Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import Roomdetail from './Roomdetail';
import { fetchRooms } from '../../redux/actionCreators';

const mapStateToProps = state => {
    return {
        rooms: state.rooms,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchRooms: () => dispatch(fetchRooms())
    }
}

class Menu extends Component {
    state = {
        selectedRoom: null,
        modalOpen: false,
        allItem: [],
		filterItem: [],
        limit: false,
    }

    onRoomSelect = room => {
        this.setState({
            selectedRoom: room,
            modalOpen: !this.state.modalOpen
        });
        this.roomLimit(room);
    }

    roomLimit = (room)=>
        {
            this.setState({limit : room.left > 0 })
        }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    handleCheckout =() =>{
        this.props.history.push({
            pathname: "/checkout",
            state : {title: this.state.selectedRoom}
        }) 
    }

    filteredItem = (catitem) => {
		const filterArr = this.props.rooms.filter((element) =>
			{
				return element.category === catitem; 
			});
			this.setState({
				allItem : filterArr
			})
		}
        
        componentDidMount() {
        this.props.fetchRooms();

        
    

    
        axios.get("https://hotelbooking-json.onrender.com")
		.then(response=> response.data)
		.then(data => 

            this.setState({allItem: data})
            
            )

		axios.get("https://hotelbooking-json.onrender.com")
		.then(response=> response.data)
		.then(data => 

            this.setState({filterItem: data}) 
            
            )
    }

    render() {
        
        const rooms = this.state.allItem.map(item => {
            return ( <div key={item.id}>
                <Card style={{ margin: "10px" }} onClick={()=>this.onRoomSelect(item)}>
                    <CardBody style={{ cursor: "pointer" }}>
                        <CardImg width="100%" 
                        alt={item.name}
                        src={item.image}/>
                        <CardTitle >
                        {item.name}
                        </CardTitle>
                    </CardBody>
                </Card>
                </div>
            );
        })

        let roomDetail = null;
        if (this.state.selectedRoom != null) {
           roomDetail = <Roomdetail room={this.state.selectedRoom}/>
        }

        return (
            <div className="container">
                <div style={{margin:"10px"}}>
					<Button style={{margin:"16px", cursor:"pointer"}}
					onClick={()=> this.setState({
						allItem: this.state.filterItem})}
					>All</Button>
					<Button style={{margin:"16px"}}
					onClick={() => this.filteredItem("vip")}
					>VIP</Button>
					<Button style={{margin:"16px"}}
					onClick={() => this.filteredItem("business")}
					>Business</Button>
					<Button style={{margin:"16px"}}
					onClick={() => this.filteredItem("standard")}
					>Standard</Button>
				</div>

                <div className="row">
                    <CardColumns>
                        {rooms}
                    </CardColumns>
                    <Modal isOpen={this.state.modalOpen} >
                        <ModalBody>
                            {roomDetail}
                        </ModalBody>
                        <ModalFooter>
                        <Button style={{ backgroundColor: "black" }} 
                        onClick={this.handleCheckout}
                        disabled={!this.state.limit}>
                        Continue to Checkout
                        </Button>
                        <Button color="secondary" onClick={this.toggleModal}>
                        Close
                        </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);