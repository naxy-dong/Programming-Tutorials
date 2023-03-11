
def largestPalindromeProduct():
    num = 100000
    for i in range(900,1000):
        for j in range(i,1000):
            if isPalindrome(i * j) and num < i * j:
                num = i * j

    print(num)


def isPalindrome(val):
    strval = str(val)
    return strval == strval[::-1]

largestPalindromeProduct()