-- requires the file to reload every time
package.loaded["json"]=nil
local file_to_json = require('json').file_to_json
local timer = tmr.create()
gpio.mode(pin, gpio.OUTPUT)
gpio.write(pin, gpio.LOW)

function take_measurements()
    --Open measurements file
    if not file.exists("measurements.log") then
        print("Measurement log file does not exist, creating one now...")
        f = file.open("measurements.log","w")
    else
        f = file.open("measurements.log","a")
    end
    
    if not f then 
        print("Something went wrong with logfile, skipping measurements")
        return
    end

    config = file_to_json("config.json")

    if not config then 
        print("Error while reading the config file")
        return
    end
    local pins = config.pins
    --Turning on soil moisture sensor    
    gpio.write(pins.soil_power, gpio.HIGH)
    --Reading soil moisture
    soil = adc.read(pins.soil_data)
    -- Reading temprature and humidity
    s,t,h,td,hd = dht.read11(pins.temp)
    if s == dht.OK then
        --Write readings
        print("soil   temp   humidity")
        print(soil, t, h)
        f:write(string.format("%.2f,%.2f,%.2f\n",soil,t,h))
    else
        print("DHT reading failed, skipping measurements")
    end
    --Close file and shutdown soil humidity sensor
    f:close()
    gpio.write(pins.soil_power, gpio.LOW)
end

print("Starting measurements:")
h = 0
m = 0
s = 60
take_measurements()
interval = 5*1000
timer:alarm(interval, tmr.ALARM_AUTO, take_measurements)
