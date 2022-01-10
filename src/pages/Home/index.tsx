import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect } from 'react';
import api from '../../services/api';
import {Button, Dropdown, ButtonGroup} from 'react-bootstrap';

interface Props{
    date:string 
    currency:number
}

export default function Home(){
    const [dates, setDates] = React.useState([])
    const [quotations, setQuotations] = React.useState([])
    const [currency, setCurrency] = React.useState("")

    const [apidata, setApidata] = React.useState([] as Props[])

    const [selectedCurrency, setSelectedCurrency] = React.useState("brl")
    const [selectedDays, setSelectedDays] = React.useState(5)

    const [refresh, setRefresh] = React.useState(true)

    const days = [1,2,3,4,5]

    const options = {
        title: {
          text: 'Currency Quotation - USD Base'
        },
        subtitle: {
            text: 'Source: vatcomply.com/documentation'
        },
        yAxis: {
            title: {
                text: 'Value of Currency'
            }
        },
    
        xAxis: {
            categories: dates,
            rotation: 90
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
            },
            line: {
                dataLabels: {
                    enabled: true
                }
            },
        },
        
        series: [{
            name: currency,
            data: quotations
        }]
    }
    
    async function get_quotation() {
        // let result = await api.get(`api/quotation/days?days=${selectedDays}&currency=${selectedCurrency.toString().toLowerCase()}`)
        let result = await api.get(`db/quotation/days/${selectedDays}/${selectedCurrency.toString().toLowerCase()}`)
        if (result.status === 200){
            setApidata(result.data.quotations)
            setCurrency(result.data.currency)
            setRefresh(false)
        }
    }

    function set_chartData(){
        let dates_aux: any = []
        let quotations_aux: any = []
        
        apidata.map((quotation) => {
            dates_aux.push(quotation.date)
            quotations_aux.push(parseFloat(quotation.currency.toFixed(3)))
        return true})

        setDates(dates_aux)
        setQuotations(quotations_aux)
    }

    function handleSelectedCurrency(currency:string){
        setSelectedCurrency(currency)
        setRefresh(true)
    }

    function handleSelectedDay(day:number){
        setSelectedDays(day)
        setRefresh(true)
    }

    useEffect(() => {
        set_chartData()
    }, [apidata])

    useEffect(() => {
        if (refresh){
            get_quotation()
        }
    }, [refresh])


    return(<>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}/>

        <div style={{display: 'flex', justifyContent:'space-evenly'}}>
            <Dropdown as={ButtonGroup} align={{ lg: 'start' }}>
                <Button style={{width:130}}>Currency: {selectedCurrency === "brl" ? "BRL" : selectedCurrency}</Button>
                <Dropdown.Toggle split id="dropdown-split-basic"/>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleSelectedCurrency("BRL")}>
                        BRL
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelectedCurrency("EUR")}>
                        EUR
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelectedCurrency("JPY")}>
                        JPY
                    </Dropdown.Item> 
                </Dropdown.Menu>  
            </Dropdown>
            <Dropdown as={ButtonGroup} align={{ lg: 'start' }}>
                <Button style={{width:130}}>Days: {selectedDays === 5 ? 5 : selectedDays}</Button>
                <Dropdown.Toggle split id="dropdown-split-basic"/>
                <Dropdown.Menu>
                    {days.map((day) => (
                        <Dropdown.Item onClick={() => handleSelectedDay(day)}>
                            {day}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>  
            </Dropdown>
        </div>
        </>)
}