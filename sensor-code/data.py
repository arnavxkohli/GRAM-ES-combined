import requests # You might need to do pip install requests

# Global variables
firebase_url = 'https://gram-d45eb-default-rtdb.europe-west1.firebasedatabase.app/' # Do not change

def write_to_db(magnetic_reading: int, air_quality_reading: int, ToF_reading: int, battery_detected: bool,  fire_detected: bool, bin_id: int):
    data = {
        'magnetic' : magnetic_reading,
        "air_quality" : air_quality_reading,
        "ToF" : ToF_reading,
        "battery_detected":  battery_detected,
        "fire_detected": fire_detected
    }

    response = requests.put(f'{firebase_url}/Bins/{bin_id}.json', json=data)

    if response.status_code != 200:
        print(f'Something went wrong: {response.status_code}')
    else:
        print('Ok.')