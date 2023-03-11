def main():
    highestChain = 0
    targetNum = 0
    #only consider oddNumber
    for i in range(100_001, 1_000_000,2):
        if getChainLen(i) > highestChain:
            highestChain = getChainLen(i)
            targetNum = i
    print(targetNum)
    print(highestChain)
def getChainLen(num):
    len =0
    while num != 1:
        num = num / 2 if num % 2 == 0 else num * 3 + 1
        len = len +1
    return len
    
main()