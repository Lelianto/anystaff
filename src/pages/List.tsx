import React, { memo, useState } from 'react'
import { useDispatch } from 'react-redux';
import { TAlbumItem } from './day-data'
import { setCalendarData } from '../redux/effects/Shifts';
import { Card } from './Card'
import '../styles/index.css'

type TListProps = {
	items?: TAlbumItem[],
	shifts: any[],
	calendarData:any[]
}

interface listItems {
	year: any,
	index: any,
	day: number,
	startHour: number,
	endHour: number
}

export const List = memo((props: TListProps) => {
	const dispatch = useDispatch()
	const { items, shifts, calendarData } = props

	const [listData, setListData] = useState<listItems[]>([])
	const [choosenData, setChoosenData] = useState<number[]>([])
	// console.log(shifts)

	const handleChoosenData = (year: number) => {
		let choosen = choosenData
		if (!choosenData.includes(year)) {
			choosen.push(year)
		}
		setChoosenData(choosen)
	}

	let contentDatas: any =[]

	const handleTimeData = (data: listItems[]) => {
		let yearData = data[0]['year']
		
		let list: any[] = []
		let year: any[] = []
		if (calendarData.length !== 0) {
			calendarData.forEach((content: { year: any; }, index: any) => {
				list.push(content)
			})
		}
		if (list.length !== 0) {
			list.forEach((content, index) => {
				year.push(content.year)
			})
		}
		if (!year.includes(yearData)) {
			let dataSend = {
				year: data[0].year,
				index: data[0].index,
				day: data[0].day,
				startHour: data[0].startHour,
				endHour: data[0].startHour
			}
			list.push(dataSend)
		}
		contentDatas = list
		// console.log('list', list)
		dispatch(setCalendarData(contentDatas))
	}
	return (
		<div className="flex-center">
			<div>
				{listData}
			</div>
			<div className="albums">
				{
					items ? 
						<div>
							{items.map(item => (
								<Card key={item.year} calendarData={calendarData} contentDatas={contentDatas} shifts={shifts} player={item.player} year={item.year} listData={listData} handleTimeData={handleTimeData} handleChoosenData={handleChoosenData}/>
							))}
						</div>
						:
						<div></div>
				}
			</div>
		</div>
	)
})