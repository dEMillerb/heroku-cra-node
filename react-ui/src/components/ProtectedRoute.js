import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../Auth';
import BarkLeft from './BarkLeft';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props =>{
                if (auth.isAuthanticated()){
                    return <Component {...props}/>;
                }
                else {
                    return <Redirect to={
                        {
                            pathname:"/dashboard",
                            state:{
                                from: props.location
                            }
                        }
                    }/>
                }
            }
            
            }
        />
    )
};


