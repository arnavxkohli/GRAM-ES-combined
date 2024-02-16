import { useState, useEffect, useRef } from "react";
import { fetchMessageData, fetchSensorData } from "../requests";

class Message {
    constructor(text, color, timestamp) {
        this.text = text;
        this.color = color;
        this.time = timestamp;
    }

    display() {
        return (
            <div className={`flex justify-start items-center px-2 py-2 font-console w-[27rem] bg-black`}>
                <p>{this.time}: <span style={{ color: this.color }}>{this.text}</span></p>
            </div>
        );
    }
}

export default function MessageBox(){
    const [fetchedMessages, setFetchedMessages] = useState([]);
    const magnetTime = useRef(null);
    const fireTime = useRef(null);
    const fullTime = useRef(null);

    useEffect(() => {
        const fetchDataPeriodically = async () => {
            const binId = localStorage.getItem('binId');;
            const uId = localStorage.getItem('uId');

            const magnetData = await fetchMessageData(binId, uId, 'battery_detected');
            const heatData = await fetchMessageData(binId, uId, 'fire_detected');
            const fullData = await fetchSensorData(binId, 'ToF', uId, 0);

            let messages = [];

            // determine messages to be shown, stored in array

            if(!magnetTime.current){
                magnetTime.current = magnetData['data']['time'];
            }
            if(!fireTime.current){
                fireTime.current = heatData['data']['time'];
            }
            if(fullData['data'] >= 80){
                if(!fullTime.current){
                    fullTime.current = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
                }
                messages.push(new Message('Your bin is more than 80% full, please dispose of the trash as soon as possible!', '#f0ad4e', fullTime.current, true));
            } else {
                fullTime.current = null;
            }
            if (magnetData['data']['message']){
                messages.push(new Message('Battery detected in trash, please ensure it is disposed of sustainably!', '#f0ad4e', magnetTime.current, true));
            } else {
                magnetTime.current = null;
            }
            if(heatData['data']['message']){
                messages.push(new Message('A fire has been detected in your bin. Please proceed with caution!', '#bb2124', fireTime.current, true));
            } else {
                fireTime.current = null;
            }
            if(!messages.length){
                messages.push(new Message('Everything is OK! :D', '#008000', new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }), true));
            }

            messages.sort((a, b) => b.time.localeCompare(a.time)); // sort based on most recent first

            setFetchedMessages(messages);
        };

        fetchDataPeriodically();

        const interval = setInterval(fetchDataPeriodically, 500);

        return () => clearInterval(interval);
    }, []); // Empty dependency array to run effect only once

    return (
        <div className="pt-2">
            <div className="bg-black rounded-md shadow-md p-2 overflow-auto h-[14rem] w-[30rem] font-light text-white">
                {fetchedMessages.map((message, index) => (
                    <div key={index}>
                        {message.display()}
                    </div>
                ))}
            </div>
        </div>
    );
}