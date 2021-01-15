import React, { createRef, Component } from 'react';
import { TAlbumItem } from './day-data';
import { SelectableGroup } from 'react-selectable-fast';
import { Counters } from './Counters';
import { List } from './List';

import AddCalendarPopper from './Popper';
import '../styles/index.css'

type TAppProps = {
	items: TAlbumItem[],
	shifts?: any,
	calendarData?:any
}

type TAppState = {
	disableFirstRow: boolean
	reversed: boolean
	showSelectableGroup: boolean,
	anchorEl?: boolean | null | undefined,
	selected?: any[]
}

class App extends Component<TAppProps, TAppState> {
	state = {
		disableFirstRow: false,
		reversed: false,
		showSelectableGroup: true,
		anchorEl: null,
		selected: []
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
		if (this.countersRef && this.countersRef.current) {
			this.countersRef.current.handleSelecting(selectingItems)
		}
	}

	handleSelectionFinish = (selectedItems: any[]) => {
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

		this.setState({
			selected: selected
		})
		this.handleClick()
	}

	handleSelectedItemUnmount = (_unmountedItem: any, selectedItems: string | any[]) => {
		if (this.countersRef && this.countersRef.current) { 
			this.countersRef.current.handleSelectionFinish(selectedItems)
		}
	}

	handleSelectionClear() {
		console.log('Cancel selection')
	}

	handleClose = () => {
		this.setState({
			anchorEl:null
		})
	};

	handleClick = () => {
		this.setState({
			anchorEl: true
		})
	};

	render() {
		const { items, shifts } = this.props
		console.log(shifts)
		const { disableFirstRow, reversed, showSelectableGroup } = this.state

		const itemsToRender = disableFirstRow ? items.slice(5) : items
		const orderedItems = reversed ? itemsToRender.slice().reverse() : itemsToRender

		return (
			<div>
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
							<List shifts={this.props.shifts} items={orderedItems} calendarData={this.props.calendarData}/>
						</SelectableGroup>
					)}
				</div>
				<div>
					<AddCalendarPopper selected={this.state.selected} anchorEl={this.state.anchorEl} handleClose={this.handleClose} handleClick={this.handleClick}/>
				</div>
			</div>
		)
	}
}

export default App