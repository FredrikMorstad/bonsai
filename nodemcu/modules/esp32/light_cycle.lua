print("STARTING LIGHT CYCLE")
package.loaded["get_time"]=nil -- Magic
package.loaded["json"]=nil -- Magic
local get_time_now = require('get_time').get_time_now -- Magic
local json_file_to_dict = require('json').json_file_to_dict -- Magic

timer = tmr.create() -- Create timer

config = json_file_to_dict('config.json')
pin = config.pins.light_signal -- Pin used for signaling the relay to be on or off -- Use config file for values

gpio.config(
    {
        gpio=pin, 
        dir=gpio.OUT
    }
)

on =  config.light_conf.on
off = 1 - on
light_status = -1

-- Time interval when the light should be on
on_from = config.light_conf.light_on_from
on_to = config.light_conf.light_on_to

timer:alarm(30000, tmr.ALARM_AUTO, function() -- Check clock every minute
    time = get_time_now()
    tmp_t = tonumber(string.sub(time, 1, 2)) -- Look only at hours

    if on_from <= tmp_t and tmp_t < on_to then -- time is inside 'on' interval
        if light_status ~= on then
            light_status = on
            gpio.write(pin, on)
        end
    else -- Time is outside 'on' interval
        if light_status ~= off then 
            light_status = off
            gpio.write(pin, off)
        end
    end 
end)
