import React from "react"

const SkillTest = props => {
	const skillTest = (attr, value) => {
		const result = Math.ceil(Math.random() * value)
		document.getElementById(`${attr}TestResult`).innerHTML = result
	}

	const clearskillTestResult = attr => {
		document.getElementById(`${attr}TestResult`).innerHTML = null
	}

	return (
		<>
			{props.basicSkills.map(item => (
				<div key={item.id}>
					<button
						className="testButton"
						onClick={() => skillTest(item.id, item.value)}
					>
						{item.name}
					</button>
					<span className="testResult" id={`${item.id}TestResult`}></span>
					<button
						className="testButton"
						onClick={() => clearskillTestResult(item.id)}
					>
						wyczyść wynik
					</button>
				</div>
			))}
		</>
	)
}

export default SkillTest
