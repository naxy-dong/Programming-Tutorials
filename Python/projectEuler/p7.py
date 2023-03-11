import math

def main():
    list = [2]
    
    x = 3
    while len(list) != 10001:
        if isPrime(x):
            list.append(x)
        x += 2
    
    print(list[10000])


def isPrime(val):
    for y in range(2, int(math.sqrt(val))+1):
        #if y is a factor of val
        if val % y == 0:
            return False
    return True

main()