list1 = []
def main():
    #strip() removes the newline(\n) and split well you know
    list2 = []
    f = open("problem11/p11.txt", "r")
    for x in f:
        list1.append(x.strip().split(" "))
    for x in range(len(list1)):
        for y in range(len(list1[x])):
            list1[x][y] = int(list1[x][y])
    f.close()
    print(checkHorizontalAndVertical())
    print(checkDiagonalLeftToRight())
    print(checkDiagonalRightToLeft())

def checkHorizontalAndVertical():
    l1 = []
    l2 = []
    for y in range(len(list1)):
        for z in range(len(list1[y])-4):
            l1.append(list1[y][z] * list1[y][z+1] * list1[y][z+2] * list1[y][z+3])
            l2.append(list1[z][y] * list1[z+1][y] * list1[z+2][y] * list1[z+3][y])
    return max(max(l1), max(l2))

def checkDiagonal(s1, s2):
    l3 = []
    while s1+3 < len(list1) and s2+3 < len(list1):
        l3.append(list1[s1][s2] * list1[s1+1][s2+1] * list1[s1+2][s2+2] * list1[s1+3][s2+3])
        s1 +=1
        s2 +=1
    return max(l3)

def checkDiagonalLeftToRight():
    l4 = []
    for x in range(len(list1)-4):
        l4.append(checkDiagonal(0,x))
        l4.append(checkDiagonal(x,0))
    return max(l4)


def checkDiagonalPart2(s1, s2):
    l4 = []
    
    while s1+3 < len(list1) and s2-3 >= 0:
        l4.append(list1[s1][s2] * list1[s1+1][s2-1] * list1[s1+2][s2-2] * list1[s1+3][s2-3])
        s1 +=1
        s2 -=1
    return max(l4)
def checkDiagonalRightToLeft():
    l4 = []
    for x in range(len(list1)-4):
        l4.append(checkDiagonalPart2(0,len(list1)-x-1))
        l4.append(checkDiagonalPart2(x,len(list1)-1))
    return max(l4)

main()