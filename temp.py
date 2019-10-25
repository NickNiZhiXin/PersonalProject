#求阶乘n!
def factorial(num):
    result = 1
    for n in range(1,num+1):
        result*=n
    return result
#test code
n=int(input('n= '))
print (factorial(n))




