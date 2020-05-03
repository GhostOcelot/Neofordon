import React from "react"
import "./App.css"
import rock from "./images/rock.svg"
import balance from "./images/body-balance.svg"
import brain from "./images/brain.svg"
import fedora from "./images/fedora.svg"
import sprint from "./images/sprint.svg"
import breastplate from "./images/breastplate.svg"
import heart from "./images/hearts.svg"
import run from "./images/run.svg"
import BasicSkills from "./BasicSkills"
import SkillTest from "./SkillTest"
import machete from "./images/machete.svg"

class Szym extends React.Component {
	state = {
		strength: 4,
		agility: 4,
		intelligence: 4,
		stamina: 4,
		charisma: 4,

		evade: null,
		resistance: null,
		hitbox: null,
		basicSkills: [
			{name: "Zastraszanie (S)", value: 4, id: "intimidation"},
			{name: "Walka (ZR)", value: 4, id: "fight"},
			{name: "Strzelanie (ZR)", value: 4, id: "shooting"},
			{name: "Skradanie (ZR)", value: 4, id: "sneaking"},
			{name: "Przetrwanie (INT)", value: 4, id: "survival"},
			{name: "Streetwise (INT)", value: 4, id: "streetwise"},
			{name: "Science (INT)", value: 4, id: "science"},
			{name: "Technika (INT)", value: 4, id: "technology"},
			{name: "Percepcja (INT)", value: 4, id: "perception"},
			{name: "Zdrowienie (WYT)", value: 4, id: "regeneration"},
			{name: "Perswazja (CH)", value: 4, id: "persuation"}
		],

		currentHP: 50,
		maxHP: 50,
		armor: 0,
		movement: 1
	}

	setMaxHP(str) {
		if (str === 4) {
			this.setState({maxHP: 50})
		} else if (str === 6) {
			this.setState({maxHP: 60})
		} else if (str === 8) {
			this.setState({maxHP: 65})
		} else if (str === 10) {
			this.setState({maxHP: 75})
		} else if (str === 12) {
			this.setState({maxHP: 85})
		}
	}

	componentDidMount() {
		this.setMaxHP(this.state.strength)
		const hitbox =
			this.state.basicSkills.find(item => item.id === "fight").value / 2 +
			2 +
			(this.state.stamina / 2 + 2) +
			this.state.armor
		this.setState({hitbox})
	}

	addStrength = () => {
		if (this.state.strength < 12) {
			const strength = this.state.strength + 2
			this.setState({strength})
			this.setMaxHP(strength)
		}
	}

	subtractStrength = () => {
		if (this.state.strength > 4) {
			const strength = this.state.strength - 2
			this.setState({strength})
			this.setMaxHP(strength)
		}
	}

	addAgility = () => {
		const agility = this.state.agility + 2
		if (this.state.agility < 12) {
			this.setState({agility})
		}
		if (agility === 4 || agility === 6) {
			this.setState({movement: 1})
		} else if (agility === 8) {
			this.setState({movement: 2})
		} else if (agility === 10) {
			this.setState({movement: 3})
		} else if (agility === 12) {
			this.setState({movement: 4})
		}
	}

	subtractAgility = () => {
		const agility = this.state.agility - 2
		if (this.state.agility > 4) {
			this.setState({agility: agility})
		}
		if (agility === 4 || agility === 6) {
			this.setState({movement: 1})
		} else if (agility === 8) {
			this.setState({movement: 2})
		} else if (agility === 10) {
			this.setState({movement: 3})
		} else if (agility === 12) {
			this.setState({movement: 4})
		}
	}

	addIntelligence = () => {
		if (this.state.intelligence < 12) {
			this.setState({intelligence: this.state.intelligence + 2})
		}
	}

	subtractIntelligence = () => {
		if (this.state.intelligence > 4) {
			this.setState({intelligence: this.state.intelligence - 2})
		}
	}

	addStamina = () => {
		if (this.state.stamina < 12) {
			this.setState({
				stamina: this.state.stamina + 2,
				hitbox: this.state.hitbox + 1
			})
		}
	}

	subtractStamina = () => {
		if (this.state.stamina > 4) {
			this.setState({
				stamina: this.state.stamina - 2,
				hitbox: this.state.hitbox - 1
			})
		}
	}

	addCharisma = () => {
		if (this.state.charisma < 12) {
			this.setState({charisma: this.state.charisma + 2})
		}
	}

	subtractCharisma = () => {
		if (this.state.charisma > 4) {
			this.setState({charisma: this.state.charisma - 2})
		}
	}

	evadeTest = () => {
		let result = Math.ceil((Math.random() * this.state.agility) / 2) + 2
		this.setState({evade: result})
	}

	clearEvadeTestResult = () => {
		this.setState({evade: null})
	}

	resistanceTest = () => {
		let result =
			Math.ceil((Math.random() * this.state.stamina) / 2) + 2 + this.state.armor
		this.setState({resistance: result})
	}

	clearResistanceTestResult = () => {
		this.setState({resistance: null})
	}

	substractArmor = () => {
		if (this.state.armor > 0) {
			this.setState({
				armor: this.state.armor - 1,
				hitbox: this.state.hitbox - 1
			})
		}
	}

	addArmor = () => {
		this.setState({armor: this.state.armor + 1, hitbox: this.state.hitbox + 1})
	}

	attributeTest = attr => {
		const result = Math.ceil(Math.random() * this.state[attr])
		document.getElementById(`${attr}TestResult`).innerHTML = result
	}

	clearAttributeTestResult = attr => {
		document.getElementById(`${attr}TestResult`).innerHTML = null
	}

	clearHitboxTestResult = () => {
		this.setState({evade: null})
		this.setState({resistance: null})
		this.setState({hitbox: null})
	}

	addSkillPoint = e => {
		let newSkills = this.state.basicSkills.map(item => {
			if (item.id === e.target.id && item.value < 12) {
				if (item.id === "fight") {
					this.setState({hitbox: this.state.hitbox + 1})
				}
				return {...item, value: item.value + 2}
			} else {
				return item
			}
		})
		this.setState({basicSkills: newSkills})
	}

	subtractSkillPoint = e => {
		let newSkills = this.state.basicSkills.map(item => {
			if (item.id === e.target.id && item.value > 4) {
				if (item.id === "fight") {
					this.setState({hitbox: this.state.hitbox - 1})
				}

				return {...item, value: item.value - 2}
			} else {
				return item
			}
		})
		this.setState({basicSkills: newSkills})
	}

	meleeAttack = () => {
		const fight = this.state.basicSkills.find(item => item.id === "fight").value
		const hit = Math.ceil(Math.random() * fight)
		const damage = Math.ceil(Math.random() * this.state.strength)
		const meleeDamageValue = document.getElementById("meleeDamageValue")
		const meleeHitValue = document.getElementById("meleeHitValue")
		console.log(hit)
		console.log(damage)
		meleeDamageValue.innerHTML = damage
		meleeHitValue.innerHTML = hit
		console.log(hit + damage)
	}

	render() {
		return (
			<div className="app">
				<div className="section">
					<h3>
						<span className="textInput">Imię:</span>Szym
					</h3>
					<h3>
						<span className="textInput">Profesja:</span>chłopak z dzielni
					</h3>
				</div>

				<div className="section">
					<ul>
						<li>
							<span className="statName">
								<img src={heart} alt="strengthIcon" />
								HP:
							</span>
							<span className="statValue">{this.state.currentHP}</span>/
							<span className="statValue">{this.state.maxHP}</span>
						</li>

						<li>
							<span className="statName">
								<img src={breastplate} alt="strengthIcon" />
								Zbroja:
							</span>
							<button onClick={this.substractArmor}>-</button>
							<span className="statValue">{this.state.armor}</span>
							<button onClick={this.addArmor}>+</button>
						</li>

						<li>
							<span className="statName">
								<img src={machete} alt="strengthIcon" />
								Próg obrażeń:
							</span>
							<span className="statValue">{this.state.hitbox}</span>
						</li>

						<li>
							<span className="statName">
								<img src={run} alt="strengthIcon" />
								Ruch:
							</span>
							<span className="statValue">{this.state.movement}</span>
						</li>
					</ul>
				</div>

				{/*///////////////////////////////////////////////////////////////////*/}

				<div className="section">
					<h4>Cechy podstawowe: </h4>
					<ul>
						<li>
							<span className="statName">
								<img src={rock} alt="strengthIcon" />
								Siła:
							</span>
							<button onClick={this.subtractStrength}>-</button>
							<span className="statValue">D{this.state.strength}</span>
							<button onClick={this.addStrength}>+</button>
						</li>

						<li>
							<span className="statName">
								<img src={sprint} alt="strengthIcon" />
								Zręczność:
							</span>
							<button onClick={this.subtractAgility}>-</button>
							<span className="statValue">D{this.state.agility}</span>
							<button onClick={this.addAgility}>+</button>
						</li>

						<li>
							<span className="statName">
								<img src={brain} alt="strengthIcon" />
								Inteligencja:
							</span>
							<button onClick={this.subtractIntelligence}>-</button>
							<span className="statValue">D{this.state.intelligence}</span>
							<button onClick={this.addIntelligence}>+</button>
						</li>

						<li>
							<span className="statName">
								<img src={balance} alt="strengthIcon" />
								Wytrzymałość:
							</span>
							<button onClick={this.subtractStamina}>-</button>
							<span className="statValue">D{this.state.stamina}</span>
							<button onClick={this.addStamina}>+</button>
						</li>

						<li>
							<span className="statName">
								<img src={fedora} alt="strengthIcon" />
								Charyzma:
							</span>
							<button onClick={this.subtractCharisma}>-</button>
							<span className="statValue">D{this.state.charisma}</span>
							<button onClick={this.addCharisma}>+</button>
						</li>
					</ul>
				</div>

				{/*///////////////////////////////////////////////////////////////////*/}

				<div className="section">
					<h4>Walka:</h4>
					<div>
						<div style={{width: "100%"}}>
							<h5>Walka wręcz:</h5>
							<ul>
								<li>
									<button className="testButton" onClick={this.meleeAttack}>
										Uderz
									</button>
								</li>
								<li>
									<span className="statName">Trafienie: </span>
									<span id="meleeHitValue">-</span>
								</li>
								<li>
									<span className="statName">Obrażenia: </span>

									<span id="meleeDamageValue">-</span>
								</li>
							</ul>
						</div>

						{/* <div style={{width: "100%"}}>
							<h5>Strzelanie:</h5>
							<button className="testButton">Trafienie</button>
							<br />
							<button className="testButton">Obrażenia</button>
						</div> */}
					</div>
				</div>

				{/*///////////////////////////////////////////////////////////////////*/}

				<div className="section">
					<h4>Testy:</h4>

					<div>
						<button
							className="testButton"
							onClick={() => this.attributeTest("strength")}
						>
							Siła
						</button>
						<span className="testResult" id="strengthTestResult"></span>
						<button
							className="testButton"
							onClick={() => this.clearAttributeTestResult("strength")}
						>
							wyczyść wynik
						</button>
					</div>

					<div>
						<button
							className="testButton"
							onClick={() => this.attributeTest("agility")}
						>
							Zręczność
						</button>
						<span className="testResult" id="agilityTestResult"></span>
						<button
							className="testButton"
							onClick={() => this.clearAttributeTestResult("agility")}
						>
							wyczyść wynik
						</button>
					</div>

					<div>
						<button
							className="testButton"
							onClick={() => this.attributeTest("intelligence")}
						>
							Inteligencja
						</button>
						<span className="testResult" id="intelligenceTestResult"></span>
						<button
							className="testButton"
							onClick={() => this.clearAttributeTestResult("intelligence")}
						>
							wyczyść wynik
						</button>
					</div>

					<div>
						<button
							className="testButton"
							onClick={() => this.attributeTest("stamina")}
						>
							Wytrzymałość
						</button>
						<span className="testResult" id="staminaTestResult"></span>
						<button
							className="testButton"
							onClick={() => this.clearAttributeTestResult("stamina")}
						>
							wyczyść wynik
						</button>
					</div>

					<div>
						<button
							className="testButton"
							onClick={() => this.attributeTest("charisma")}
						>
							Charyzma
						</button>
						<span className="testResult" id="charismaTestResult"></span>
						<button
							className="testButton"
							onClick={() => this.clearAttributeTestResult("charisma")}
						>
							wyczyść wynik
						</button>
					</div>

					<div>
						<button className="testButton" onClick={this.evadeTest}>
							Unik
						</button>
						<span className="testResult" id="evadeTestResult">
							{this.state.evade}
						</span>
						<button className="testButton" onClick={this.clearEvadeTestResult}>
							wyczyść wynik
						</button>
					</div>

					<div>
						<button className="testButton" onClick={this.resistanceTest}>
							Hart ciała
						</button>
						<span className="testResult" id="resistanceTestResult">
							{this.state.resistance}
						</span>
						<button
							className="testButton"
							onClick={this.clearResistanceTestResult}
						>
							wyczyść wynik
						</button>
					</div>

					<div>
						<SkillTest basicSkills={this.state.basicSkills} />
					</div>
				</div>

				{/*///////////////////////////////////////////////////////////////////*/}

				<div className="section">
					<h4>Zdolności podstawowe: </h4>
					<ul>
						<BasicSkills
							addSkillPoint={this.addSkillPoint}
							subtractSkillPoint={this.subtractSkillPoint}
							basicSkills={this.state.basicSkills}
						/>
					</ul>
				</div>
				<h4>Zdolności specjalne: </h4>
			</div>
		)
	}
}

export default Szym
