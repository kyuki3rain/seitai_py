import re
import math

def set(file_name):
    f = open(file_name, "r")

    data = []
    i = 0
    while True:
        line = f.readline()
        if not line:
            break
        
        data.append([])
        ar = re.findall(r'\'[0-9]+\'', line)
        
        for num in ar:
            data[i].append(int(num.replace("\'","")))
        i += 1
        
    return data

def get(row, i, data):
    length = len(data)
    t = i % length
    r = math.floor(i / length)
    
    step = math.floor(length/row)
    res = [str(data[-1][0] * r + data[t][0]).encode()]
    
    for j in range(0, row):
        a = (t + step * j) % length
        res.append(str(data[a][1]).encode())

    return res

