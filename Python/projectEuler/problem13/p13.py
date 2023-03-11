arr = []
def main():
    f = open("problem13/p13.txt", "r")
    for x in f:
        arr.append(int(x.strip()[:14]))
    print(sum(arr))

main()