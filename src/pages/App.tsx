import React, { createRef, Component } from 'react';
import { TAlbumItem } from './day-data';
import { SelectableGroup } from 'react-selectable-fast';
import { Counters } from './Counters';
import { List } from './List';

import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import '../styles/index.css'
import Button from '@material-ui/core/Button';

type TAppProps = {
	items: TAlbumItem[],
	shifts?:any
}

type TAppState = {
	disableFirstRow: boolean
	reversed: boolean
	showSelectableGroup: boolean,
	anchorEl:boolean | null
}

class App extends Component<TAppProps, TAppState> {
	state = {
		disableFirstRow: false,
		reversed: false,
		showSelectableGroup: true,
		anchorEl:null
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
		this.handleClick()
	}

	handleSelectedItemUnmount = (_unmountedItem: any, selectedItems: string | any[]) => {
		console.log('masuk')
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
		
		const { items } = this.props
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
							<List items={orderedItems} />
						</SelectableGroup>
					)}
				</div>
				<div>
					<Popover
						id="pop-over"
						open={Boolean(this.state.anchorEl)}
						anchorEl={this.state.anchorEl}
						onClose={this.handleClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}
					>
						<div className="container-custom">
							<div className="row">
								<div className="title-input">
									StaffAny Calendar
								</div>
								<div className="handle-input">
									<TextField id="outlined-basic" label="Input Your Activity" variant="outlined" />
								</div>
								<div>
									<Button > Save Schedule </Button>
								</div>
							</div>
						</div>
					</Popover>
				</div>
			</div>
		)
	}
}

export default App