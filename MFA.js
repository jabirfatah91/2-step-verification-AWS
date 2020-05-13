import React, { Component } from "react";
import "./mfa.css";
import { FormGroup, Container, Label, Input, Form } from "reactstrap";
class MFA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RegistrationCode: "",
      handshake: "",
      phone: "",
      status: ""
    };
    this.handleSMS = this.handleSMS.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVerification = this.handleVerification.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
  }

  handlePhone(event) {
    this.setState({ phone: event.target.value });
    console.log(this.state.phone);
  }

  handleSubmit() {}
  async handleSMS(event) {
    this.setState({ status: "Sending Text Message..." });
    let message = {
      number: this.state.phone,
      Message: "Your code is : " + this.state.RegistrationCode,
      subject: "Test"
    };
	//For Production :
	//1- use environment variables (.env) to keep the API Endpoint URL secret.
	//2-Generate API key and Usage plan for your AWS API Gateway
	
    event.preventDefault();
    await fetch('https://ucij1r1fak.execute-api.us-east-1.amazonaws.com/Stage1', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    });
    this.setState({ status: "Text sent!" });
  }
  
  async handleVerification(event) {
    this.setState({ status: "" });
    if (
      event.target.value.toString() === this.state.RegistrationCode.toString()
    ) {
      this.setState({ handshake: "OK" });
    }
  }

  componentDidMount() {
    let RegistrationCode = Math.floor(1000 + Math.random() * 9000);
    this.setState({ RegistrationCode });
    console.log("RegistrationCode", RegistrationCode);
  }
  render() {
    return (
      <div>
        <Container className="col-4 offset-4 border mfarow">
          <div className="row">
            <div className="col-12">
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <div className="row">
                    <div className="col-12">
                      <Label for="phone">
                        <h3>Cell Phone</h3>
                      </Label>
                    </div>
                    <div className="col-12">
                      <Input
                        type="phone"
                        name="phone"
                        id="phone"
                        onChange={this.handlePhone}
                        required
                      />
                    </div>
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="row">
                    <div className="col-6">
                      <button
                        className="btn btn-block btn-success"
                        onClick={this.handleSMS}
                      >
                        Send Text
                      </button>
                    </div>

                    <div className="col-6">
                      <Input
                        type="Text"
                        name="code"
                        id="code"
                        placeholder="Enter 6 digit code"
                        onChange={this.handleVerification}
                        required
                      />
                    </div>
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="text-danger"></div>
                  {this.state.handshake === "OK" ? "Valid code" : ""}
                  
                </FormGroup>
                <h4 className="status-update">{this.state.status}</h4>
              </Form>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default MFA;
