def main():
    num = 100
    val = 0
    for x in range(1,num+1):
        for y in range(x+1,num+1):
            val += x * y
    print(val*2)

main()