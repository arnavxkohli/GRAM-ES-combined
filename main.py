from sensor import Servo, TempHum, MagField, AirQua, Range, Fill
from data import write_to_db
import smbus2
import time
import threading
import numpy as np
from enum import Enum

bus = smbus2.SMBus(1)
right_servo = Servo(17)
user_detector = Range(22, 23)
# hotwet_detector = TempHum(bus)
mag_detector = MagField(bus)
smoke_detector = AirQua(bus)
fill_checkor = Fill()

# Global sensor variables and flags to be sent to the data base
globals()['calib_complete'] = False
globals()['battery_violation'] = False
globals()['fire&smoke'] = False
globals()['fill_level'] = 8900
globals()['co2_last'] = 400
globals()['offset'] = 0
globals()['co2_level'] = 0
globals()['mag_field'] = 0

# The main loop which detects if there's a hand near the ultrasound sensor
def senseloop():
    # Calibrate the magnetic sensor at the start once
    ub, lb = mag_detector.calib()
    globals()['calib_complete'] = True

    while True:
        co2, _ = smoke_detector.sense() # The co2 level is measured also in the hand detecting loop
        globals()['co2_level'] = co2 - globals()['offset'] # The offset error is corrected as in the testloop
        globals()['fill_level'] = fill_checkor.sense()
        time.sleep(0.01)
        distance = user_detector.sense()
        # temp, hum = hotwet_detector.sense()
        time.sleep(0.01) # Time delay is needed to makes sure the data is well transmitted from the ultrasound sensor
        print("Fill_level: {0}".format(globals()['fill_level']) + f'% Distance: {distance}' + ' CO2 level: ' + str(globals()['co2_level']))
        globals()['fire&smoke'] = False if globals()['co2_level'] < 500 else True # At room condition the CO2 level is about 400 ppm, the threshold sets the fire hazard flag
        if distance < 15 and not globals()['fire&smoke']:
            print('User detected!')
            right_servo.open()
            testloop(ub, lb)
        elif globals()['fire&smoke']:
        # Before the fire hazard flag is cleared, the bin cannot be opened
            print('Fire hazard present. Bin cannot be opened!')

def testloop(ub, lb):
    # When the bin is opened, assume there's no battery being thrown
    globals()['battery_violation'] = False
    co2, _ = smoke_detector.sense() # The air quality sensor is called once before operation
    print('Starting value: ' + str(co2))
    globals()['offset'] = max(co2 - 400, 0) # This calibrates the sensor reading to room level before measuring

    # The 100 iteration tests the presence of battery or increase in CO2 level (fire source)
    # The iteration count is also the duration for which the bin lid is opened
    for i in range(100):
        _, _, _, globals()['mag_field'] = mag_detector.sense()
        co2, _ = smoke_detector.sense()
        CO2 = globals()["co2_level"] = co2 - globals()['offset'] # The measured value contains offset error, so subtract the offset correction measured at the beginning
        print('Mag field: ' + str(globals()['mag_field']) + f' CO2 level: {CO2}')
        if globals()['mag_field'] > ub or globals()['mag_field'] < lb:
	    # The battery flag is set true once the presence of a battery is detected while the bin close immediately
            globals()['battery_violation'] = True
            print('Battery is not allowed!')
            break
        elif CO2 > 500:
	    # Detection of a fire source closes the bin and set the fire hazard flag
            globals()['fire&smoke'] = True
            print('Smoke detected!')
            break
	# If no battery is detected, the battery flag will kept being set as false until the bin opens next time
    right_servo.close()

def dataloop():
    while True:
        if globals()['calib_complete']:
            write_to_db(battery_detected = globals()['battery_violation'], fire_detected = globals()['fire&smoke'], ToF_reading = globals()['fill_level'], magnetic_reading = globals()['mag_field'],  air_quality_reading = globals()['co2_level'],  bin_id = 1)

if __name__ == "__main__":
    # Thread is needed so that when the dataloop is sending sensor data, the senseloop is still operating to sense a hand
    t1 = threading.Thread(target = senseloop)
    t2 = threading.Thread(target = dataloop)

    t1.start()
    t2.start()

    t1.join()
    t2.join()