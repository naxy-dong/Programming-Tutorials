import math
x = 0
y = 1
list = []
#n1 < n2
def recursiveFibonacci(n1, n2):
    if n1 + n2 > 4_000_000:
        return
    else:
        n3 = n1 + n2
        list.append(n3)
        recursiveFibonacci(n2,n3)

recursiveFibonacci(x, y)
print(sum([i for i in list if i%2 == 0]))