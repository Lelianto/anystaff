import React, { createRef, Component } from 'react'
import { TAlbumItem } from './day-data'
import { SelectableGroup } from 'react-selectable-fast'
import { Counters } from './Counters'
import { List } from './List'

type TAppProps = {
	items: TAlbumItem[],
	shifts?:any
}

type TAppState = {
	disableFirstRow: boolean
	reversed: boolean
	showSelectableGroup: boolean
}

class App extends Component<TAppProps, TAppState> {
	state = {
		disableFirstRow: false,
		reversed: false,
		showSelectableGroup: true,
	}

	countersRef = createRef<Counters>()

	getSelectableGroupRef = (ref: SelectableGroup | null) => {
		; (window as any).selectableGroup = ref
	}

	toggleFirstRow = () => {
		this.setState(state => ({ disableFirstRow: !state.disableFirstRow }))
	}

	toggleOrder = () => {
		this.setState(state => ({ reversed: !state.reversed }))
	}

	toggleSelectableGroup = () => {
		this.setState(state => ({
			showSelectableGroup: !state.showSelectableGroup,
		}))
	}

	handleSelecting = (selectingItems: any) => {
		console.log('selecting', selectingItems)
		if (this.countersRef && this.countersRef.current) {
			this.countersRef.current.handleSelecting(selectingItems)
		}
	}

	handleSelectionFinish = (selectedItems: any[]) => {
		console.log('Handle selection finish', selectedItems)
		if (this.countersRef && this.countersRef.current) { 
			this.countersRef.current.handleSelectionFinish(selectedItems)
		}

		let selected: any[] = []
		selectedItems.map((data, index) => {
			this.props.shifts.calendarData.map((content: any, i: any) => {
				if (content.year === data.props.year) {
					selected.push(content)
				}
			})
		})

		console.log('hasil akhir ke API', selected)
	}

	handleSelectedItemUnmount = (_unmountedItem: any, selectedItems: string | any[]) => {
		console.log('hadneleSelectedItemUnmount')
		if (this.countersRef && this.countersRef.current) { 
			this.countersRef.current.handleSelectionFinish(selectedItems)
		}
	}

	handleSelectionClear() {
		console.log('Cancel selection')
	}

	render() {
		const { items } = this.props
		const { disableFirstRow, reversed, showSelectableGroup } = this.state

		const itemsToRender = disableFirstRow ? items.slice(5) : items
		const orderedItems = reversed ? itemsToRender.slice().reverse() : itemsToRender

		return (
			<div>
				{showSelectableGroup && (
					<SelectableGroup
						ref={this.getSelectableGroupRef}
						className="main"
						clickClassName="tick"
						enableDeselect={true}
						tolerance={0}
						deselectOnEsc={true}
						allowClickWithoutSelected={false}
						duringSelection={this.handleSelecting}
						onSelectionClear={this.handleSelectionClear}
						onSelectionFinish={this.handleSelectionFinish}
						onSelectedItemUnmount={this.handleSelectedItemUnmount}
						ignoreList={['.not-selectable', '.un-selectable']}
					>
						<List items={orderedItems} />
					</SelectableGroup>
				)}
			</div>
		)
	}
}

export default App