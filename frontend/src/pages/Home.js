import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, Alert} from "reactstrap";


export const Home = () => {
	return (
		<div className="mt-5">
			<Jumbotron fluid>
				<Container className="text-info" fluid style={{ textAlign: 'center' }}>
					<h1 className="display-3" >Welcome to InterCompany!</h1>
				</Container>
			</Jumbotron>
			<Report></Report>	
		</div>
	)
}

const Report = () => {
	return(
		<div>
			 <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30vh"
        }}
      >
        <Form className="w-25">
        Sign in 

          <FormGroup class="mt-2">
            <Label for="username" hidden>
              Email
            </Label>
            <Input
              type="username"
              name="userName"
              id="username"
              placeholder="New Username"
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="examplePassword" hidden>
              Password
            </Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="New Password"
            />
          </FormGroup>{" "}
          <Button
            onClick={event => (window.location.href = "/info/")}
            color="success"
          >
            Submit
          </Button>{" "}
			<div class="mt-5">
				<Alert color="danger">
				New here?
				<a href="/setup/" className="alert-link">{' '}Create an account!</a>
				</Alert>
		  	</div>
        </Form>
      </div>
		</div>
	)
}