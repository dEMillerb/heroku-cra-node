import React, { Component } from 'react';
import logo  from'../logo-gb.svg';
import EmailInput  from'./EmailInput';
import PasswordInput  from'./PasswordInput';




export default class BarkLeft extends Component {

    constructor() {
        super();
        
        this.state = {
              email:'',
              password:'',
              authenticated: false,
              BurgerMenuActive: false,
              SideMenuActive:false 
            }
        }
        toggleBurgerMenu = () => {
          this.setState({
            BurgerMenuActive: !this.state.BurgerMenuActive,
            SideMenuActive: !this.state.SideMenuActive
          })
        }

      changeHandlerEmail = event => {
        this.setState({
          email:event.target.value,
        })
      }
      changeHandlerPassword = event => {
        this.setState({
          password:event.target.value,
        })  
      }
     

    render() {
      const BurgerMenuActive = this.state.BurgerMenuActive ? 'checked' : '';
      const SideMenuActive = this.state.SideMenuActive ? 'active' : '';
        return (
                <>
                  <div className={`bark-left ${SideMenuActive}`}>
                      <a onClick={this.toggleBurgerMenu} className={`burgerMenu ${BurgerMenuActive}`}>
                          <span className="line"></span>
                          <span className="line"></span>
                          <span className="line"></span>
                      </a>
                      <nav className="content">
                          <div className="logo">
                              <a href="index.html">
                                  <img className="" src={logo} alt=""/>
                              </a>
                          </div>
                          <form>
                              <div className="tgb-form">
                                    <h3 className="">Who is the User?</h3>
                                    <label className="tgb-label">Email address</label>
                                    <EmailInput name="email" 

                          

                                    /> 
                                    <small id="emailHelp" className="">We'll never share your email with anyone.</small>
                              </div>
                              <div className="tgb-form">
                                  <label className="tgb-label">Password</label>
                                  <PasswordInput name="password" 
                                    value={this.state.password.value}
                                    onChange={this.changeHandlerPassword}
                                    /> 
                              </div>
                              {/*<button onClick={() => this.pusher} className="tgb-btn authorize">pusher</button>*/}
                              <button  className="tgb-btn authorize">Authorize</button>
                          </form>
                      </nav>
                  </div>
                </>
                );
             }
}