import React, { View, ImageBackground } from 'react';

class background_image extends React.Component {
    constructor(props){
        super(props);
    }


    render(){
        return(
                <View >
                    <ImageBackground source={require('../img/homeBackground.jpg')} >

                    </ImageBackground>
                </View>
        )
    }
}

export default (background_image);