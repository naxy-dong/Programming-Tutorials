import math

def main():
    triNum = 1
    generation = 100_000
    for i in range(2, generation+1):
        triNum = triNum +i

        if findDivisors(triNum) >= 500:
            print(triNum)
            break
    print(findDivisors(triNum))

def findDivisors(num):
    count = 2
    stop = int(math.sqrt(num))+1
    for k in range(2,stop):
        if num % k == 0:
            count = count + 2
    if num % math.sqrt(num) == 0:
        count = count -1
    return count


main()