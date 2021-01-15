
import React, { useState } from 'react';
import { createSelectable, TSelectableItemProps } from 'react-selectable-fast';
import moment from 'moment';
import 'moment/locale/id';

type TAlbumProps = {
	player: string
	year: number,
	listData: any,
	setListData: any,
	shifts: any,
	handleChoosenData: any,
	calendarData: any,
	choosenData?: any,
	contentData?:any
}

const DISABLED_CARD_YEARS = [1, 2, 3, 4, 5, 6, 7, 8, 169 ]
const DISABLED_CAUSE_TIME = [9, 17, 25, 33, 41, 49, 57, 65, 73, 81, 89, 97, 105, 113, 121, 129, 137, 145, 153, 161, 169, 177, 185]
const DISABLED_CARD_DAYS = [2, 3, 4, 5, 6, 7, 8]
const DISABLED_LAST_HOUR = [193]

export const Card = createSelectable<TAlbumProps>((props: TSelectableItemProps & TAlbumProps) => {
	const { selectableRef, contentData, choosenData, calendarData, shifts, handleChoosenData, isSelected, isSelecting, year, listData, setListData } = props

	const classNames = [
		'item',
		choosenData && choosenData.includes(year) && 'not-selectable',
		(DISABLED_CARD_YEARS.includes(year) || DISABLED_CAUSE_TIME.includes(year) || DISABLED_LAST_HOUR.includes(year)) && 'un-selectable',
		isSelecting && !(DISABLED_CARD_YEARS.includes(year) || DISABLED_CAUSE_TIME.includes(year) || DISABLED_LAST_HOUR.includes(year)) && 'selected',
		isSelected && !(DISABLED_CARD_YEARS.includes(year) || DISABLED_CAUSE_TIME.includes(year) || DISABLED_LAST_HOUR.includes(year)) && 'selected',
	]
		.filter(Boolean)
		.join(' ')

	
	const [dayOfWeek,setDayOfWeek] = useState<string[]>([])
	const [dateOfWeek, setDateOfWeek] = useState<string[]>([])
	const [timestamp, setTimestamp] = useState<number[]>([])

	let start = new Date().getTime();
	const startDayDate = moment(start).startOf('week').unix()
	
	if (dayOfWeek.length < 7 || dateOfWeek.length < 7) {
		let days = dayOfWeek
		let dates = dateOfWeek
		let timestampData = timestamp
		for (let i = 0; i < 7; i++) {
			const day = moment(startDayDate + 86400000 * i).format('dddd')
			const date = moment(startDayDate + 86400000 * i).format('DD MMMM')
			days.push(day)
			dates.push(date)
			timestampData.push(startDayDate + 86400 * i)
		}
		
		setTimestamp(timestampData)
		setDayOfWeek(days)
		setDateOfWeek(dates)
	}

	if (!(DISABLED_CARD_YEARS.includes(year) || DISABLED_CAUSE_TIME.includes(year) || DISABLED_LAST_HOUR.includes(year))) {
		let data = {
			year: year,
			index: listData.length,
			day: timestamp[listData.length%7],
			startHour: Math.floor(listData.length/7),
			endHour: Math.floor(listData.length/7)+1
		}
		setListData(data)

		if (listData.length !== 0) {
			if (shifts.length !== 0) {
				listData.map((data: any, i: any) => {
					let startTime = data.day * 1000 + data.startHour * 3600 * 1000;
					shifts.map((shift: any, i: any) => {
						if ((data.day*1000===shift.date) && (shift.startTime === startTime)) {
							handleChoosenData(data.year, shift)
						}
					})
				})
			}
		}

		
	}

	return (
		<div id="content-data" ref={selectableRef} className={classNames}>
			{
				choosenData.includes(year) ?
					<div>
						<div className="choosen-one">
							{contentData[choosenData.indexOf(year)].name}
						</div>
					</div>
					:
					<div>

						{
							DISABLED_CAUSE_TIME.includes(year) ?
								<div className="time">
									<div>
										{`${1 * Math.floor(year / 8) > 9 ? `${1 * Math.floor(year / 8)}` : `0${1 * Math.floor(year / 8)}`}:00`}
									</div>
								</div>
								:
								<div>
									{
										DISABLED_CARD_DAYS.includes(year) ? 
											<div>
												<div>
													{dayOfWeek[DISABLED_CARD_DAYS.indexOf(year)]},
												</div>
												<div>
													{dateOfWeek[DISABLED_CARD_DAYS.indexOf(year)]}
												</div>
											</div>
											:
											<div>
												{/* {
													dataDate.map((position: any, i: any) => {
														if (position.year === year) {
															return (
																<div id={`${position.day * 1000 + position.startHour * 3600 * 1000}`}>
																	<div>
																		{position.index}
																	</div>
																	<div>
																		Day &nbsp;
																		<Moment date={position.day * 1000 + position.startHour*3600*1000} format="DD:MM:YYYY HH:mm"/>	
																		<div>{position.day}</div>
																	</div>
																	<div>
																		Hour <span>{position.startHour}</span> - <span>{position.endHour}</span>
																	</div>
																</div>
															)
														} else {
															<div></div>
														}
													})
												} */}
											</div>
									}
								</div>
						}
					</div>
			}
		</div>
	)
})