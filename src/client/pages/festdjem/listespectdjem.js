import React, { Component } from "react";
import Cartespectd from "./carspectd";
import Searchbar from "../../components/main/searchbar";
import { Link } from "react-router-dom";
import "./djem.css";

const contactInformation = [
	{
		imgUrl:
			"https://media.eterritoire.fr/?u=aHR0cHM6Ly93d3cuZm5hY3NwZWN0YWNsZXMuY29tL3N0YXRpYy8wL3Zpc3VlbC82MDAvNDE1L0xFLUxBQy1ERVMtQ1lHTkVTXzQxNTg5Njc3MzY1MDI2NzAxOTAuanBnPzE1NTgwODIwNzcwMDA~",
		name: "GALA Tutto PUCCINI",
		date: "05 juillet 2019",
		prixgradain: " Prix gradin :30dt",
		prixchaise: " Prix chaise :40dt",
		button: "réserver "
	},
	{
		imgUrl:
			"data:image/jpeg;base64,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",
		name: "The Best Classica  avec l’Orchestre de la Radio Nationale Ukrainienne",
		date: "13 juillet 2019",
		prixgradain: " Prix gradin :30dt",
		prixchaise: " Prix chaise :40dt",
		button: "réserver "
	},
	{
		imgUrl: "https://festivaleljem.tn/wp-content/uploads/2019/06/affiche-eljem-2019-20-juillet-186x136-01-219x300.jpg",
		name: "Concerto Malaga Espagne",
		date: "20 juillet 2019",
		prixgradain: " Prix gradin :30dt",
		prixchaise: " Prix chaise :40dt",
		button: "réserver "
	},
	{
		imgUrl: "https://www.traveltodoticket.com/wp-content/uploads/2019/07/4-de-minorque-600x600.jpg",
		name: "Orchestre de chambre de Minorque - Espagne",
		date: "24 juillet 2019",
		prixgradain: " Prix gradin :30dt",
		prixchaise: " Prix chaise :40dt",
		button: "réserver "
	},
	{
		imgUrl: "https://www.traveltodoticket.com/wp-content/uploads/2019/07/5-Orchestre-et-Op%C3%A9ra-de-Tunis.jpg",
		name: "Orchestre et Chœur de l’Opéra de Tunis : Opéra  Didon et Enée ",
		date: "27 juillet 2019",
		prixgradain: " Prix gradin :30dt",
		prixchaise: " Prix chaise :30dt",
		button: "réserver "
	},
	{
		imgUrl: "https://tikashop.poste.tn/uploads/billet/99b94f63a158bb0593acb3e7df0a7d33.png",
		name: "Cairo Symphony Orchestra",
		date: "28 juillet 2019",
		prixgradain: " Prix gradin :30dt",
		prixchaise: " Prix chaise :30dt",
		button: "réserver "
	},
	{
		imgUrl: "https://festivaleljem.tn/wp-content/uploads/2019/06/affiche-eljem-2019-03-aout-186x136-01-219x300.jpg",
		name: "Wiener opernball orchester-Autriche",
		date: "03 aout 2019",
		prixgradain: " Prix gradin :30dt",
		prixchaise: " Prix chaise :40dt",
		button: "réserver "
	},
	{
		imgUrl: "https://tikashop.poste.tn/uploads/billet/b113863a2a0adaab3016f06cd21f0989.jpeg",
		name: "Les Jeunes cordes de France  et le chœur",
		date: "9 aout 2019",
		prixgradain: " Prix gradin :30dt",
		prixchaise: " Prix chaise :30dt",
		button: "réserver "
	}
];
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contactInformation,
			titleFilter: ""
		};
	}

	getVisibleMovies() {
		return this.state.contactInformation.filter(el =>
			el.name.toLowerCase().includes(this.state.titleFilter.toLowerCase().trim())
		);
	}

	render() {
		return (
			<div className="backgroundd">
				<Searchbar
					value={this.state.titleFilter}
					onChange={newTitleFilter => {
						this.setState({
							titleFilter: newTitleFilter
						});
					}}
				/>
				<div className="title-djem">
					<div className="festdjem">
						<Link to="/lieud">
							<img
								id="title"
								src="https://scontent.ftun1-1.fna.fbcdn.net/v/t1.15752-9/67762348_2574501689261933_5429067193058852864_n.png?_nc_cat=100&_nc_oc=AQmmZVfvdASOYOzSIRDNzz13D9xkji5Z6iyHCFS4ZAkxyGBcicx0J8xFayotgkB22b0&_nc_ht=scontent.ftun1-1.fna&oh=f95fc0504bf6d45db93a234e65c13e73&oe=5DECFCB2"
							/>
						</Link>
					</div>
				</div>
				<Cartespectd contactList={this.getVisibleMovies()} />
			</div>
		);
	}
}

export default App;
