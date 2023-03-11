list1 = [1,23,5,5,1,5,6,123,4]
list2 = [1,5,6,2,6,3,4,6,3,13]

def returnElementInlist(list1, list2):
    list = []
    for element in list1:
        if element in list2 and not element in list:
            list.append(element)
    return list
print(returnElementInlist(list1,list2))

randomString = "1234321"
print(randomString)
print(randomString[::-1])