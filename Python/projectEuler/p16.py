import math
    
arr = []
def main():
    num = math.pow(2, 1000)
    turnNumToArr(num)
    print(arr)
    print(sum(arr))

def turnNumToArr(num):  
    if num != 0:
        arr.append(num%10)
        turnNumToArr(int(num/10))
    
main()