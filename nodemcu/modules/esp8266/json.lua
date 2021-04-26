-- M allows fileToJson to be imported from other files
local M = {}
function M.file_to_json(filename) 
    if not type(filename) == "string" then
        print("Filename must be a string")
        return nil
    end
    if not file.exists(filename) then
        print("Could not find file " ..filename)
        return nil
    end
    fd = file.open(filename, "r")

    local data = ''
    local line = 1

    if not fd then
        print("Something went wrong")
        return nil
    end

    while(line) do
        line = file.readline('\n')
        -- handling nil at EOL
        if not line then
            break;
        end
        data = data ..line
    end
    fd:close()
    --run sjson with pcall to handle error thrown by sjson
    ok, json = pcall(sjson.decode, data)
    if not ok then
        print("Failed to decode file")
        return nil
    end
    return json
end

return M
