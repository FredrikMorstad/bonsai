local pin = 0
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
    --Turning on soil moisture sensor    
    gpio.write(0, gpio.HIGH)
    --Reading soil moisture
    soil = adc.read(0)
    --Reading temprature and humidity
    s,t,h,td,hd = dht.read11(5)
    if s == dht.OK then
        --Write readings
        print(soil, t, h)
        f:write(string.format("%.2f,%.2f,%.2f\n",soil,t,h))
    else
        print("DHT reading failed, skipping measurements")
    end
    --Close file and shutdown soil humidity sensor
    f:close()
    gpio.write(0, gpio.LOW)
end

print("Starting measurements:")
h = 0
m = 0
s = 60
take_measurements()
interval = 5*1000
timer:alarm(interval, tmr.ALARM_AUTO, take_measurements)
