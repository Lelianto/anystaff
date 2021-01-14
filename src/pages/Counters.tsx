import React, { Component } from 'react'

export class Counters extends Component {
	state = {
		selectedItems: [],
		selectingItems: [],
	}

	handleSelecting = (selectingItems: string | any[]) => {
		if (selectingItems.length !== this.state.selectingItems.length) {
			this.setState({ selectingItems })
		}
	}

	handleSelectionFinish = (selectedItems: string | any[]) => {
		this.setState({
			selectedItems,
			selectingItems: [],
		})

		console.log(`Finished selection ${selectedItems.length}`)
	}

	render() {
		return (
			<p>
			</p>
		)
	}
}