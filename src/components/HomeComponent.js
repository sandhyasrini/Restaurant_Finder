import React,{Component} from 'react';
import {Row, Col, Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm, Control, Errors} from 'react-redux-form';
import Display from './DisplayComponent';
import {RenderCard} from './CardComponent';

const required = (val) => val && val.length;

class Home extends Component{
    constructor(props){
        super(props);

        this.state={
            Disp: false,
            city: "",
            search: ""
        };

        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(values){
        if(values.cusine!==undefined){
            this.setState({city: values.city, search: values.cusine,Disp: true});
        }
        else
            this.setState({city: values.city, Disp: true});
    }

    render(){

        return(
            <>
                <div className="jumbotron">
                    {this.state.Disp&&<Link to="/"><i class="fa fa-angle-double-left fa-lg" style={{color: "#010067"}} aria-hidden="true"></i></Link>}
                    <div className="row justify-content-center">
                        <Link to="/"><h1 style={{fontSize: "4rem", color: "#010067"}}><strong>ReZinga</strong></h1></Link>
                    </div>
                    <div className="row justify-content-center mt-4 col-12" style={{padding: "2rem"}}>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col className="col-5">
                                    <Control.text model=".city" id="city" name="city" placeholder="City" className="form-control" 
                                        validators={{ required }}/>
                                    <Errors className="text-warning" model=".city" show="touched"
                                         messages={{
                                             required: 'Required'
                                         }}
                                         />
                                </Col>
                                <Col className="col-5 ml-auto">
                                    <Control.text model=".cusine" id="cusine" name="cusine" placeholder="Restaurant or Cuisine" className="form-control" />
                                </Col>
                                <Col className="col-2 ml-auto">
                                    <Button color="primary" style={{backgroundColor:"#010067"}} type="submit">Search</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                    <div className="container"> 
                        {this.state.Disp&&
                            <Display city={this.state.city} search={this.state.search} />
                        }
                    </div>
                </div>
                {
                    !this.state.Disp&&
                    <RenderCard />
                }
            </>
        );
    }
}

export default Home;