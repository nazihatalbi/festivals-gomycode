import React, { Component } from "react";
import "./reservation.css";

export default class reservation extends Component {
	constructor() {
		super();
		this.state = {
			nomprenom: "",
			email: "",
			tel: "",
			gradin: "",
			chaise: "",
			ticket: ""
		};
	}

	handleInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	hhandleSubmit(e) {
		e.preventDefault();
		const user = {
			nomprenom: this.state.nomprenom,
			email: this.state.email,
			tel: this.state.tel,
			gradin: this.state.gradin,
			chaise: this.state.chaise
		};
		console.log(user);
	}

	render() {
		return (
			<div>
				<div class="container">
					<form id="contact" action="" method="post">
						<h3>Réservez vous billets</h3>

						<fieldset>
							<input
								placeholder="Nom et prénom"
								type="text"
								name="nomprenom"
								tabindex="1"
								onChange={this.handleInputChange}
								value={this.state.nomprenom}
								required
								autofocus
							/>
						</fieldset>
						<fieldset>
							<input
								placeholder="E-mail"
								name="email"
								type="email"
								tabindex="2"
								onChange={this.handleInputChange}
								value={this.state.email}
								required
							/>
						</fieldset>
						<fieldset>
							<input
								placeholder="Num télèphone"
								type="tel"
								name="tel"
								onChange={this.handleInputChange}
								value={this.state.tel}
								tabindex="3"
								required
							/>
						</fieldset>
						<fieldset>
							<div>
								Tickets gradin: &nbsp;&nbsp;
								<input
									type="number"
									onChange={this.handleInputChange}
									value={this.state.gradin}
									name="gradin"
									required
									id="number"
								/>&nbsp;&nbsp; Tickets chaise: &nbsp;&nbsp;
								<input
									type="number"
									onChange={this.handleInputChange}
									value={this.state.chaise}
									name="chaise"
									required
									id="number"
								/>
							</div>
						</fieldset>

						<fieldset>
							<button onClick={this.handleSubmit} name="Envoyer" type="submit" id="envoyer" data-submit="...Sending">
								Envoyer
							</button>
						</fieldset>
						<h4>Il faut pas depassé les 24h pour récuperer vos billets chez nos points de ventes</h4>
					</form>
				</div>
			</div>
		);
	}
}
