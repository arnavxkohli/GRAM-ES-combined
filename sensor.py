import time
import smbus2
import RPi.GPIO as GPIO
import board
import busio
import adafruit_vl53l0x

class Servo:
    def __init__(self, pin):
        GPIO.setwarnings(False)
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(pin, GPIO.OUT)

        self.p = GPIO.PWM(pin, 50)
        self.p.start(0)

    def open(self):
        self.p.ChangeDutyCycle(1.7)
        time.sleep(0.4)
        self.p.ChangeDutyCycle(0) # Set the duty cycle to 0 to prevent unwanted jittering

    def close(self):
        self.p.ChangeDutyCycle(6)
        time.sleep(0.4)
        self.p.ChangeDutyCycle(0)

""" Infrared motion detector. Not used due to bad sensitivity
class Motion:
    def __init__(self, pin):
        GPIO.setwarnings(False)
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(pin, GPIO.IN)

        self.pin = pin

    def sense(self):
        self.i = GPIO.input(self.pin)

        return self.i
"""

# Magnetic field sensor. Detects battery or metal.
class MagField():
    def __init__(self, bus):
        self.MLX90393_SLAVE_ADDR = 0x0C
        self.START_SINGLE_MEASUREMENT_MODE_XYZ = 0b00111110
        self.MEASURE_FIELD_XYZ = 0b01001110
        self.bus = bus

    def sense(self):
        try:
            self.bus.write_byte(self.MLX90393_SLAVE_ADDR, self.START_SINGLE_MEASUREMENT_MODE_XYZ)
            data = self.bus.read_byte(self.MLX90393_SLAVE_ADDR)
            time.sleep(0.01)
            data = self.bus.read_i2c_block_data(self.MLX90393_SLAVE_ADDR, self.MEASURE_FIELD_XYZ, 7)

            # Convert the data
            mx = data[1] * 256 + data[2]
            if mx > 32767 :
                mx -= 65536
            # mx += 200

            my = data[3] * 256 + data[4]
            if my > 32767 :
                my -= 65536
            # my += 1754

            mz = data[5] * 256 + data[6]
            if mz > 32767 :
                mz -= 65536

            abssum = mx ** 2 + my ** 2 + mz ** 2

            return mx, my, mz, abssum
        except Exception as e:
            print('Mag sensor error!')
    
    # Initial calibration is needed as the magnetic field strength varies depending on where the bin is located.
    def calib(self):
        print('Calibrating... ')
        abs_max = 0
        abs_min = 1e9
        for i in range(1000):
            mx, my, mz, absave = self.sense()
            abs_max = absave if absave > abs_max else abs_max
            abs_min = absave if absave < abs_min else abs_min
        print('Calibration complete.')
        
        return abs_max * 1.01, abs_min * 0.99

# CO2 and organic particle detector. Used to detect smoke or fire.
class AirQua():
    def __init__(self, bus):
        self.CCS811_SLAVE_ADDR = 0x5A
        self.MEASURE_MODE_REG = 0x01
        self.ALG_RESULT_DATA_REG = 0x02
        self.CCS811_APP_START_REG = 0xF4
        self.SET_CONST_POWER_MODE = 0b01000000 # In this mode, measurements are taken every 250ms
        self.bus = bus
        self.co2 = 0
        self.tvoc = 0

        self.bus.write_byte(self.CCS811_SLAVE_ADDR, self.CCS811_APP_START_REG) # Start the CCS811 sensor
        self.bus.write_byte_data(self.CCS811_SLAVE_ADDR, self.MEASURE_MODE_REG, self.SET_CONST_POWER_MODE) # Set measurement mode

        self.msg_meas_result = smbus2.i2c_msg.write(self.CCS811_SLAVE_ADDR, [self.ALG_RESULT_DATA_REG])
        self.msg_read_result = smbus2.i2c_msg.read(self.CCS811_SLAVE_ADDR, 6)

    def sense(self):
        try:
            # Read the CO2 and TVOC data from the sensor
            self.bus.i2c_rdwr(self.msg_meas_result)
            time.sleep(0.01)
            self.bus.i2c_rdwr(self.msg_read_result)
            # time.sleep(1)
            co2 = int.from_bytes(self.msg_read_result.buf[0] + self.msg_read_result.buf[1], 'big')
            tvoc = int.from_bytes(self.msg_read_result.buf[2] + self.msg_read_result.buf[3], 'big')
            # error = bin(int.from_bytes(self.msg_read_result.buf[5], 'big'))

            if co2 < 2 ** 14 and tvoc < 1000:
                self.co2 = co2
                self.tvoc = tvoc
            time.sleep(0.01)

            return self.co2, self.tvoc
        except Exception as e:
            print('Air quality sensor error!')

# Used to detect hot or wet objects
class TempHum():
    def __init__(self, bus):
        self.si7021_SLAVE_ADDR = 0x40
        self.si7021_READ_TEMPERATURE = 0xF3
        self.si7021_READ_HUMIDITY = 0xF5
        self.bus = bus
        self.msg_meas_temp = smbus2.i2c_msg.write(self.si7021_SLAVE_ADDR, [self.si7021_READ_TEMPERATURE])
        self.msg_read_temp = smbus2.i2c_msg.read(self.si7021_SLAVE_ADDR, 2)
        self.msg_meas_hum = smbus2.i2c_msg.write(self.si7021_SLAVE_ADDR, [self.si7021_READ_HUMIDITY])
        self.msg_read_hum = smbus2.i2c_msg.read(self.si7021_SLAVE_ADDR, 2)

    def sense(self):
        self.bus.i2c_rdwr(self.msg_meas_temp)
        time.sleep(0.05)
        self.bus.i2c_rdwr(self.msg_read_temp)
        temperature = int.from_bytes(self.msg_read_temp.buf[0] + self.msg_read_temp.buf[1],'big') * 175.72 / 2 ** 16 - 46.85

        #Execute the two transactions with a small delay between them
        self.bus.i2c_rdwr(self.msg_meas_hum)
        time.sleep(0.05)
        self.bus.i2c_rdwr(self.msg_read_hum)
        humidity = int.from_bytes(self.msg_read_hum.buf[0] + self.msg_read_hum.buf[1],'big') * 125 / 2 ** 16 - 6

        return temperature, humidity
    
class Range():
    def __init__(self, echo_pin, trigger_pin):
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(echo_pin, GPIO.IN)
        GPIO.setup(trigger_pin, GPIO.OUT)

        self.echo_pin = echo_pin
        self.trigger_pin = trigger_pin
        # Predefine the values for pulse duration in case the while loop is skipped and the pulse become undefined
        self.pulse_start = 0
        self.pulse_end = 200

    def sense(self):
        try:
            # Set trigger to HIGH for a short time to start sensor
            GPIO.output(self.trigger_pin, True)
            time.sleep(0.00001)
            GPIO.output(self.trigger_pin, False)
            
            # Record the start and stop time of the echo pulse
            timeout = time.time() + 1  # Timeout duration of 1 second
            while GPIO.input(self.echo_pin) == 0 and time.time() < timeout:
                self.pulse_start = time.time()

            timeout = time.time() + 1  # Reset timeout for the second while loop
            while GPIO.input(self.echo_pin) == 1 and time.time() < timeout:
                self.pulse_end = time.time()

            
            # Calculate pulse duration and convert to distance (cm)
            pulse_duration = self.pulse_end - self.pulse_start
            distance = pulse_duration * 17150
            distance = round(distance, 2)
            
            return distance
        except RPi.GPIO.GPIOError as e:
            print('GPIO Error:', e)
        except Exception as e:
            print('Ultrasound sensor error:', e)
    
class Fill():
    def __init__(self):
        i2c = busio.I2C(board.SCL, board.SDA)
        self.vl53 = adafruit_vl53l0x.VL53L0X(i2c)

    def sense(self):
        try:
            level = max(round(((175 - self.vl53.range)/175)*100), 0)

            return level
        except Exception as e:
            print('ToF sensor error!')