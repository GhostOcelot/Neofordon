import React from "react"
import "./App.css"
import {BrowserRouter, Route, NavLink} from "react-router-dom"
import Szym from "./Szym"
import Sylwia from "./Sylwia"
import Agata from "./Agata"
import Gelu from "./Gelu"
import Franc from "./Franc"

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		return (
			<BrowserRouter>
				<nav>
					<ul className="navi">
						<li className="naviItem">
							<NavLink to="/szym">Szym</NavLink>
						</li>

						<li className="naviItem">
							<NavLink to="/sylwia">Sylwia</NavLink>
						</li>

						<li className="naviItem">
							<NavLink to="/agata">Agata</NavLink>
						</li>

						<li className="naviItem">
							<NavLink to="/gelu">Gelu</NavLink>
						</li>

						<li className="naviItem">
							<NavLink to="/franc">Franc</NavLink>
						</li>
					</ul>
				</nav>
				<section>
					<Route path="/szym" component={Szym} />
					<Route path="/sylwia" component={Sylwia} />
					<Route path="/agata" component={Agata} />
					<Route path="/gelu" component={Gelu} />
					<Route path="/franc" component={Franc} />
				</section>
			</BrowserRouter>
		)
	}
}

export default App
