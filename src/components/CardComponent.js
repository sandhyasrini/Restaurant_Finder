import React from 'react';
import {Card, CardImg, CardBody} from 'reactstrap';
import cardimg1 from '../public/bck_img2.jpg';
import cardimg2 from '../public/bck_img6.jpg';
import cardimg3 from '../public/bck_img3.jfif';

export const RenderCard = ()=>{
    return(
        <div className="container">
            <div className="row card-deck justify-content-center">
                <Card className="col-md-4" style={{padding: 0, borderRadius: "1rem"}}>
                    <CardImg src={cardimg2} width="100%" height="200rem" style={{borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem"}}/>
                    <CardBody>
                        <div style={{lineHeight: 0.8}}>
                            <p style={{fontSize: "1.25rem"}}>Search for Restaurants</p>
                            <p className="subtitle" style={{fontSize: "1rem", color: "#808080"}}>Find some New Places</p>
                        </div>
                    </CardBody>
                </Card>
                <Card className="col-md-4 ml-auto" style={{padding: 0, borderRadius: "1rem"}}>
                    <CardImg src={cardimg3} width="100%" height="200rem" style={{borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem"}}/>
                    <CardBody>
                        <div style={{lineHeight: 0.8}}>
                            <p style={{fontSize: "1.25rem"}}>Search for your Favourite Cuisine</p>
                            <p className="subtitle" style={{fontSize: "1rem", color: "#808080"}}>Available dishes and cuisines</p>
                        </div>
                    </CardBody>
                </Card>
                <Card className="col-md-4 ml-auto" style={{padding: 0, borderRadius: "1rem"}}>
                    <CardImg src={cardimg1} width="100%" height="200rem" style={{borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem"}}/>
                    <CardBody>
                        <div style={{lineHeight: 0.8}}>
                            <p style={{fontSize: "1.25rem"}} className="title">Restaurants in the City</p>
                            <p className="subtitle" style={{fontSize: "1rem", color: "#808080"}}>View the city's favourite dining venue</p>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};