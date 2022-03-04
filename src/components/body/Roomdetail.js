import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';


const Roomdetail = props => {

    let control = null
    if (props.room.left > 0)
    {
        control= (<CardText>
            Totol room left: {props.room.left}
        </CardText>)
    }
    else{
        control = (<CardText>
           There are no room left!!
        </CardText>)
    }

    return (
        <div>
            <Card style={{ marginTop: "10px" }}>
                <CardImg top src={props.room.image} alt={props.room.name} />
                <CardBody style={{ textAlign: "left" }}>
                    <CardTitle>Room name : {props.room.name}</CardTitle>
                    <hr />
                    <CardText>
                        Category: {props.room.category}
                    </CardText>
                    <hr />
                    <CardText>
                        Services: {props.room.description}
                    </CardText>
                    <hr/>
                    <CardText>
                        Charge: {props.room.charge}
                    </CardText>
                    <hr/>
                    {control}
                    <hr />   
                </CardBody>
            </Card>
        </div>
    );
}

export default Roomdetail;