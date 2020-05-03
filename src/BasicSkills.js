import React from "react"

const BasicSkills = props => {
	return (
		<React.Fragment>
			{props.basicSkills.map(item => (
				<li key={item.id}>
					<span className="statName">{item.name}:</span>
					<button onClick={props.subtractSkillPoint} id={item.id}>
						-
					</button>
					<span className="statValue">D{item.value}</span>
					<button onClick={props.addSkillPoint} id={item.id}>
						+
					</button>
				</li>
			))}
		</React.Fragment>
	)
}

export default BasicSkills
