tuples = [(1,'d'),(2,'b'),(4,'a'),(3,'c')]
print(sorted(tuples, key=lambda x: x[1]))

def uppercase(func):
    def wrapper():
        original_result = func()
        modified_result = original_result.upper()
        return modified_result
    return wrapper

def strong(func):
    def wrapper():
        return '<strong>' + func() + '</strong>'
    return wrapper


def emphasis(func):
    def wrapper():
        return '<em>' + func() + '</em>'
    return wrapper

@strong
@emphasis
@uppercase
def greet():
    return 'Hello'

print(greet())

def trace(func):
    def wrapper(*args, **kwargs):
        print(f'TRACE: calling {func.__name__}() '
              f'with {args}, {kwargs}')
        result =  func(*args, **kwargs)
        print(f'TRACE: {func.__name__}() '
              f'returned {result!r}')
    return wrapper

@trace
def say(name, line):
    return f'{name}: {line}'

say('Jane', 'Hello World')

class Car:
    def __init__(self, color, miles):
        self.color = color
        self.miles = miles

    def __str__(self):
        return f'a {self.color} car'
    def __repr__(self):
        return f'a __repr__ method'
my_car = Car('red', 2893)
print(my_car)
print([my_car])
import datetime
today = datetime.date.today()

print(str(today))

class Bro:
    def __init__(self, color, miles):
        self.color = color
        self.miles = miles
    def __init__(self, color, miles, how):
        self.color = color
        self.miles = miles
        self.how = how
    def __str__(self):
        return f'a {self.color} car'
    def __repr__(self):
        return f'a __repr__ method'
    
brokski = Bro(1,2,3)
