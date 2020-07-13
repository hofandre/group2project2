import React from 'react';
import { Route, BrowserRouter as Router, withRouter } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import SetForm from './setTable.component.js'

class Home extends React.Component {
    constructor(props){
        super(props);
    }

    route(path){
        this.props.history.push(path);
    }

    render(){
        return(
            <Router>
            <>
                <div>
                    <img 
                    src={require(`../img/homeBackground.jpg`)}
                    bsstyle="default"
                    style={{"width": "100%"}}>    
                    </img>
                </div>
                
                <div className="position-fixed" 
                    style={{"position": "fixed",
                        "left": "33%", "top": "25%",
                        "width": "33%", "height": "50%",
                        "background-color": "rgb(40, 40, 40)",
                        "right": "33%", "border-radius": "25px",
                        "float": "left"
                        }}
                    bsstyle="default">
                    <Form bsstyle="default"
                        style={{"width": "50%",
                        "float": "left",
                        "border-right": "1px solid grey",
                        "margin-right": "0px",
                        "margin-top": "10%",
                        "margin-bottom": "10%",
                        "padding": "10%", "height": "75%"}}>
                    
                    <div bsstyle="default"
                        style={{"color": "white",
                        "margin-bottom": "33%",
                        "margin-top": "33%"}}>
                        
                        <button className="btn btn-primary btn-block" 
                            bsstyle="default"
                            style={{"color": "white"}}
                            onClick={() => this.route('/sets')}
                        >Explore</button>

                        <button className="btn btn-primary btn-block"
                        bsstyle="default"
                        style={{"color": "white"}}
                        onClick={() => this.route('/register')}
                        >Register</button>

                    </div>

                    


                    </Form>

                    <div bsstyle="default"
                        style={{"color": "white",
                        "float": "right",
                        "float": "left",
                        "width": "50%",
                        "margin-top": "33%",
                        "margin-bottom": "33%"
                            }}>
                                <h3>Test Your Knowledge</h3>
                    </div>

                </div>
                
            </>
                <Route path='/sets' component={SetForm}/>
            </Router>
        )
    }
}

export default Home;