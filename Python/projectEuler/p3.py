import math

def findLargestPrime(val):
    stop = int(math.sqrt(val))
    found = False
    i = 2
    while not found and i < stop:
        if val % i == 0:
            found = True
            findLargestPrime(val/i)
        i+=1
    print(val)
    

print(findLargestPrime(600851475143))