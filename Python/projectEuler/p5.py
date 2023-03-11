def main():
    multiple = 3 * 5 * 7 * 11 * 13 * 17 * 19
    print(multiple)
    for x in range(0,1_000_000_000, multiple):
        if ifAns(x):
            print(x)

def ifAns(num):
    for x in range(2,20):
        if not num % x == 0:
            return False
    return True

main()