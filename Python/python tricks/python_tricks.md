# 2.1 Assertion
```py
def apply_discount(product, discount):
    price = int(product['price'] * (1.0-discount))
    assert 0 <= price <= product['price']
    return price

shoes = {'name': 'fancy shoes', 'price': 15_001}
price = apply_discount(shoes, 0.25)
# price = apply_discount(shoes, 2.0)
print(price)
```
- run python -O test.py OR python -OO test.py. It will disable the assertion statement
- **DO NOT** use asserts for data validation'''
## Example code
```py
def delete_product(store,prod_id, user):
    assert user.is_admin(), 'Must be admin'
    assert store.has_product(prod_id), 'Unknown product'
    store.get_product(prod_id).delete
``` 
- The reason is if the debug flag is turned off, it will cause unpleasant effects.

## What we should do
```py
def delete_product(store,prod_id, user):
    if not user.is_admin():
        raise AuthError('Must be an admin to delete')
    if store.has_product(prod_id):
        raise ValueError('Unknown product id')
    store.get_product(prod_id).delete
```
## The correct way
```py
counter = 1
assert counter == 10, 'It should fail'
```
- For some reason, if you pass in a tuple, it will always be true. Why? This is because non-empty tuples always return true in Python'''
## The wrong way
```py
assert (counter == 10, 'It should fail')
```

# 2.2 Comma placement
```py
names = ['Alice', 'Bob', 'Dilbert']
```
## Problem 
Whenever you make a change to this list of names, it iwll be hard to tell what was modified by looking at a Git diff.

## How to fix it
```py
names = [
    'Alice',
    'Bob',
    'Dilbert',
]
```
- Notice the comma after Dilbert, this will make changes in a Git Diff very apparent

### Common mistake
```py
names = [
    'Alice',
    'Bob',
    'Dilbert' # <- Missing Comma!
    'Jane'
]
```

- if you inspect the element, it will look like this
```py
['Alice', 'bob', 'DilbertJane']
```
- This is because of something called String Literal concatenation
    - **String literal concatenation** is a double edge sword, it can make our life convenient and confusing at the same time
    - helpful example:
    - ```py
        str = ('Hello! This is a line'
        'Another line'
        'Another line to complete the sentence.')
        ```

# 2.3 Context Manager
## Focus on the 'with' keyword
```py
with open('hello.txt', 'w') as f:
    f.write('hello world!')
```
Internally, the above example translate into something like this
```py
f = open('hello.txt', 'w')
try:
    f.write('hello world')
finally:
    f.close()
```

Without the try catch block it will waste resource when we can't write to the file

## Concurrent threading class example using 'with' keyword
```py
import threading
some_lock = threading.Lock()
some_lock.acquire()
# harmful
try:
    #do something
    print('bruh')
finally:
    some_lock.release()

# better
with some_lock:
    # do something
    print('bruh')
```


## Supporting 'with' in your own objects
### how to use 'with' with magic methods

In order to do that, you'll need to add ```__enter__ ``` and ```__exit__``` method
```py
class ManagedFile:
    def __init__(self, name):
        self.name = name
    def __enter__(self):
        self.file = open(self.name, 'w')
        return self.file
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
```

```py
with ManagedFile('hello.txt', 'w') as f:
    f.write('hello world!')
```

### Support 'with' using the contextlib library
```py

from contextlib import contextmanager

@contextmanager
def managed_file(name):
    try:
        f = open(name, 'w')
        yield f
    finally:
        f.close()

with managed_file('hello.txt') as f:
    f.write('hello world')
    
# Example 2
with Indenter() as indent:
    indent.print('hi')
    with indent:
        indent.print('hello')
        with indent:
            indent.print('bonjour')
    indent.print('hey')
    
class Indenter():
    def __init__(self) -> None:
        self.level = 0
        
    def __enter__(self):
        self.level += 1
        return self
        
    def __exit__(self):
        self.level -= 1
        
    def print(self, text):
        print('    ' * self.level + text)
```

# 2.4 Underscores, Dunders (Basically 2 underscores), etc
```py
from my_module import * 
'''According to PEP 8, wildcard imports is not recommended'''
# Correct way to import 
import my_module
```
## single trailing underscore(just a naming convention)
```py
def make_obj(name, class_):
    print('this is correct way so that it avoid conflicts')
    
def make_obj(name, class):
   print('invalid syntax because class is a keyword')
```
### it  may raise conflict with class modules
```py
from my_module import *
external_func()
>> it's fine
_internal_func()
>> raises error
```

## Double preceding underscore (AKA private variables/methods)
- causes the python interpreter to rewrite the attribute name in order to avoid naming conflicts in subclasses.
- This is called Name mangling

```py
class Test:
    def __init__(self):
        self.foo = 1
        self._bar = 2
        self.__baz = 3
# run
t = Test()
dir(t)
>> This will show you all the existing methods in the class
```
- Python will create a different name for __baz -> _Test__baz to avoid name confusion. So if you do something like this:

```py
class ExtendedTest(Test):
    def __init__(self):
        super().__init__()
        self.foo = 1    -> overridden
        self._bar = 2   -> overridden
        self.__baz = 3  -> AttributeError: No attribute __baz 
# run
t = Test()
dir(t)
```
- In this case, self.__baz turns in to _ExtendedTest__baz

## Double underscore prefix AND postfix (AKA magic methods)
```py
class PrePostDunderTest:
    def __init__(self):
        pass
    def __repr__(self):
        pass
```
- Magic methods are built in methods
- Magic methods are most frequently used to define overloaded behaviours of predefined operators in Python.  

# 2.5 String formatting
There are 4 main ways to format a string
## old-school - using the % operator (Python 2.7)
Simple
```py
name = "world"
'Hello %s' %name
```
Multiple args
```py
name = "Bob"
num = 5
# we need the tuple because % only accepts 1 argument
'Hey %s, there are %d pizzas in your house' % (name, num)
```
Substitutions (less code to change, but more typing)
```py
name = "Bob"
num = 5
# we need the tuple because % only accepts 1 argument
'Hey %(name)s, there are %(number)d pizzas in your house' % {"name":name, "number":num}
```

## New style - The format method (Python 3)
Simple
```py
name = "world"
'Hello {}'.format(name)
```
Substitutions
```py
name = "Bob"
num = 5
# we need the tuple because % only accepts 1 argument
'Hey {name}, there are {number} pizzas in your house'.format{..."name":name, "number":num}
```

## New style - Literal String Interpolation (Python 3.6+)
Python 3.6 adds formatte string literals
Simple
```py
name = "world"
f'hello {name}'
```
```py
f'5 + 10 is {5 + 10}'
```
Behind the scenes, python parsers converts the f strings into a series of string constants and expressions. They jion up to build the final strings

## Using the Template class
- I don't wanna go into it
- Use it for security reasons regarding user inputs
Example:
```py
from string import Template
t = Template('Hey, $name')
t.substitute(name=name)
```

# 3.1 Functional Programming
**Functions are objects!** The elements of functional programming contains
- Functions can be passed to other functions
- Function can be nested
- You can return a function inside a function
## local states
Function can capture local states, here's an example.  
```py
def get_speak_func(volume):
    def whisper(text):
        return text.lower() + "..."
    def yell(text):
        return text.upper() + "!"
    
    return yell if volume > 0.5 else whisper
```
This is how you would normally write this function. The whisper function has the reference to text because it's in its parameter.
```py
def get_speak_func(text, volume):
    def whisper():
        return text.lower() + "..."
    def yell():
        return text.upper() + "!"
    
    return yell if volume > 0.5 else whisper
```
Notice that in the inner function it does not have the reference to ```text```. BUT it can access the text parameter defined in the parent function.  
- This is called **lexical closure**. A closure remembers the value from its enclosing lexical scope even when the program flow is no longer in that scope
- In human words, it means a function NOT ONLY return behaviors, but they can also ***pre-configure*** those behaviors.
  
Magic method ```__call__ ```. Look more into this

```py
class Adder:
    def __init__(self, n):
        self.n = n
    def __call__(self):
        return self.n + x
```

# 3.2 Lambdas
Common usage: Sorting a tuple 
```py
tuples = [(1,'d'),(2,'b'),(4,'a'),(3,'c')]
print(sorted(tuples, key=lambda x: x[1]))
>> [(4, 'a'), (2, 'b'), (3, 'c'), (1, 'd')]
```
Challenge problem
```py
print(sorted(range(5,6), key=lambda x: x * x))
>> What will it print???
```
## Lexical closure
- a function that remembers the value from the enclosing lexical scope even the program flow is no longer in that scope. Here's an example
```py
def make_adder(n):
    return lambda x: x + n

plus_3 = make_adder(3)
plus_10 = make_adder(10)
...
plus3(10)
>> 13
plus10(20)
>> 30
```
- In this example, the x + n lambda can still access the value of n even though it was defined in the make_adder function (the enclosing scope)
Sometimes using list comprehension or generator is much easier:
```py
# lambda way
list(filter(lambda x : x % 2 == 0, range(16)))
# list comprehension way
[x for x in range(16) if x % 2 == 0]
```
### Key takeways
- lambda expressions are anonymous functions
- It will always include an implicit return statement
- Ask yourself does lambda or list comprehension offer more clarity in your program

# 3.3 Decorators
## Decorators basics
Any sufficiently generic functionality you can tack to an existing class of function's behavior makes a great use case for decoration. Examples:
- logging
- enforcing access control and authentication
- instrumentation and timing funcitons
- rate-limiting
- Discord bots API use them a lot

### Simple Example:
```py
# use of decorator @ is your best friend
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
greet()
>> '<strong><em>HELLO</em></strong>'
```
Few things to note here
- The decorators functions has to place on top of the greet method.
-  The decorator is applied from bottom to top. That's why you see not every character is capitcalized.

## Decoration functions that accepts arguments
decorators can forward arguments to the input function
### simple example
```py
def proxy(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper
```
### A more useful example 
```py
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
```
notes:
- !r is to to represent string in ```__repr__``` instead of the normal ```__str__``` formatting.

## Functool library
When you use a decorator, what you're really doing is to replace one function with another. One downside of this process is that it **hides** some of the metadata attached to the original function.

```py
def uppercase(func):
    def wrapper():
        return func().upper()
    return wrapper

@uppercase
def greet():
    '''This greets the user'''
    return 'hello world'

greet.__name__()
>> 'greet'

greet.__doc__()
>> None <- Not Wanted!!!
```

What we really should do is to use the functools to carry over the metadata
```py
import functools

def uppercase(func):
    @functools.wraps(func)
    def wrapper():
        return func().upper()
    return wrapper

@uppercase
def greet():
    '''This greets the user'''
    return 'hello world'

greet.__name__()
>> 'greet'

greet.__doc__()
>> 'This greets the user'
```
# 3.4 Fun with *args and **kwargs
*args and **kwargs allows optional arguments that people can pass in.
```py
# General structure:
def foo(required, *args, **kwargs):
    print(required)
    if args:
        print(args)
    if kwargs:
        print(kwargs)
```
Note: 
- The function requires at least 1 argument, accepts positional and keyword arguments.
- args and kwards will be passed in as a tuple 

```py
foo()
>> requires at least 1 argument

foo('hello')
>> 'hello'

foo('hello', 1,2,3, key1='value', key2=999)
>> 'hello'
(1,2,3)
{key1:'value', key2:999}
```

# 3.5 Function argument Unpacking
```py
def print_vector(x, y, z):
    print("<%s, %s, %s>" % (x, y, z))

print_vector(0,1,0)
>> <0, 1, 0>
```
## The problem
Depending on which data structure we choose to represent 3D vector. Using the print_vector function might feel a little awkward.
```py
tuple_vec = (1, 0, 1)
list_vec = [1, 0, 1]
print_vector(tuple_vec[0],
            tuple_vec[1],
            tuple_vec[2])
```
## The solution
Thankfully, we can solve this problem using argument unpacking.
```py
generator_expression = (x * x for x in range(3))
print_vector(*tuple_vec)
print_vector(*list_vec)
```
- the * operator unpacks sequences such as tuples, lists, and generators.

We could pass in ** operator for unpacking keyword arguments.
```py
dict_vec = {"y": 2, "x" : 1, "z": 3}
print_vector(**dict_vec)
>> <1,2,3>
print_vector(*dict_vec)
>> <z,x,y>
```
Note 
- because dictionary is unordered. It matches up dictionary values and function arguments based on the dictionary keys.
- if you were using a single asterisk, keys are passed in a random order.

# 3.6 Function with no return statement
Python implicitly return None if a function doesn't have a return type

```py
def foo1(value):
    if value:
        return value
    else: 
        return None

def foo2(value):
    '''Bare return statement will return None'''
    if value:
        return value
    else: 
        return

def foo3(value):
    '''Missing return statement will implicitly return None'''
    if value:
        return value
```
# 4.1 Object comparison ```is``` vs ```==```
Note
- Use ```is``` if you want to compare if two objects **are** the same.
- Use ```==``` if you want to compare if two objects **look** the same.

```py
a = [1,2,3]
b = a

'''Compare the contents the list are the same'''
a == b
>> True

'''See if they points to the same object'''
a is b
>> True

# creating a new list
c = list(a)

a == c
>> True

a is c 
>> False
```

# 4.2 Object Conversion To Strings (```__repr__```)
```py
class Car:
    def __init__(self, color, miles):
        self.color = color
        self.miles = miles
my_car = Car('red', 2893)
'''Printing the car'''
print(my_car)
>> <Car object at 0x*********>
'''Inspecting the car'''
my_car
>> <Car object at 0x*********>
```
In python, you can converting object to string using magic methods ```__str__``` and ```__repr__```.

```py
class Car:
    def __init__(self, color, miles):
        self.color = color
        self.miles = miles

    # Adding __str__ method
    def __str__(self):
        return f'a {self.color} car'

my_car = Car('red', 2893)
'''Printing the car'''
print(my_car)
>> 'a red car'
'''Inspecting the car'''
my_car
>> <Car object at 0x*********>
```
```py
class Car:
    def __init__(self, color, miles):
        self.color = color
        self.miles = miles

    def __str__(self):
        return f'a {self.color} car'

    # Adding __repr__ method
    def __repr__(self):
        return f'a __repr__ method'

my_car = Car('red', 2893)

'''Printing the car'''
print(my_car)
>> 'a red car'

'''Inspecting the car'''
my_car
>> 'a __repr__ method'
```

## Difference between printing and inspecting
You can call the ```__str__``` and ```__repr__``` method directly using str() and repr(). Hopefully the example below will give you an idea of inspection in python
```py

'''Output when there's only the __str__ method'''
my_car = Car('red', 2893)
print(my_car)
>> a red car
print([my_car])
>> [<__main__.Car object at 0x000002905AA6BA30>]

'''Output when there's both __str__ and __repr__ method'''
print(my_car)
>> a red car
print([my_car])
>> [a __repr__ method]
```

A more useful example of when you should use ```__str__``` and ```__repr__```.
```py
import datetime
today = datetime.date.today()

str(today)
>> '2023-03-12'

repr(today)
>> 'datetime.date(2017, 2, 2)'
```
Note
- the idea of  ```__str__``` is to give the user the most concise textual representation for human consumption -- anything you feel **comfortable displaying to a user**.
- the idea of  ```__repr__``` is to give the most **unambiguous**. The resulting string is **indended more as a debugging aid for developers**.
  - To be explicit of what this object is, the datetime example includes the full module name and class.
- If you don't add a ```__str__``` method, python will fall back to the ```__repr__``` method. This is why for simplicity sake, **every class should have a  ```__repr__``` method**.
- Use ```__unicode__``` instead of ```__str__``` in python 2

### Converting the car class 
```py
class Car:
    def __init__(self, color, miles):
        self.color = color
        self.miles = miles

    def __str__(self):
        return f'a {self.color} car'

    # Adding __repr__ method
    def __repr__(self):
        return f'{self.__class__.__name__}('
        f'{self.color!r}, {self.mileage!r})'
```
notes:
- !r is to to represent string in ```__repr__``` instead of the normal ```__str__``` formatting.

# 4.3 Custom Exceptions
Built-in exception you can extend from:
- ValueError
- AssertionError

```py
# Extends the class ValueError
class NameTooCuteError(ValueError):
    pass
def validtate(name):
    if len(name) == "Naxy":
        raise NameTooCuteError(name)
```

# 4.4 Shallow copy and deep copy
## Shallow copy example
```py
xs = [[1,2,3],[4,5,6],[7,8,9]]
ys = list(xs)

xs.append(['bruh'])
xs
>> [[1,2,3],[4,5,6],[7,8,9],['bruh']]
yx
>> [[1,2,3],[4,5,6],[7,8,9]]

'''The children is not individually copied'''
xs[1][0] = 'X'
xs
>> [[1,2,3],['X',5,6],[7,8,9],['bruh']]
yx
>> [[1,2,3],['X',5,6],[7,8,9]]
```
Note: 
- Shallow copy is also known as one-level deep copy.
- Values(including references) are copied. 
- copy.copy() creates a shallow copy, copy.deepcopy() creates deepcopy
## deep copy example
```py
xs = [[1,2,3],[4,5,6],[7,8,9]]
ys = copy.deepcopy(xs)

xs[1][0] = 'X'
xs
>> [[1,2,3],['X',5,6],[7,8,9]]
yx
>> [[1,2,3],[3,5,6],[7,8,9]]
```
Note:
- You can control how objects are copied by modifying ```__copy__()``` and ```__deepcopy__()``` magic method 

# 4.5 Abstract Base Class
Abstract Base Class (ABC) ensures the derived class will implement methods from the base class. 
## First implementation
```py
class Base:
    def foo(self):
        raise NotImplementedError()
    def bar(self):
        raise NotImplementedError()

class Concrete(Base):
    def foo(self):
        return 'foo() called'

    # oops, no bar method

b = Base()
b.foo()
>> Error

c = Concrete()
c.foo()
>> 'foo() called'
c.bar()
>> Error
```
### Problems:
- We're still able to instantiate Base without getting an error
- Instantiating concrete class does not give an error until we call the missing method
```py
from abc import ABCMeta, abstractmethod
class Base:
    @abstractmethod
    def foo(self):
        pass
    @abstractmethod
    def bar(self):
        pass

class Concrete(Base):
    def foo(self):
        return 'foo() called'
    # oops no bar again

c = Concrete()
>> TypeError
```

# 4.6 Named tuples
tuples but has name

# 4.7 Class vs Instance variables
- In python, strangely enough, class variables are similar to static variables in Java. And static variables in python is it's own category.

```py
class Dog:
    num_legs = 4  <-- A class variable

    def __init__(self, name):
        self.name = name <--- An instance variable

Jack = Dog('Jack')
Bill = Dog('Bill')
Jack.num_legs, Bill.num_legs
>> (4, 4)
Dog.num_legs = 6
Jack.num_legs, Bill.num_legs
>> (6, 6)
```
What we have done here is that we modified a class variables on the **class namespace**, which affect all instances of the class.
```py
Dog.num_legs = 4
Jack.num_legs, Bill.num_legs, Dog.num_legs
>> (4, 4, 4)
Jack.num_legs = 6
Jack.num_legs, Bill.num_legs, Dog.num_legs
>> (6, 4, 4)
```
So what happened here? Although we successfully created an extra pair of legs for Jack without affecting other dog variables, we introduced a num_legs **instance** variable to the Jack instance. And now the num_legs **instance variables shadows** the class variable.
```py
Jack.num_legs, Jack.__class__.num_legs
>> (6, 4)
```
Note:
- Modifying a class variable but accidentally introducing an instance variable is kinda a pitfall in python...

## A common mistake
A very Java thing to do is to count how many instances of an object the program has initiated

```py
class BuggyCounter:
    counter = 0

    def __init__(self):
        self.counter += 1 #!!!

BuggyCounter.counter
>> 0
BuggyCounter().counter
>> 1
BuggyCounter().counter
>> 1
BuggyCounter().counter
>> 1
```

## Correct way
```py
class WorkingCounter:
    counter = 0

    def __init__(self):
        self.__class__.counter += 1

WorkingCounter.counter
>> 0
WorkingCounter().counter
>> 1
WorkingCounter().counter
>> 2
WorkingCounter().counter
>> 3
```

# Instance, class, and static methods demystified. 
Let's first see the syntax
```py
class MyClass:
    def I_method(self):
        return 'Instance method called', self
    
    @classmethod
    def C_method(cls):
        return 'Class method called', cls

    @staticmethod
    def S_method():
        return 'Static method called'
```

## Theory
- Instance method
  - Accepts at least 1 argument ```self```.
  - Can modify the instance state 
  - Can also modify the class state via accessing the class object using ```self.__class__```. This give instance method a lot of power!
- Class method (static method in Java)
  - Can only access the class object using the cls and **Not** the instance object.
  - Consequently, it can't modify the instance state.
- Static method
  - Can't access the class state nor the instance state
  - Is primarily used to namespace your methods

## Examples
```py
obj = MyClass()

obj.I_method()
>> ('Instance method called', MyClass instance at 0xblablablah)

obj.C_method()
>> ('Class method called', class MyClass at 0xblablablah)

obj.S_method()
>> 'Static method called'
```

Note:
```py
MyClass.I_method()
>> "Error" No instance created

MyClass.C_method()
>> ('Class method called', class MyClass at 0xblablablah)

MyClass.S_method()
>> 'Static method called'
```

## Use of class method
### Factory method example
```py
class Pizza:
    def __init__(self, ingredients):
        self.ingredients = ingredients

    def __repr__(self):
        return f'Pizza ({self.ingredients})'

    @classmethod
    def margherita(cls):
        return cls(['mozzarella', 'tomatos'])
        
    @classmethod
    def prosciutto(cls):
        return cls(['mozzarella', 'tomatos', 'ham'])
```
Here, we used class method as factory methods to generate new kinds of pizza instead of using the  ```__init__``` method directly. 

```py
# Without using factory methods
margherita1 = Pizza(['mozzarella', 'tomatos'])
margherita2 = Pizza(['mozzarella', 'tomatos'])
prosciutto = Pizza(['mozzarella', 'tomatos', 'ham'])

# Using factory methods
margherita1 = Pizza.margherita()
margherita2 = Pizza.margherita()
prosciutto = Pizza.prosciutto()
```

Python only allows 1 ```__init__``` method per class, using class methods makes it possible to add as many alternative constructors as necessary.

## Use of static methods
Static methods are like a separete "Utility.js" class you would create outside of your normal Java program. They do not use references of variables in python. 

Key Takeaways:
- Instance methods have access to both the  **instance (self)** class via **self.__class__**.
- Class methods can't access the **instance (self)** but can access the class itself via **cls**.
- Static methods don't have access to **cls** or **self** 
- Static and class methods communicate and enfore developer intent about class design

# 5. Data structures
I don't wanna dig into the examples of how to use these data structures because you truly learn them when you use them. So here's a summary of chapter 5
## list of default data structures
- Dictionaries, Map and Hashtables
  - **dict**
    - Note: Python dictionaries are indexed by keys that can be any __**hashable type**__, a hashable object has a hash value that never changes during its lifetime (see ```__hash__```)
  - **collections.orderedDict** - remembers the insertion order of keys.
  - **collections.defaultdict** - Return default values for missing keys.
  - **collections.ChainMap** - Search multiple dictionaries as a single mapping
  - **types.mappingproxytype** - A wrapper for making read-only dictionaries
- array data structure
  - **list** - mutable dynamic arrays
  - **tuple** - immutable containers
  - **array.array** - Basic typed array
  - **str** - Immutable array of unicode characters
  - **bytes** - Immutable array of single bytes
  - **bytearray** - mutable array of single bytes
- Records, structs, and Data transfer object
  - Definition of record data structure vs array data structure
    - Record data strucutres provide a fixed number of fields.
  - **dict**
  - **tuple**
  - **collections.namedtuple** - Basically tuple but it's named and not indexed.
  - **typing.NamedTuple** - Improved Namedtuples
  - **struct.Struct** - Serialized C structs
  - **types.SimpleNamespace** - Fancy Attribute access.
- Sets and Multisets
  - **Set** - Muttable sets
  - **frozenset** - Immutable sets
  - **collections.Counter** - Multisets
- Stacks (LIFO)
  - **list** (Simple built-in stacks)
    - Uses append and pop operation from the **end takes O(1)** 
    - Adding and removing from the **front takes O(n)**
  - collections.deque - Fast & Robust stacks
    - Adding and removing from **both ends takes O(1)**
    - Poor O(n) performance for randomly accessing element in the middle of the stack
  - Queue.LifoQueue - Locking Semantics for parallel computing
- Queues (FIFO)
  - **list** - terrible queues
  - **collection.deque** - Fast & robust queue
  - **queue.queue** - Locking Semantics for parallel computing
  - **multiprocessing.Queue** - Shared Job Queues
- PriorityQueues
  - **list** - sorted queue using list.sort()
    - Sort takes O(n logn) times
  - **heapq** - List based binary heaps 
    - Takes O(log n) times for inserting and deletions
  - **queue.PriorityQueue**
    - Is synchronized and provides locking Semantics to support multiple concurrent producers and consumers

# 6.2 List Comprehensions
Syntax for list comprehensions
```py
values = [expression for item in collection if condition]
```
to transform it into a for loop
```py
values = []
for item in collection:
    if condition:
        values.append(expression)
```
set comprehension
```py
values = {expression for item in collection if condition}
{x * x for x in range(-9, 10)}
```
dictionary comprehension
```py
values = {key: expression for item in collection if condition}
{x: x * x for x in range(-9, 10)}
```
# 6.3 List slicing tricks
```py
lst[start:end:stop]
lst[::] is the same as lst
lst[::2] skips every other item in the list
lst[::-1] reverses the list
del lst[:] is the same thing as lst.clear() 
```
# 6.4 Iterators
```py
numbers = [1, 2, 3]
for n in numbers:
    print(n)
```
So how does this elegant loop structures work behind the scenes? Using
Implement ```__iter__``` and ```__next__``` magic methods!
```__next__``` will return StopIteration when they run out of items.

# 6.5 Generators
Uses the yield keyword to pause the execution and give the flow control to the caller.
```py
def repeater(value):
    while True:
        yield value
```
- generator start raising StopIteration exceptions after control flow leaves the generator function by any means other than a yield statement (remember functions in python returns None by default)

# 6.6 Generator Expression 
Example:
```py
genExpr = (expression for item in collection if condition)
genExpr = ('Hello' for in range(3))
```
Difference between list comprehension and generator expression
Example:
```py
lst = ['Hello' for in range(3)]
>> ['Hello', 'Hello', 'Hello']

genExpr = ('Hello' for in range(3))
>> Generator object at <0xaddress>
```

# 6.7 Chain Generator
```py
def integers():
    for i in range(1, 9):
        yield i

def squared():
    ...
def negated():
    ...

chain = negated(squared(integers()))
list(chain)
[-1, -4, -9, -16 ...]
```

# 7. Dictionary tricks
merging dict
```py
ys = {"hey": 1, "bruh": 12}
xs = {"bye": 6, "huh" : 23}
zs = {**ys, **xs}
```