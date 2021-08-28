local M = {} -- Create table to store function below

function M.get_time_now()
    url = "http://worldtimeapi.org/api/ip" -- where to fetch time from
    method = http.GET 
    connection = http.createConnection(url, method) -- define connection
    status_code, connected = connection:request() -- establish connection
    s, b, h = http.get(url) -- status, body, headers
    if s < 0 then
        print("Bad status code: ", s)
    end
    connection:close()

    ok, t = pcall(sjson.decode, b) -- decode json received from API
    if not ok then
        print('Failed to decode string')
        return nil
    end
    for w in string.gmatch(t.datetime, "%d%d:%d%d:%d%d") do -- regex to get only time from timedate
        return w -- return time value as a string
    end
end

return M -- return table