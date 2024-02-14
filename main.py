from sensor import Servo, TempHum, MagField, AirQua, Range, Fill
from data import write_to_db
import smbus2
import time
import threading
import numpy as np
from enum import Enum

mode = 0
int_open = True
int_close = True
absave = 0
bus = smbus2.SMBus(1)
right_servo = Servo(17)
user_detector = Range(22, 23)
# hotwet_detector = TempHum(bus)
mag_detector = MagField(bus)
smoke_detector = AirQua(bus)
fill_checkor = Fill()

globals()['calib_complete'] = False
globals()['fill_level'] = 8900
globals()['battery_violation'] = False
globals()['fire&smoke'] = False
globals()['co2_last'] = 400
globals()['offset'] = 0
globals()['co2_level'] = 0
globals()['mag_field'] = 0

def testloop(ub, lb):
    co2, _ = smoke_detector.sense()
    print('Starting value: ' + str(co2))
    globals()['offset'] = max(co2 - 400, 0)
    print('Offset correction: ' + str(globals()['offset']))
    for i in range(100):
        _, _, _, globals()['mag_field'] = mag_detector.sense()
        co2, _ = smoke_detector.sense()
        CO2 = globals()["co2_level"] = co2 - globals()['offset']
        print(f'Mag field: {absave} CO2 level: {CO2}')
        if globals()['mag_field'] > ub or globals()['mag_field'] < lb:
            globals()['battery_violation'] = True
            print('Battery is not allowed!')
            break
        elif CO2 > 500:
            globals()['fire&smoke'] = True
            print('Smoke detected!')
            break
    globals()['co2_last'] = co2
    right_servo.close()

def senseloop():
    ub, lb = mag_detector.calib()
    globals()['calib_complete'] = True
    # thresh = 0 if reject_metal else 600
    # illegal_item = "Battery and metal " if reject_metal else "Battery "
    while True:
        globals()['fill_level'] = fill_checkor.sense()
        time.sleep(0.01)
        distance = user_detector.sense()
        # temp, hum = hotwet_detector.sense()
        time.sleep(0.01)
        print("Fill_level: {0}".format(globals()['fill_level']) + f'% Distance: {distance}')
        if globals()['fill_level'] > 78:
            print('Please empty the bin!')
        elif distance < 20:
            print('User detected!')
            right_servo.open()
            testloop(ub, lb)

def dataloop():
    while True:
        if globals()['calib_complete']:
            write_to_db(battery_detected = globals()['battery_violation'], fire_detected = globals()['fire&smoke'], ToF_reading = globals()['fill_level'], magnetic_reading = globals()['mag_field'],  air_quality_reading = globals()['co2_level'],  bin_id = 1)

if __name__ == "__main__":
    # reject_metal = True
    t1 = threading.Thread(target = senseloop)
    t2 = threading.Thread(target = dataloop)

    t1.start()
    t2.start()

    t1.join()
    t2.join()
    #write_to_db(magnetic_reading = 1, air_quality_reading = 1, bin_id = 1)
